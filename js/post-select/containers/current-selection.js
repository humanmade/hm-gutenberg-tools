/* global wp */

import React from 'react';

import CurrentSelection from '../components/current-selection';
import { fetchPostsById } from '../utils/fetch';

const { Component } = wp.element;

class CurrentSelectionContainer extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			posts: [],
			isLoading: false,
			isMounted: false,
		};
	}

	componentDidMount() {
		this.setState( { isMounted: true } );
		this.fetchPosts();
	}

	componentWillUnmount() {
		this.setState( { isMounted: false } );
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.postIds !== prevProps.postIds ) {
			this.fetchPosts();
		}
	}

	fetchPosts() {
		if ( this.props.postIds.length < 1 ) {
			return;
		}

		this.setState( { isLoading: true } );

		fetchPostsById( this.props.postIds, this.props.postTypes )
			.then( posts => this.state.isMounted && this.setState( {
				isLoading: false,
				posts,
			} ) );
	}

	render() {
		return (
			<CurrentSelection
				{ ...this.props }
				isLoading={ this.state.isLoading }
				posts={ this.state.posts }
			/>
		);
	}
}

export default CurrentSelectionContainer;
