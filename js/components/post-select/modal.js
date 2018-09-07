import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

import PostSelectBrowse from '../../containers/post-select/browse';
import PostSelectSelection from './selection';

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
	} = props;

	return ( <div className="post-select post-select-modal">
		<div className="media-modal-backdrop"></div>
		<div
			className="modal media-modal wp-core-ui"
			tabIndex="-1"
			role="dialog"
			aria-modal="true"
			aria-labelledby="media-modal-title"
			ref={ modalRef }
			onKeyDown={ e => e.keyCode === 27 && onClose() }
		>
			<Button
				className="media-modal-close"
				onClick={ () => onClose() }
			>
				<span className="media-modal-icon"><span className="screen-reader-text">{ __( 'Close media panel' ) }</span></span>
			</Button>
			<div className="media-frame-title">
				<h1 id="media-modal-title">{ modalTitle }</h1>
			</div>
			<div className="media-modal-content">
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
			</div>
			<div className="media-frame-toolbar">
				<div className="media-toolbar">
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
				</div>
			</div>
		</div>
	</div> )
}

PostSelectModal.defaultProps = {
	postType: 'post',
	modalTitle: __( 'Select a post' ),
	contentState: 'browse',
	selection: [],
};

PostSelectModal.propTypes = {
	postType: PropTypes.string,
	modalTitle: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onToggleSelected: PropTypes.func.isRequired,
	onMoveItemUp: PropTypes.func.isRequired,
	onMoveItemDown: PropTypes.func.isRequired,
	onChangeContentState: PropTypes.func.isRequired,
	contentState: PropTypes.string.isRequired,
	termFilters: PropTypes.array,
	selection: PropTypes.array,
	modalRef: PropTypes.func.isRequired,
};

export default PostSelectModal;
