import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _get from 'lodash/get';
import wp from 'wp';

const { withAPIData } = wp.components;

class TaxonomyFilter extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			isLoading: false,
			page:      1,
			terms:     [],
			value:     props.value,
		};

		this.createCollection();
	}

	componentDidMount() {
		this.fetchTerms();
	}

	render() {
		const { tax, taxonomy } = this.props;
		const { terms, value } = this.state;
		const id = `post-select-${taxonomy}-filter`;
		const isLoading = ( tax.isLoading || this.state.isLoading );
		const label = _get( tax, 'data.name', taxonomy );

		const selectProps = {
			id,
			isLoading,
			value,
			backspaceRemoves: true,
			multi:            true,
			options:          terms,
			onChange:         selected => this.updateValue( selected ),
		};

		return <div className="post-select-filters-row">
			<label htmlFor={ id }>{ label }</label>
			<Select { ...selectProps } />
		</div>;
	}

	createCollection() {
		const CollectionClass = wp.api.getTaxonomyCollection( this.props.taxonomy );
		this.collection = new CollectionClass();

		this.collection.on( 'request', () => this.setState( { isLoading: true } ) );
		this.collection.on( 'error sync', () => this.setState( { isLoading: false } ) );
		this.collection.on( 'sync', () => this.fetchMore() );

		this.collection.on( 'reset update', () => {
			const terms = this.collection.map( term => ( {
				label: term.get( 'name' ),
				value: term.id,
			} ) );

			this.setState( {
				terms,
				page: this.state.page + 1,
			} );
		} );
	}

	updateValue( selected ) {
		const nextValue = selected.map( option => option.value );

		this.setState( { value: nextValue } );
		this.props.onChange( nextValue );
	}

	getFetchOptions() {
		return {
			data: {
				page:     this.state.page,
				per_page: 100,
			},
			remove: false,
		};
	}

	/**
	 * Fetch terms
	 */
	fetchTerms() {
		this.collection.fetch( this.getFetchOptions() );
	}

	fetchMore() {
		if ( this.collection.hasMore() ) {
			this.fetchTerms();
		}
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
