import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _get from 'lodash/get';
import wp from 'wp';

const { withAPIData } = wp.components;

class TaxonomyFilter extends React.Component {
	constructor( props ) {
		super( props );

		const CollectionClass = wp.api.getTaxonomyCollection( this.props.taxonomy );

		this.state = { isLoading: false };

		this.collection = new CollectionClass();

		this.collection.on( 'request', () => this.setState( { isLoading: true } ) );
		this.collection.on( 'sync error', () => this.setState( { isLoading: false } ) );
	}

	render() {
		const { onChange, tax, taxonomy, value } = this.props;
		const id = `post-select-${taxonomy}-filter`;
		const isLoading = ( tax.isLoading || this.state.isLoading );
		const label = _get( tax, 'data.name', taxonomy );

		const selectProps = {
			id,
			isLoading,
			value,
			multi:            true,
			backspaceRemoves: true,
			loadOptions:      ( query, callback ) => this.fetchTerms( query, callback ),
			onChange:         selected => onChange( selected.map( option => option.value ) ),
		};

		return <div className="post-select-filters-row">
			<label htmlFor={ id }>{ label }</label>
			<Select.Async { ...selectProps } />
		</div>;
	}

	/**
	 * Fetch terms
	 *
	 * @param {string}   query    Search query.
	 * @param {Function} callback Function to be called when the fetch is complete.
	 */
	fetchTerms( query, callback ) {
		this.collection.fetch( { data: { per_page: 100 } } )
			.done( terms => {
				const options = terms.map( term => ( {
					label: term.name,
					value: term.id,
				} ) );

				callback( null, {
					options,
					complete: ! this.collection.hasMore(),
				} );
			} );
	}
}

TaxonomyFilter.defaultProps = { value: [] };

TaxonomyFilter.propTypes = {
	onChange: PropTypes.func.isRequired,
	taxonomy: PropTypes.string.isRequired,
	value:    PropTypes.arrayOf( PropTypes.number ),
};

const TaxonomyFilterWithAPIData = withAPIData( ( { taxonomy } ) => {
	return { tax: `/wp/v2/taxonomies/${ taxonomy }` };
} )( TaxonomyFilter );

export default TaxonomyFilterWithAPIData;
