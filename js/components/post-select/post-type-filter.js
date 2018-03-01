/* global hmGbToolsData */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _uniqueId from 'lodash/uniqueId';
import wp from 'wp';

const { __ } = wp.i18n;

const PostTypeFilter = props => {
	const { label, onChange, value } = props;
	const id = _uniqueId( 'post-select-post-type-filter' );
	const options = Object.keys( hmGbToolsData.postTypeLabels ).map( type => ( {
		label: hmGbToolsData.postTypeLabels[ type ].singular_name,
		value: type,
	} ) );

	const selectProps = {
		id,
		options,
		value,
		backspaceRemoves: false,
		multi:            false,
		onChange:         selected => onChange( selected.value ),
	};

	return <div className="post-select-filters-row">
		<label htmlFor={ id }>{ label }</label>
		<Select { ...selectProps } />
	</div>;
}

PostTypeFilter.defaultProps = {
	label: __( 'Type' ),
	value: 'post',
};

PostTypeFilter.propTypes = {
	label:    PropTypes.string,
	value:    PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default PostTypeFilter;
