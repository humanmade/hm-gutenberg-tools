import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _get from 'lodash/get';
import _extend from 'lodash/extend';
import _isEqual from 'lodash/isEqual';

import getPostTypeCollection from '../../utils/get-post-type-collection';
import Browse from './browse';
// import PostSelectBrowseFilters from './browse-filters';
// import PostList from './post-list';

const { apiFetch } = wp;
const { Button } = wp.components;
const { __ } = wp.i18n;
const { Spinner } = wp.components;

class PostSelectBrowse extends React.Component {
	state = {
		posts:     [],
		isLoading: false,
		filters:   {},
		page:      1,
		isLoading: false,
		hasPrev: false,
		hasMore: true,
	};

	componentDidMount() {
		this.fetchPosts();
	}

	// componentDidUpdate( prevProps, prevState ){
	// 	if ( ! _isEqual( prevState.filters, this.state.filters ) ) {
	// 		this.fetchPostsCollection();
	// 	}
	// }

	// componentWillUnmount() {
	// 	this.postsCollection.off();
	// 	delete this.postsCollection;
	// }

	render() {
		const { posts, isLoading, hasPrev, hasMore } = this.state;
		const { selectedPosts, onToggleSelected, termFilters } = this.props;

		return <Browse
			posts={ posts }
			isLoading={ isLoading }
			selectedPosts={ selectedPosts }
			onToggleSelected={ onToggleSelected }
			termFilters={ termFilters }
			hasPrev={ hasPrev }
			hasMore={ hasMore }
			onPrevPostsPage={ () => this.prevPage() }
			onNextPostsPage={ () => this.nextPage() }
			onUpdateFilters={ filters => this.updateFilters( filters ) }
		/>
	}

	// postCollectionFetchData() {
	// 	const args = {
	// 		page:     1,
	// 		per_page: 25,
	// 	};

	// 	const search = _get( this.state, 'filters.search' );
	// 	if ( search && search.length > 0 ) {
	// 		args.search = search;
	// 	}

	// 	this.props.termFilters.forEach( termFilter => {
	// 		const terms = _get( this.state, `filters.${termFilter.slug}` );
	// 		if ( terms && terms.length > 0 ) {
	// 			args[ termFilter.rest ] = terms.join( ',' );
	// 		} else {
	// 			delete args[ termFilter.rest ];
	// 		}
	// 	} );

	// 	return args;
	// }

	// initPostsCollection() {
	// 	this.setState( { isLoading: true } );

	// 	const Collection = getPostTypeCollection( this.props.postType ) || wp.api.collections.Posts;
	// 	this.postsCollection = new Collection();

	// 	this.postsCollection.on( 'add remove update change destroy reset sort', () => {
	// 		this.setState( { posts: this.postsCollection.toJSON() } );
	// 	} );

	// 	this.postsCollection.on( 'request', () => this.setState( { isLoading: true } ) );
	// 	this.postsCollection.on( 'sync', () => this.setState( { isLoading: false } ) );

	// 	this.postsCollection.fetch( { hmCache: 30, data: this.postCollectionFetchData() } );
	// }

	// fetchPostsCollection() {
	// 	this.postsCollection.fetch( { hmCache: 30, data: this.postCollectionFetchData() } );
	// }

	fetchPosts() {
		const { page, isLoading } = this.state;
		const path = `wp/v2/posts/?page=${page}&per_page=1`;

		if ( isLoading ) {
			return;
		}

		this.setState( { isLoading: true } );

		apiFetch( { path, parse: false }  ).then( response => Promise.all([
			response.json ? response.json() : [],
			parseInt( response.headers.get( 'x-wp-totalpages' ), 10 ),
		])).then(([posts, totalPages]) => {
			console.log( posts, page, totalPages );
			this.setState({
				posts,
				hasMore: page < totalPages,
				hasPrev: page > 1,
				isLoading: false,
			});
		});
	}

	nextPage() {
		this.setState( { page: this.state.page + 1 }, () => this.fetchPosts() );
	}

	prevPage() {
		this.setState( { page: this.state.page - 1 }, () => this.fetchPosts() );
	}

	updateFilters( filters ) {
		console.log( filters );
	}
}

PostSelectBrowse.propTypes = {
	postType:           PropTypes.string,
	selectedPosts:      PropTypes.array,
	onToggleSelected: PropTypes.func.isRequired,
	termFilters:        PropTypes.arrayOf( PropTypes.shape( {
		slug:  PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		rest:  PropTypes.string.isRequired,
	} ) ).isRequired,
}

export default PostSelectBrowse;
