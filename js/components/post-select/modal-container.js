import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _uniqueId from 'lodash/uniqueId';
import _isEqual from 'lodash/isEqual';

import Modal from './modal';

const { __ } = wp.i18n;

class PostSelectModal extends React.Component {
	static defaultProps = {
		minPosts: 1,
		maxPosts: 1,
		postType: 'post',
		value: [],
	};

	static propTypes = {
		postType: PropTypes.string,
		minPosts: PropTypes.number,
		maxPosts: PropTypes.number,
		onSelect: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
	};

	constructor( props ) {
		super( props );

		this.state = {
			contentState: 'browse',
			selection: this.props.value,
		};
	}

	render() {
		const {
			onClose,
			modalTitle,
			onSelect,
			postType,
			termFilters,
		} = this.props;

		const {
			selection,
			contentState,
		} = this.state;

		return ( <Modal
			modalTitle={ modalTitle }
			postType={ postType }
			onSelect={ () => onSelect( selection ) }
			onClose={ onClose }
			onToggleSelected={ id => this.toggleSelected( id ) }
			onMoveItemDown={ id => this.moveItemDown( id ) }
			onMoveItemUp={ id => this.moveItemUp( id ) }
			onChangeContentState={ contentState => this.setState( { contentState } ) }
			termFilters={ termFilters }
			contentState={ contentState }
			selection={ selection }
		/> )
	}

	toggleSelected( id ) {
		const newSelection = [ ...this.state.selection ];
		const index = newSelection.indexOf( id );

		if ( index >= 0 ) {
			newSelection.splice( index, 1 );
		} else {
			newSelection.push( id );
		}

		this.setState( { selection: newSelection } );
	}

	moveItemUp( id ) {
		const { selection } = this.state;
		const newSelection = [ ...selection ];
		const index = selection.indexOf( id );

		if ( index < 1 ) {
			return;
		}

		const insertAfterItem = selection[ index - 1 ];
		newSelection.splice( index, 1 );
		newSelection.splice( newSelection.indexOf( insertAfterItem ), 0, id );

		this.setState( { selection: newSelection } );
	}

	moveItemDown( id ) {
		const { selection } = this.state;
		const newSelection = [ ...selection ];
		const index = selection.indexOf( id );

		if ( index > selection.length - 1 ) {
			return;
		}

		const insertAfterItem = selection[ index + 1 ];
		newSelection.splice( index, 1 );

		newSelection.splice( newSelection.indexOf( insertAfterItem ) + 1, 0, id );
		this.setState( { selection: newSelection } );
	}
}

PostSelectModal.defaultProps = {
	modalTitle: __( 'Select a post' ),
	termFilters: [],
	postType: 'post',
}

PostSelectModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	modalTitle: PropTypes.func,
	onSelect: PropTypes.func.isRequired,
	postType: PropTypes.string,
	termFilters: PropTypes.array,
}

export default PostSelectModal;
