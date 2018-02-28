import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import wp from 'wp';

const { withAPIData } = wp.components;

const TaxonomyFilter = props => {
	const { label, onChange, taxonomy, terms, value } = props;
	const id = `post-select-${taxonomy}-filter`;

	let selectProps = {
		id,
		value,
		isLoading:        terms.isLoading,
		multi:            true,
		backspaceRemoves: true,
		onChange:         selectedOptions => onChange( selectedOptions ),
	};

	if ( terms.data ) {
		selectProps = Object.assign( {}, selectProps, {
			options: terms.data.map( term => ( {
				label: term.name,
				value: term.id,
			} ) ),
		} );
	}

	return <div className="post-select-filters-row">
		<label htmlFor={ id }>{ label }</label>
		<Select { ...selectProps } />
	</div>;
};

TaxonomyFilter.defaultProps = { value: [] };

TaxonomyFilter.propTypes = {
	label:    PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	taxonomy: PropTypes.string.isRequired,
	value:    PropTypes.array,
};

// export default TaxonomyFilter;

const TaxonomyFilterWithAPIData = withAPIData( ( props, api ) => {
	const { taxonomy, search } = props;
	let termsEndpoint = `/wp/v2/${ api.taxonomy( taxonomy ) }?per_page=100`;

	if ( search ) {
		termsEndpoint = `${ termsEndpoint }&search=${ search }`;
	}

	return {
		tax:   `/wp/v2/taxonomies/${ taxonomy }`,
		terms: termsEndpoint,
	};
} )( TaxonomyFilter );

export default TaxonomyFilterWithAPIData;
