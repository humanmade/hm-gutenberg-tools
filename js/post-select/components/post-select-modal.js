import wp from 'wp';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PostSelectBrowse from '../containers/browse';
import PostSelectSelection from './selection';
import Modal from './modal';

const { Button } = wp.components;
const { __ } = wp.i18n;

const PostSelectModal = props => {
	const {
		modalTitle,
		postType,
		onSelect,
		onClose,
		onToggleSelected,
		onMoveItemUp,
		onMoveItemDown,
		onChangeContentState,
		contentState,
		termFilters,
		selection,
		modalRef,
		isLoading,
	} = props;

	const modalToolbar = (
		<Fragment>
			<Button
				isPrimary={ true }
				isLarge
				onClick={ () => onSelect() }
			>Select</Button>
			{ contentState !== 'selection' && (
				<Button
					isPrimary={ false }
					isLarge
					onClick={ () => onChangeContentState( 'selection' ) }
				>View Selected Posts</Button>
			) }
			{ contentState !== 'browse' && (
				<Button
					isPrimary={ false }
					isLarge
					onClick={ () => onChangeContentState( 'browse' ) }
				>Browse posts</Button>
			) }
		</Fragment>
	);

	const modalContent = (
		<Fragment>
			{ ( contentState === 'browse' ) && (
				<PostSelectBrowse
					selection={ selection }
					postType={ postType }
					onToggleSelected={ onToggleSelected }
					termFilters={ termFilters }
				/>
			) }
			{ ( contentState === 'selection' ) && (
				<PostSelectSelection
					selection={ selection }
					postType={ postType }
					onRemoveItem={ onToggleSelected }
					onMoveItemUp={ onMoveItemUp }
					onMoveItemDown={ onMoveItemDown }
				/>
			) }
		</Fragment>
	);

	return (
		<Modal
			modalRef={ modalRef }
			modalToolbar={ modalToolbar }
			modalContent={ isLoading ? <Fragment/> : modalContent }
			modalTitle={ modalTitle }
			onClose={ onClose }
		/>
	);
}

PostSelectModal.defaultProps = {
	modalTitle: __( 'Select a post' ),
	contentState: 'browse',
	selection: [],
};

PostSelectModal.propTypes = {
	postType: PropTypes.array.isRequired,
	modalTitle: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onToggleSelected: PropTypes.func.isRequired,
	onMoveItemUp: PropTypes.func.isRequired,
	onMoveItemDown: PropTypes.func.isRequired,
	onChangeContentState: PropTypes.func.isRequired,
	contentState: PropTypes.string.isRequired,
	termFilters: PropTypes.array,
	selection: PropTypes.arrayOf( PropTypes.object ),
	modalRef: PropTypes.func.isRequired,
};

export default PostSelectModal;
