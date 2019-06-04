import wp from 'wp';
import React from 'react';
import PropTypes from 'prop-types';

import PostSelectModal from '../components/post-select-modal';
import { fetchPostsById } from '../utils/fetch';

import {
	deleteAtIndex,
	moveItemAtIndexDown,
	moveItemAtIndexUp,
} from '../utils/array-utils';

const { __ } = wp.i18n;

class PostSelectModalContainer extends React.Component {
	static defaultProps = {
		minPosts: 0,
		maxPosts: 0,
		postType: [ 'post' ],
		value: [],
		modalTitle: __( 'Select a post' ),
	};

	static propTypes = {
		postType: PropTypes.oneOfType( [
			PropTypes.string,
			PropTypes.array,
		] ),
		minPosts: PropTypes.number,
		maxPosts: PropTypes.number,
		onSelect: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
		modalTitle: PropTypes.string,
		termFilters: PropTypes.arrayOf( PropTypes.string ),
	};

	state = {
		isLoadingSelection: true,
		selection: [],
		contentState: 'browse',
	};

	componentDidMount() {
		this.fetchSelection();
		this.modalElement && this.modalElement.focus();
	}

	componentDidUpdate( prevProps, prevState ) {
		// Accessibility: Focus the modal if the modal content state changes.
		if ( this.modalElement && this.state.contentState !== prevState.contentState ) {
			this.modalElement && this.modalElement.focus();
		}
	}

	fetchSelection() {
		this.setState( { isLoadingSelection: true } );

		const postTypes = Array.isArray( this.props.postType ) ? this.props.postType : [ this.props.postType ];

		fetchPostsById( this.props.value, postTypes )
			.then( selection => this.setState( {
				isLoadingSelection: false,
				selection,
			} ) );
	}

	render() {
		const {
			onClose,
			modalTitle,
			termFilters,
			onSelect,
		} = this.props;

		const {
			selection,
			contentState,
			isLoadingSelection,
		} = this.state;

		const postType = Array.isArray( this.props.postType ) ? this.props.postType : [ this.props.postType ];

		return (
			<PostSelectModal
				modalTitle={ modalTitle }
				postType={ postType }
				onSelect={ () => onSelect( selection ) }
				onClose={ onClose }
				onToggleSelected={ id => this.toggleSelected( id ) }
				onMoveItemDown={ id => this.moveDown( id ) }
				onMoveItemUp={ id => this.moveUp( id ) }
				onChangeContentState={ contentState => this.setState( { contentState } ) }
				termFilters={ termFilters }
				contentState={ contentState }
				selection={ selection }
				modalRef={ el => this.modalElement = el }
				isLoading={ isLoadingSelection }
			/>
		);
	}

	moveUp( post ) {
		const index = this.state.selection.findIndex( p => p.id === post.id );
		this.setState( { selection: moveItemAtIndexUp( this.state.selection, index ) } );
	}

	moveDown( post ) {
		const index = this.state.selection.findIndex( p => p.id === post.id );
		this.setState( { selection: moveItemAtIndexDown( this.state.selection, index ) } );
	}

	toggleSelected( post ) {
		const { selection } = this.state;
		const { maxPosts } = this.props;
		const index = selection.findIndex( p => p.id === post.id );

		if ( index >= 0 ) {
			this.setState( { selection: deleteAtIndex( selection, index ) } );
		} else {
			if ( maxPosts && selection.length >= maxPosts ) {
				alert( `Max number (${maxPosts}) reached.` );
				return;
			} else {
				this.setState( { selection: [ ...selection, post ] } );
			}
		}
	}
}

/**
 * Prefetch the initial selection.
 */
export default PostSelectModalContainer;
