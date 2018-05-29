import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _get from 'lodash/get';
import _extend from 'lodash/extend';
import _isEqual from 'lodash/isEqual';

import getPostTypeCollection from '../../utils/get-post-type-collection';
import PostSelectBrowseFilters from './browse-filters';
import PostList from './post-list';

const { Button } = wp.components;
const { __ } = wp.i18n;
const { Spinner } = wp.components;

class PostSelectBrowse extends React.Component {
	state = {
		posts:     [],
		isLoading: false,
		filters:   {},
	};

	componentWillMount() {
		this.initPostsCollection();
	}

	componentDidUpdate( prevProps, prevState ){
		if ( ! _isEqual( prevState.filters, this.state.filters ) ) {
			this.fetchPostsCollection();
		}
	}

	componentWillUnmount() {
		this.postsCollection.off();
		delete this.postsCollection;
	}

	render() {
		const { posts, isLoading } = this.state;
		const { selectedPosts, togglePostSelected, termFilters } = this.props;

		return <div className="menu-container">
			<div className="menu">
				<PostSelectBrowseFilters
					termFilters={ termFilters }
					onUpdate={ filters => this.setState( { filters } ) }
				/>
			</div>
			<div>
				{ isLoading && <Spinner /> }
				{ ! isLoading && this.hasPrev() && <Button
					className="prev-page"
					isLarge
					onClick={ () => this.prevPostsPage() }
					disabled={ isLoading }
				>Previous page</Button> }
				{ ! isLoading && <PostList
					posts={ posts }
					selectedPosts={ selectedPosts }
					onToggleSelectedPost={ post => togglePostSelected( post ) }
				/> }
				{ ! isLoading && this.hasMore() && <Button
					className="next-page"
					onClick={ () => this.nextPostsPage() }
					isLarge
				>Next page</Button> }
			</div>
		</div>
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

	initPostsCollection() {
		this.setState( { isLoading: true } );

		const Collection = getPostTypeCollection( this.props.postType ) || wp.api.collections.Posts;
		this.postsCollection = new Collection();

		this.postsCollection.on( 'add remove update change destroy reset sort', () => {
			this.setState( { posts: this.postsCollection.toJSON() } );
		} );

		this.postsCollection.on( 'request', () => this.setState( { isLoading: true } ) );
		this.postsCollection.on( 'sync', () => this.setState( { isLoading: false } ) );

		this.postsCollection.fetch( { hmCache: 30, data: this.postCollectionFetchData() } );
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
