import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import wp from 'wp';

import PostSelectBrowse from '../containers/browse';

import Modal from './modal';
import PostSelectSelection from './selection';

const { Button } = wp.components;
const { __ } = wp.i18n;

const PostSelectModal = props => {
	const {
		filters,
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
		showDateFilters,
		modalRef,
		isLoading,
	} = props;

	const modalToolbar = (
		<Fragment>
			<Button
				isPrimary
				onClick={ () => onSelect() }
			>Select</Button>
			{ contentState !== 'selection' && (
				<Button
					isPrimary={ false }
					onClick={ () => onChangeContentState( 'selection' ) }
				>{ __( 'Manage current selection', 'hm-gb-tools' ) }</Button>
			) }
			{ contentState !== 'browse' && (
				<Button
					isPrimary={ false }
					onClick={ () => onChangeContentState( 'browse' ) }
				>{ __( 'Browse posts', 'hm-gb-tools' ) }</Button>
			) }
		</Fragment>
	);

	const modalContent = (
		<Fragment>
			{ ( contentState === 'browse' ) && (
				<PostSelectBrowse
					filters={ filters }
					postType={ postType }
					selection={ selection }
					showDateFilters={ showDateFilters }
					termFilters={ termFilters }
					onToggleSelected={ onToggleSelected }
				/>
			) }
			{ ( contentState === 'selection' ) && (
				<PostSelectSelection
					postType={ postType }
					selection={ selection }
					onMoveItemDown={ onMoveItemDown }
					onMoveItemUp={ onMoveItemUp }
					onRemoveItem={ onToggleSelected }
				/>
			) }
		</Fragment>
	);

	return (
		<Modal
			modalContent={ isLoading ? <Fragment/> : modalContent }
			modalRef={ modalRef }
			modalTitle={ modalTitle }
			modalToolbar={ modalToolbar }
			onClose={ onClose }
		/>
	);
};

PostSelectModal.defaultProps = {
	modalTitle: __( 'Select a post', 'hm-gb-tools' ),
	contentState: 'browse',
	selection: [],
};

PostSelectModal.propTypes = {
	filters: PropTypes.objectOf( PropTypes.arrayOf( PropTypes.number ) ),
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
	showDateFilters: PropTypes.bool,
};

export default PostSelectModal;
