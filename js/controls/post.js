import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

import PostSelectButton from '../post-select';
import CurrentSelection from '../current-selection';

const { BaseControl } = wp.components;
const { __ } = wp.i18n;

/**
 * InspectorControl for image upload.
 */
const PostControl = ( {
	label,
	id,
	help,
	onChange,
	value,
	postSelectProps,
	btnText,
} ) => {
	postSelectProps.btnProps = postSelectProps.btnProps || {};
	postSelectProps.btnProps.isLarge = true;

	return (
		<BaseControl label={ label } id={ id } help={ help } className="hm-post-control">
			<PostSelectButton
				{ ...postSelectProps }
				value={ value }
				onSelect={ posts => onChange( posts ) }
			>{ btnText }</PostSelectButton>

			{ value.length > 0 && (
				<CurrentSelection
					postIds={ value }
					postType={ postSelectProps.postType || 'post' }
				/>
			) }
		</BaseControl>
	)
}

PostControl.defaultProps = {
	btnText: __( 'Select post' ),
	postSelectProps: { btnProps: {} },
}

PostControl.propTypes = {
	label: PropTypes.string.isRequired,
	help: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.arrayOf( PropTypes.number ).isRequired,
	postSelectProps: PropTypes.object,
	btnText: PropTypes.string,
}

export default PostControl;

