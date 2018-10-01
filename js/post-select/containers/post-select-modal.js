import wp from 'wp';
import React from 'react';
import PropTypes from 'prop-types';
import _uniqueId from 'lodash/uniqueId';
import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';

import PostSelectModal from '../components/post-select-modal';

import {
	deleteAtIndex,
	moveItemAtIndexDown,
	moveItemAtIndexUp,
} from '../../utils/array-utils';

const { __ } = wp.i18n;

class PostSelectModalContainer extends React.Component {
	static defaultProps = {
		minPosts: 0,
		maxPosts: 0,
		postType: 'post',
		value: [],
		modalTitle: __( 'Select a post' ),
	};

	static propTypes = {
		postType: PropTypes.string,
		minPosts: PropTypes.number,
		maxPosts: PropTypes.number,
		onSelect: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
		modalTitle: PropTypes.string,
		termFilters: PropTypes.array,
	};

	state = {
		contentState: 'browse',
	};

	componentDidMount() {
		this.setState( { selection: this.props.value } );
		this.modalElement && this.modalElement.focus();
	}

	componentDidUpdate( prevProps, prevState ) {
		// Accessibility: Focus the modal if the modal content state changes.
		if ( this.modalElement && this.state.contentState !== prevState.contentState ) {
			this.modalElement && this.modalElement.focus();
		}
	}

	render() {
		const {
			onClose,
			modalTitle,
			postType,
			termFilters,
			onSelect,
			isLoading,
		} = this.props;

		const {
			selection,
			contentState,
		} = this.state;

		const { getEntityRecord } = wp.data.select( 'core' );

		const moveUp = id => this.setState( { selection: moveItemAtIndexUp( selection, selection.indexOf( id ) ) } )
		const moveDown = id => this.setState( { selection: moveItemAtIndexDown( selection, selection.indexOf( id ) ) } )

		return (
			<PostSelectModal
				modalTitle={ modalTitle }
				postType={ postType }
				onSelect={ () => onSelect( selection.map( id => getEntityRecord( 'postType', postType, id ) ) ) }
				onClose={ onClose }
				onToggleSelected={ id => this.toggleSelected( id ) }
				onMoveItemDown={ id => moveDown( id ) }
				onMoveItemUp={ id => moveUp( id ) }
				onChangeContentState={ contentState => this.setState( { contentState } ) }
				termFilters={ termFilters }
				contentState={ contentState }
				selection={ selection }
				modalRef={ el => this.modalElement = el }
				isLoading={ isLoading }
			/>
		);
	}

	toggleSelected( id ) {
		const { selection } = this.state;
		const { maxPosts } = this.props;
		const index = selection.indexOf( id );

		if ( index >= 0 ) {
			this.setState( { selection: deleteAtIndex( selection, index ) } );
		} else {
			if ( maxPosts && selection.length >= maxPosts ) {
				alert( `Max number (${maxPosts}) reached.` );
				return;
			} else {
				this.setState( { selection: [ ...selection, id ] } );
			}
		}
	}
}

/**
 * Prefetch the initial selection.
 */
export default PostSelectModalContainer;
