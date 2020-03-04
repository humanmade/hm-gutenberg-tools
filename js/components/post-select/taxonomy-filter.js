/* global hmGbToolsData */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import wp from 'wp';

import { getTaxonomyRoute } from '../../utils/get-taxonomy-collection';

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

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.value !== this.props.value ) {
			this.setState( { value: nextProps.value } );
		}
	}

	componentWillUnmount() {
		this.collection.off();
		delete this.collection;
	}

	render() {
		const { className, label, onChange, taxonomy } = this.props;
		const { isLoading, terms, value } = this.state;
		const id = `post-select-${taxonomy}-filter`;

		const selectProps = {
			id,
			isLoading,
			value,
			backspaceRemoves:     true,
			multi:                true,
			options:              terms,
			onChange:             selected => onChange( selected.map( option => option.value ) ),
			onMenuScrollToBottom: () => this.fetchMore(),
		};

		return <div className={ className }>
			<label htmlFor={ id }>{ label }</label>
			<Select { ...selectProps } />
		</div>;
	}

	createCollection() {
		const route = '/' + wp.api.versionString + getTaxonomyRoute( this.props.taxonomy );
		const CollectionClass = wp.api.getCollectionByRoute( route );
		this.collection = new CollectionClass();

		this.collection.on( 'request', () => this.setState( { isLoading: true } ) );
		this.collection.on( 'error sync', () => this.setState( { isLoading: false } ) );

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

	getFetchOptions() {
		return {
			data: {
				page:     this.state.page,
				per_page: 100,
			},
			remove: false,
		};
	}

	fetchTerms() {
		this.collection.fetch( this.getFetchOptions() );
	}

	fetchMore() {
		if ( this.collection.hasMore() ) {
			this.fetchTerms();
		}
	}
}

TaxonomyFilter.defaultProps = {
	className: 'post-select-filters-row',
	value:     [],
};

TaxonomyFilter.propTypes = {
	className: PropTypes.string,
	label:     PropTypes.string.isRequired,
	onChange:  PropTypes.func.isRequired,
	taxonomy:  PropTypes.string.isRequired,
	value:     PropTypes.arrayOf( PropTypes.number ),
};

export default TaxonomyFilter;
