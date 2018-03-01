import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _get from 'lodash/get';
import wp from 'wp';

const { withAPIData } = wp.components;

const TaxonomyFilter = props => {
	const { onChange, tax, taxonomy, value } = props;
	const id = `post-select-${taxonomy}-filter`;
	const label = _get( tax, 'data.name', '' );

	const selectProps = {
		id,
		value,
		isLoading:        true,
		multi:            true,
		backspaceRemoves: true,
		onChange:         selected => onChange( selected.map( option => option.value ) ),
	};

	return <div className="post-select-filters-row">
		<label htmlFor={ id }>{ label }</label>
		<Select { ...selectProps } />
	</div>;
};

TaxonomyFilter.defaultProps = { value: [] };

TaxonomyFilter.propTypes = {
	onChange: PropTypes.func.isRequired,
	taxonomy: PropTypes.string.isRequired,
	value:    PropTypes.array,
};

const TaxonomyFilterWithAPIData = withAPIData( ( { taxonomy } ) => {
	return { tax: `/wp/v2/taxonomies/${ taxonomy }` };
} )( TaxonomyFilter );

export default TaxonomyFilterWithAPIData;
