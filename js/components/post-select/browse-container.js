import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

import Browse from './browse';

const { apiFetch } = wp;
const { withDispatch } = wp.data;
const { addQueryArgs } = wp.url;

class PostSelectBrowse extends React.Component {
	state = {
		posts: [],
		filters: {},
		page: 1,
		isLoading: false,
		hasPrev: false,
		hasMore: true,
	};

	componentDidMount() {
		this.fetchPosts();
	}

	componentWillUnmount() {
		this.fetchPostAbortController && this.fetchPostAbortController.abort();
	}

	render() {
		const { posts, isLoading, hasPrev, hasMore } = this.state;
		const { selection, onToggleSelected, termFilters } = this.props;

		return ( <Browse
			posts={ posts }
			isLoading={ isLoading }
			selection={ selection }
			onToggleSelected={ onToggleSelected }
			termFilters={ termFilters }
			hasPrev={ hasPrev }
			hasMore={ hasMore }
			onPrevPostsPage={ () => this.prevPage() }
			onNextPostsPage={ () => this.nextPage() }
			onUpdateFilters={ filters => this.updateFilters( filters ) }
		/> )
	}

	fetchPosts() {
		const { page, isLoading } = this.state;
		const { storePosts } = this.props;
		const query = {
			page,
			per_page: 25,
		};

		if ( isLoading ) {
			return;
		}

		this.setState( { isLoading: true } );
		this.fetchPostAbortController = new AbortController();

		apiFetch( {
			path: addQueryArgs( 'wp/v2/pages/', query ),
			parse: false,
			signal: this.fetchPostAbortController.signal,
		} ).then( response => Promise.all( [
			response.json ? response.json() : [],
			parseInt( response.headers.get( 'x-wp-totalpages' ), 10 ),
		] ) ).then( ( [ posts, totalPages ] ) => {
			this.setState( {
				posts,
				hasMore: page < totalPages,
				hasPrev: page > 1,
				isLoading: false,
			} );

			// Store posts in core data store, so they're available to use elsewhere.
			storePosts( posts, query );
		} ).catch( e => {} );
	}

	nextPage() {
		this.setState(
			{ page: this.state.page + 1 },
			() => this.fetchPosts()
		);
	}

	prevPage() {
		this.setState(
			{ page: this.state.page - 1 },
			() => this.fetchPosts()
		);
	}

	updateFilters( filters ) {
		console.log( filters );
	}
}

PostSelectBrowse.propTypes = {
	postType: PropTypes.string,
	selection: PropTypes.array,
	onToggleSelected: PropTypes.func.isRequired,
	termFilters: PropTypes.arrayOf( PropTypes.shape( {
		slug: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		rest: PropTypes.string.isRequired,
	} ) ).isRequired,
}

const PostSelectBrowseContainer = withDispatch( ( dispatch, ownProps ) => {
	const { receiveEntityRecords } = dispatch( 'core' );

	return {
		storePost: post => receiveEntityRecords( 'postType', ownProps.postType, post ),
		storePosts: ( posts, query ) => receiveEntityRecords( 'postType', ownProps.postType, posts, query ),
	}
} )( PostSelectBrowse );

export default PostSelectBrowseContainer;
