/* global wp */

import PropTypes from 'prop-types';
import React from 'react';

import CurrentSelection from '../containers/current-selection';
import PostSelectButton from '../index';

const { BaseControl } = wp.components;
const { __ } = wp.i18n;

/**
 * InspectorControl for image upload.
 */
const PostSelectControl = ( {
	label,
	id,
	help,
	onChange,
	value,
	postSelectProps,
	btnText,
} ) => {
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
					postTypes={ postSelectProps.postType || [ 'post' ] }
				/>
			) }
		</BaseControl>
	);
};

PostSelectControl.defaultProps = {
	btnText: __( 'Select post' ),
	postSelectProps: { btnProps: {} },
};

PostSelectControl.propTypes = {
	label: PropTypes.string.isRequired,
	help: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.arrayOf( PropTypes.number ).isRequired,
};

export default PostSelectControl;

