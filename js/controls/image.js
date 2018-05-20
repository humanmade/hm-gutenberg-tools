import React from 'react';
import wp from 'wp';

const {
	MediaUploadButton,
} = wp.editor;

const {
	Button,
	BaseControl,
} = wp.components;

const { __ } = wp.i18n;

/**
 * InspectorControl for image upload.
 */
const ImageControl = props => {
	const {
		label,
		id,
		help,
		onChange,
		value = { id: null, src: null },
	} = props;

	const uploadButtonProps = { isLarge: true };
	const removeButtonProps = { isLarge: true, style: { marginLeft: '8px' } };

	return <BaseControl label={ label } id={ id } help={ help }>
		{ value.src && <img
			src={ value.src }
			data-id={ value.id }
			width="100"
			height="100"
			style={ { display: 'block', marginBottom: '8px' } }
		/> }

		<MediaUploadButton
			buttonProps={ uploadButtonProps }
			onSelect={ onChange }
			type="image"
		>
			{ value.src ? __( 'Change' ) : __( 'Select' ) }
		</MediaUploadButton>

		{ value.src && <Button
			{ ...removeButtonProps }
			onClick={ () => onChange() }
		>
			{ __( 'Remove' ) }
		</Button> }
	</BaseControl>
}

export default ImageControl;

