import PropTypes from 'prop-types';
import React from 'react';
import wp from 'wp';

import PostSelectModal from '../components/post-select-modal';
import {
	deleteAtIndex,
	moveItemAtIndexDown,
	moveItemAtIndexUp,
} from '../utils/array-utils';
import { fetchPostsById } from '../utils/fetch';

const { sprintf, __ } = wp.i18n;

class PostSelectModalContainer extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			isLoadingSelection: true,
			selection: [],
			contentState: 'browse',
		};
	}

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
			filters,
			onClose,
			modalTitle,
			showDateFilters,
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
				contentState={ contentState }
				filters={ filters }
				isLoading={ isLoadingSelection }
				modalRef={ el => this.modalElement = el }
				modalTitle={ modalTitle }
				postType={ postType }
				selection={ selection }
				showDateFilters={ showDateFilters }
				termFilters={ termFilters }
				onChangeContentState={ contentState => this.setState( { contentState } ) }
				onClose={ onClose }
				onMoveItemDown={ id => this.moveDown( id ) }
				onMoveItemUp={ id => this.moveUp( id ) }
				onSelect={ () => onSelect( selection ) }
				onToggleSelected={ id => this.toggleSelected( id ) }
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
			if ( maxPosts && maxPosts === 1 ) {
				// Special "switch" behavior for single-post-max
				this.setState( { selection: [ post ] } );
			} else if ( maxPosts && selection.length >= maxPosts ) {
				/* translators: %d is total number of posts. */
				alert( sprintf( __( 'Max number %d reached.', 'hm-gb-tools' ), maxPosts ) );
				return;
			} else {
				this.setState( { selection: [ ...selection, post ] } );
			}
		}
	}
}

PostSelectModalContainer.defaultProps = {
	minPosts: 0,
	maxPosts: 0,
	postType: [ 'post' ],
	showDateFilters: false,
	value: [],
	modalTitle: __( 'Select a post', 'hm-gb-tools' ),
};

PostSelectModalContainer.propTypes = {
	filters: PropTypes.objectOf( PropTypes.arrayOf( PropTypes.number ) ),
	postType: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.array,
	] ),
	minPosts: PropTypes.number,
	maxPosts: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	modalTitle: PropTypes.string,
	showDateFilters: PropTypes.bool,
	termFilters: PropTypes.arrayOf( PropTypes.string ),
};

/**
 * Prefetch the initial selection.
 */
export default PostSelectModalContainer;
