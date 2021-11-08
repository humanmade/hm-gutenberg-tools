<?php

namespace HM\GutenbergTools\Endpoints;

use WP_Query;
use WP_REST_Controller;
use WP_REST_Server;

class Post_Select_Controller extends WP_REST_Controller {

	/**
	 * Type property name.
	 */
	const PROP_TYPE = 'type';

	/**
	 * Search property name.
	 */
	const PROP_SEARCH = 'search';

	/**
	 * Include property name.
	 */
	const PROP_INCLUDE = 'include';

	/**
	 * Per page property name.
	 */
	const PROP_PER_PAGE = 'per_page';

	/**
	 * Page property name.
	 */
	const PROP_PAGE = 'page';

	/**
	 * Date query after property name.
	 */
	const PROP_AFTER = 'after';


	/**
	 * Date query before property name.
	 */
	const PROP_BEFORE = 'before';

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->namespace = 'hm-gb-tools/v1';
		$this->rest_base = 'post-select';
	}

	/**
	 * Registers the routes for the objects of the controller.
	 *
	 * @see register_rest_route()
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_items' ],
					'permission_callback' => [ $this, 'get_items_permission_check' ],
					'args'                => $this->get_collection_params(),
				],
			]
		);
	}

	/**
	 * Checks if a given request has access to search content.
	 *
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return true|WP_Error True if the request has search access, WP_Error object otherwise.
	 */
	public function get_items_permission_check( $request ) {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Retrieves a collection of objects.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function get_items( $request ) {
		$search  = $request->get_param( self::PROP_SEARCH );
		$include = $request->get_param( self::PROP_INCLUDE );

		if ( empty( $request->get_param( self::PROP_TYPE ) ) ) {
			return [];
		}

		$query_args = [
			'post_type'      => $request->get_param( self::PROP_TYPE ),
			'posts_per_page' => $request->get_param( self::PROP_PER_PAGE ),
			'paged'          => $request->get_param( self::PROP_PAGE ),
			'tax_query'      => [],
			'filter_bundles' => true,
		];

		if ( ! empty( $search ) ) {
			$query_args['s'] = $search;
		}

		$date_query_after  = $request->get_param( self::PROP_AFTER );
		$date_query_before  = $request->get_param( self::PROP_BEFORE );

		if ( ! empty( $date_query_after ) ) {
			$query_args['date_query']['after'] = $date_query_after;
		}

		if ( ! empty( $date_query_before ) ) {
			$query_args['date_query']['before'] = $date_query_before;
		}

		foreach ( $this->get_allowed_tax_filters() as $taxonomy ) {
			$base  = ! empty( $taxonomy->rest_base ) ? $taxonomy->rest_base : $taxonomy->name;
			$query = $request->get_param( $base );
			if ( ! empty( $query ) ) {
				$query_args['tax_query'][] = [
					'taxonomy'         => $taxonomy->name,
					'field'            => 'term_id',
					'terms'            => $query,
					'include_children' => false,
				];
			}
		}

		if ( $include ) {
			$query_args['post__in'] = $include;
			$query_args['orderby']  = 'post__in';
		}

		$query_args = apply_filters( 'hm_gb_tools_post_select_query_args', $query_args );

		$query = new WP_Query( $query_args );
		$posts = [];

		foreach ( $query->posts as $post ) {
			$posts[] = $this->prepare_item_for_response( $post, $request );
		}

		$response = rest_ensure_response( $posts );

		$total_posts = $query->found_posts;
		$max_pages   = ceil( $total_posts / (int) $query->query_vars['posts_per_page'] );

		$response->header( 'X-WP-Total', (int) $total_posts );
		$response->header( 'X-WP-TotalPages', (int) $max_pages );

		return $response;
	}

	/**
	 * Prepares a single result for response.
	 *
	 * @param int             $id      ID of the item to prepare.
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response Response object.
	 */
	public function prepare_item_for_response( $post, $request ) {
		$data = [
			'id' => $post->ID,
			'title' => [
				'raw'      => $post->post_title,
				'rendered' => $post->post_title,
			],
			'type' => $post->post_type,
			'date' => $this->prepare_date_response( $post->post_date_gmt, $post->post_date ),
			'slug' => $post->post_name,
			'status' => $post->post_status,
			'link' => get_permalink( $post->ID ),
			'author' => absint( $post->post_author ),
			'thumbnail' => apply_filters( 'hm_gb_tools_item_thumbnail_id', null, $post, $request ),
		];

		// For drafts, `post_date_gmt` may not be set, indicating that the
		// date of the draft should be updated each time it is saved (see
		// #38883).  In this case, shim the value based on the `post_date`
		// field with the site's timezone offset applied.
		if ( '0000-00-00 00:00:00' === $post->post_date_gmt ) {
			$post_date_gmt = get_gmt_from_date( $post->post_date );
		} else {
			$post_date_gmt = $post->post_date_gmt;
		}

		$data['date_gmt'] = $this->prepare_date_response( $post_date_gmt );

		return $data;
	}

	/**
	 * Checks the post_date_gmt or modified_gmt and prepare any post or
	 * modified date for single post output.
	 *
	 * @param string      $date_gmt GMT publication time.
	 * @param string|null $date     Optional. Local publication time. Default null.
	 * @return string|null ISO8601/RFC3339 formatted datetime.
	 */
	protected function prepare_date_response( $date_gmt, $date = null ) {
		// Use the date if passed.
		if ( isset( $date ) ) {
			return mysql_to_rfc3339( $date ); // phpcs:ignore -- this is an internal WordPress function not mysql lib
		}

		// Return null if $date_gmt is empty/zeros.
		if ( '0000-00-00 00:00:00' === $date_gmt ) {
			return null;
		}

		// Return the formatted datetime.
		return mysql_to_rfc3339( $date_gmt ); // phpcs:ignore -- this is an internal WordPress function not mysql lib
	}

	/**
	 * Retrieves the query params for the search results collection.
	 *
	 * @return array Collection parameters.
	 */
	public function get_collection_params() {
		$query_params  = parent::get_collection_params();
		$allowed_types = $this->get_allowed_post_types();

		$query_params[ self::PROP_TYPE ] = [
			'description' => __( 'Limit results to items of an object type.', 'hm-gb-tools' ),
			'type'        => 'array',
			'items'       => [
				'type' => 'string',
			],
			'sanitize_callback' => [ $this, 'sanitize_post_types' ],
			'validate_callback' => function( $value ) {
				return is_array( $value );
			},
			'default' => $allowed_types,
		];

		$query_params[ self::PROP_SEARCH ] = [
			'description' => __( 'Limit results to items that match search query.', 'hm-gb-tools' ),
			'type'        => 'string',
		];

		$query_params[ self::PROP_INCLUDE ] = [
			'description' => __( 'Include posts by ID.', 'hm-gb-tools' ),
			'type'        => 'array',
			'validate_callback' => function( $ids ) {
				return count( $ids ) > 0;
			},
			'sanitize_callback' => function( $ids ) {
				return array_map( 'absint', $ids );
			},
		];

		$query_params[ self::PROP_PER_PAGE ] = [
			'description' => __( 'Number of results to return.', 'hm-gb-tools' ),
			'type'        => 'number',
			'sanitize_callback' => function( $val ) {
				return min( absint( $val ), 100 );
			},
			'default' => 25,
		];

		$query_params[ self::PROP_PAGE ] = [
			'description' => __( 'Page of results to return.', 'hm-gb-tools' ),
			'type'        => 'number',
			'sanitize_callback' => function( $val ) {
				return absint( $val );
			},
			'default' => 1,
		];

		foreach ( $this->get_allowed_tax_filters() as $taxonomy ) {
			$base = ! empty( $taxonomy->rest_base ) ? $taxonomy->rest_base : $taxonomy->name;

			$query_params[ $base ] = [
				/* translators: %s: taxonomy name */
				'description' => sprintf( __( 'Limit result set to all items that have the specified term assigned in the %s taxonomy.' ), $base ),
				'type'        => 'array',
				'items'       => [
					'type' => 'integer',
				],
				'default'     => [],
			];
		}

		return $query_params;
	}

	/**
	 * Sanitizes the list of subtypes, to ensure only subtypes of the passed type are included.
	 *
	 * @param string|array    $subtypes  One or more subtypes.
	 * @param WP_REST_Request $request   Full details about the request.
	 * @param string          $parameter Parameter name.
	 * @return array|WP_Error List of valid subtypes, or WP_Error object on failure.
	 */
	public function sanitize_post_types( $post_types, $request ) {
		$allowed_types = $this->get_allowed_post_types();
		return array_unique( array_intersect( $post_types, $allowed_types ) );
	}

	/**
	 * Get allowed post types.
	 *
	 * By default this is only post types that have show_in_rest set to true.
	 * You can filter this to support more post types if required.
	 *
	 * @return array
	 */
	public function get_allowed_post_types() {
		$allowed_types = array_values( get_post_types( [
			'show_in_rest' => true,
		] ) );

		$key = array_search( 'attachment', $allowed_types, true );

		if ( false !== $key ) {
			unset( $allowed_types[ $key ] );
		}

		/**
		 * Filter the allowed post types.
		 *
		 * Note that if you allow this for posts that are not otherwise public,
		 * this data will be accessible using this endpoint for any logged in user with the edit_post capability.
		 */
		return apply_filters( 'hm_gb_tools_post_select_allowed_post_types', $allowed_types );
	}

	/**
	 * Get allowed tax filters.
	 *
	 * @return array
	 */
	public function get_allowed_tax_filters() {
		$taxonomies = [];

		foreach ( $this->get_allowed_post_types() as $post_type ) {
			$taxonomies = array_merge(
				$taxonomies,
				wp_list_filter( get_object_taxonomies( $post_type, 'objects' ), [ 'show_in_rest' => true ] )
			);
		}

		return $taxonomies;
	}
}
