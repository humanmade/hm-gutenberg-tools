/* global wp */

import React from 'react';
import PropTypes from 'prop-types';

import Browse from '../components/browse';

const { apiFetch } = wp;

const {
	withDispatch,
	withSelect,
} = wp.data;

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
		if ( window.AbortController ) {
			this.fetchPostAbortController = new AbortController();
		}
		this.fetchPosts();
	}

	componentWillUnmount() {
		this.fetchPostAbortController && this.fetchPostAbortController.abort();
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.postTypeObject !== this.props.postTypeObject ) {
			this.fetchPosts();
		}
	}

	fetchPosts() {
		const { page, isLoading, filters } = this.state;
		const { storePosts, postTypeObject } = this.props;

		const query = {
			...filters,
			page,
			per_page: 25,
		};

		if ( isLoading || ! postTypeObject ) {
			return;
		}

		if ( this.fetchPostAbortController ) {
			this.fetchPostAbortController.abort();
			this.fetchPostAbortController = new AbortController();
		}

		this.setState( { isLoading: true } );

		apiFetch( {
			path: addQueryArgs( `wp/v2/${ postTypeObject.rest_base }/`, query ),
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

	render() {
		const { posts, isLoading, hasPrev, hasMore } = this.state;
		const { selection, onToggleSelected, termFilters, postTypeObject } = this.props;
		const defaultTermFilters = postTypeObject ? postTypeObject.taxonomies : [];

		return (
			<Browse
				posts={ posts }
				isLoading={ isLoading || ! postTypeObject }
				selection={ selection }
				onToggleSelected={ onToggleSelected }
				termFilters={ termFilters || defaultTermFilters }
				hasPrev={ hasPrev }
				hasMore={ hasMore }
				onPrevPostsPage={ () => this.prevPage() }
				onNextPostsPage={ () => this.nextPage() }
				onApplyFilters={ filters => this.applyFilters( filters ) }
			/>
		);
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
	termFilters: PropTypes.arrayOf( PropTypes.string ),
}

const applyWithSelect = withSelect( ( select, ownProps ) => {
	const { getEntityRecord } = select( 'core' );
	const { postType } = ownProps;

	const postTypeObject = getEntityRecord( 'root', 'postType', postType );

	return {
		isPropsLoading: ! postTypeObject,
		postTypeObject,
	}
} );

const applyWithDispatch = withDispatch( ( dispatch, ownProps ) => {
	const { receiveEntityRecords } = dispatch( 'core' );
	const { postType } = ownProps;

	return {
		storePost: post => receiveEntityRecords( 'postType', postType, post ),
		storePosts: ( posts, query ) => receiveEntityRecords( 'postType', postType, posts, query ),
	};
} );

export default applyWithSelect( applyWithDispatch( PostSelectBrowse ) );
