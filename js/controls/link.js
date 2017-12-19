import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

const {
	InspectorControls,
	UrlInput,
} = wp.blocks;

/**
 * InspectorControl for image upload.
 */
const LinkControl = ( { label, id, help, onChange, value } ) => {
	return <InspectorControls.BaseControl label={ label } id={ id } help={ help }>
		<UrlInput
			value={ value }
			onChange={ onChange }
		/>
	</InspectorControls.BaseControl>
}

LinkControl.propTypes = {
	label: PropTypes.string.isRequired,
	help: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
}

export default LinkControl;

