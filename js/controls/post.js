import PropTypes from 'prop-types';
import React from 'react';
import wp from 'wp';

import CurrentSelection from '../current-selection';
import PostSelectButton from '../post-select';

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
	postSelectProps.btnProps.isSecondary = true;

	return (
		<BaseControl className="hm-post-control" help={ help } id={ id } label={ label }>
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
	);
};

PostControl.defaultProps = {
	btnText: __( 'Select post' ),
	postSelectProps: { btnProps: {} },
};

PostControl.propTypes = {
	label: PropTypes.string.isRequired,
	help: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.arrayOf( PropTypes.number ).isRequired,
	postSelectProps: PropTypes.object,
	btnText: PropTypes.string,
};

export default PostControl;
