import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

const {
	InspectorControls,
	UrlInput,
} = wp.editor;

const {
	BaseControl
} = wp.components;

/**
 * InspectorControl for image upload.
 */
const LinkControl = ( { label, id, help, onChange, value } ) => {
	return <BaseControl label={ label } id={ id } help={ help } className="hm-link-control">
		<UrlInput
			value={ value }
			onChange={ onChange }
		/>
	</BaseControl>
}

LinkControl.propTypes = {
	label:    PropTypes.string.isRequired,
	help:     PropTypes.string,
	id:       PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value:    PropTypes.string,
}

export default LinkControl;

