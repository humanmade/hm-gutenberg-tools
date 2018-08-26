import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

import Browse from '../../components/post-select/browse';

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
		this.fetchPostAbortController = new AbortController();
		this.fetchPosts();
	}

	componentWillUnmount() {
		this.fetchPostAbortController && this.fetchPostAbortController.abort();
	}

	render() {
		const { posts, isLoading, hasPrev, hasMore } = this.state;
		const { selection, onToggleSelected, termFilters, postType } = this.props;

		const defaultTermFilters = window.hmGbToolsData.postTypeTaxonomies[ postType ];

		return ( <Browse
			posts={ posts }
			isLoading={ isLoading }
			selection={ selection }
			onToggleSelected={ onToggleSelected }
			termFilters={ termFilters || defaultTermFilters }
			hasPrev={ hasPrev }
			hasMore={ hasMore }
			onPrevPostsPage={ () => this.prevPage() }
			onNextPostsPage={ () => this.nextPage() }
			onApplyFilters={ filters => this.applyFilters( filters ) }
		/> )
	}

	fetchPosts() {
		const { page, isLoading, filters } = this.state;
		const { storePosts, postType } = this.props;
		const query = {
			...filters,
			page,
			per_page: 25,
		};

		if ( isLoading ) {
			return;
		}

		this.setState( { isLoading: true } );

		const postTypeRestBase = window.hmGbToolsData.postTypes[ postType ].rest_base;

		apiFetch( {
			path: addQueryArgs( `wp/v2/${ postTypeRestBase }/`, query ),
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

	applyFilters( filters ) {
		this.setState( { filters }, () => this.fetchPosts() );
	}
}

PostSelectBrowse.propTypes = {
	postType: PropTypes.string,
	selection: PropTypes.array,
	onToggleSelected: PropTypes.func.isRequired,
	termFilters: PropTypes.arrayOf( PropTypes.shape( {
		slug: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		restBase: PropTypes.string.isRequired,
	} ) ).isRequired,
}

const applyWithDispatch = withDispatch( ( dispatch, ownProps ) => {
	const { receiveEntityRecords } = dispatch( 'core' );
	const { postType } = ownProps;

	return {
		storePost: post => receiveEntityRecords( 'postType', postType, post ),
		storePosts: ( posts, query ) => receiveEntityRecords( 'postType', postType, posts, query ),
	};
} );

export default applyWithDispatch( PostSelectBrowse );
