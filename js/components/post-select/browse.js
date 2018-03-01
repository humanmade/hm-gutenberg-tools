import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _get from 'lodash/get';
import _extend from 'lodash/extend';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';

import getPostTypeCollection from '../../utils/get-post-type-collection';
import PostSelectBrowseFilters from './browse-filters';
import PostList from './post-list';

const { Button } = wp.components;
const { __ } = wp.i18n;
const { Spinner } = wp.components;

class PostSelectBrowse extends React.Component {
	constructor( props ) {
		super( props );

		this.collections = {};
		this.state = {
			posts:     [],
			isLoading: true,
			filters:   { postType: props.postType },
		};
	}

	componentDidMount() {
		this.setCollection( this.props.postType );
		this.fetchPostsCollection();
	}

	componentWillUpdate( nextProps, nextState ) {
		if ( this.state.filters.postType !== nextState.filters.postType ) {
			this.setCollection( nextState.filters.postType );
		}
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( ! _isEqual( prevState.filters, this.state.filters ) ) {
			this.fetchPostsCollection();
		}
	}

	componentWillUnmount() {
		Object.entries( this.collections ).forEach( ( [ postType, collection ] ) => collection.off() );
		delete this.collections;
		delete this.postsCollection;
	}

	render() {
		const { posts, isLoading } = this.state;
		const { postType, selectedPosts, togglePostSelected } = this.props;

		return <div className="menu-container">
			<div className="menu">
				<PostSelectBrowseFilters
					postType={ postType }
					onUpdate={ filters => this.setState( { filters } ) }
				/>
			</div>
			<div>
				{ isLoading && <Spinner /> }
				{ ! isLoading && this.hasPrev() && <Button
					className="prev-page"
					isLarge={ true }
					onClick={ () => this.prevPostsPage() }
					disabled={ isLoading }
				>Previous page</Button> }
				{ ! isLoading && <PostList
					posts={ posts }
					selectedPosts={ selectedPosts }
					onToggleSelectedPosts={ post => togglePostSelected( post ) }
				/> }
				{ ! isLoading && this.hasMore() && <Button
					className="next-page"
					isLarge={true}
					onClick={ () => this.nextPostsPage() }
				>Next page</Button> }
			</div>
		</div>
	}

	createCollection( postType ) {
		const CollectionClass = getPostTypeCollection( postType ) || wp.api.collections.Posts;
		const collection = new CollectionClass();

		collection.on( 'add remove update change destroy reset sort', () => {
			this.setState( { posts: collection.toJSON() } );
		} );

		collection.on( 'request', () => this.setState( { isLoading: true } ) );
		collection.on( 'sync', () => this.setState( { isLoading: false } ) );

		return collection;
	}

	setCollection( postType ) {
		this.postsCollection = this.collections[ postType ] || this.createCollection( postType );
	}

	postCollectionFetchData() {
		const args = {
			page:     1,
			per_page: 25,
		};

		const search = _get( this.state, 'filters.search' );
		if ( search && search.length > 0 ) {
			args.search = search;
		}

		this.props.termFilters.forEach( termFilter => {
			const terms = _get( this.state, `filters.${termFilter.slug}` );
			if ( terms && terms.length > 0 ) {
				args[ termFilter.rest ] = terms.join( ',' );
			} else {
				delete args[ termFilter.rest ];
			}
		} );

		return args;
	}

	fetchPostsCollection() {
		this.postsCollection.fetch( { hmCache: 30, data: this.postCollectionFetchData() } );
	}

	nextPostsPage( options = {} ) {
		this.setState( { page: this.state.page + 1 } );
		options.hmCache = 30;
		this.postsCollection.more( options );
	}

	/**
	 * Fetches the prev page of objects if a new page exists.
	 * @param {object} options Options.
	 */
	prevPostsPage( options = {} ) {
		options.hmCache = 30;
		options.data  = options.data || {};
		_extend( options.data, this.postCollectionFetchData() );

		if ( ! this.hasPrev() ) {
			return false;
		}

		if ( this.postsCollection.state.currentPage === null || this.postsCollection.state.currentPage <= 1 ) {
			options.data.page = 1;
		} else {
			options.data.page = this.postsCollection.state.currentPage - 1;
		}

		this.postsCollection.fetch( options );
	}

	/**
	 * Returns true if there are previous pages of objects available.
	 * @returns null|boolean.
	 */
	hasMore() {
		return this.postsCollection.hasMore();
	}

	/**
	 * Returns true if there are previous pages of objects available.
	 * @returns null|boolean.
	 */
	hasPrev() {
		if ( this.postsCollection.state.currentPage === null ) {
			return null;
		} else {
			return ( this.postsCollection.state.currentPage > 1 );
		}
	}
}

PostSelectBrowse.propTypes = {
	postType:           PropTypes.string,
	selectedPosts:      PropTypes.array,
	togglePostSelected: PropTypes.func.isRequired,
	termFilters:        PropTypes.arrayOf( PropTypes.shape( {
		slug:  PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		rest:  PropTypes.string.isRequired,
	} ) ).isRequired,
}
export default PostSelectBrowse;
