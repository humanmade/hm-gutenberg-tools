import wp from 'wp';
import React from 'react';
import PropTypes from 'prop-types';

const { __ } = wp.i18n;
const { Button } = wp.components;

const Modal = ( {
	modalTitle,
	onClose,
	modalRef,
	modalContent,
	modalToolbar,
} ) => (
	<div className="post-select post-select-modal">
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
				<span className="media-modal-icon">
					<span className="screen-reader-text">
						{ __( 'Close modal' ) }
					</span>
				</span>
			</Button>

			<div className="media-frame-title">
				<h1 id="media-modal-title">{ modalTitle }</h1>
			</div>

			<div className="media-modal-content">{ modalContent }</div>

			<div className="media-frame-toolbar">
				<div className="media-toolbar">
					{ modalToolbar }
				</div>
			</div>
		</div>
	</div>
);

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	modalTitle: PropTypes.string.isRequired,
	modalContent: PropTypes.node.isRequired,
	modalToolbar: PropTypes.node.isRequired,
	// modalRef: PropTypes.node.isRequired,
}

export default Modal;
