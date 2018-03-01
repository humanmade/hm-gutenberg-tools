import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _get from 'lodash/get';
import wp from 'wp';

const { withAPIData } = wp.components;

class TaxonomyFilter extends React.Component {
	constructor( props ) {
		super( props );

		const { taxonomy, value } = props;
		const CollectionClass = wp.api.getTaxonomyCollection( taxonomy );

		this.state = {
			value,
			isLoading: false,
			page:      1,
			terms:     [],
		};

		this.collection = new CollectionClass();

		this.collection.on( 'request', () => this.setState( { isLoading: true } ) );
		this.collection.on( 'sync error', () => this.setState( { isLoading: false } ) );
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
			backspaceRemoves:     true,
			multi:                true,
			options:              terms,
			onChange:             selected => this.updateValue( selected ),
			onMenuScrollToBottom: () => this.fetchMore(),
		};

		return <div className="post-select-filters-row">
			<label htmlFor={ id }>{ label }</label>
			<Select { ...selectProps } />
		</div>;
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
		};
	}

	/**
	 * Fetch terms
	 */
	fetchTerms() {
		this.collection.fetch( this.getFetchOptions() )
			.done( result => {
				const terms = result.map( term => ( {
					label: term.name,
					value: term.id,
				} ) );

				this.setState( {
					page:  this.state.page + 1,
					terms: this.state.terms.concat( terms ),
				} );
			} );
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
