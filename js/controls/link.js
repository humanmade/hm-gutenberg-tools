import PropTypes from 'prop-types';
import React from 'react';
import wp from 'wp';

const {
	URLInput,
} = wp.editor;

const {
	BaseControl,
} = wp.components;

/**
 * InspectorControl for image upload.
 */
const LinkControl = ( {
	label,
	id,
	help,
	onChange,
	value,
} ) => {
	return (
		<BaseControl
			className="hm-link-control"
			help={ help }
			id={ id }
			label={ label }
		>
			<URLInput
				value={ value }
				onChange={ onChange }
			/>
		</BaseControl>
	);
};

LinkControl.propTypes = {
	label: PropTypes.string.isRequired,
	help: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default LinkControl;

