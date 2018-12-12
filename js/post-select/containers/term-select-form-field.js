/* global wp */

import React from 'react';
import PropTypes from 'prop-types';

import _uniqBy from 'lodash/uniqBy';

import FormFieldSelect from '../components/form-field-select';
import { fetchJson } from '../utils/fetch';

const { addQueryArgs } = wp.url;
const { __ } = wp.i18n;

class TermSelect extends React.Component {
	state = {
		options: [],
		isLoading: false,
		page: 1,
		hasMore: false,
	};

	componentDidMount() {
		this.fetchPostAbortController = new AbortController();
		this.fetchTerms();
	}

	componentWillUnmount() {
		this.fetchPostAbortController && this.fetchPostAbortController.abort();
	}

	fetchTerms() {
		const { restBase } = this.props;
		const { page, options, search } = this.state;

		const query = {
			page,
			per_page: 10,
		};

		if ( search && search.length >= 3 ) {
			query.search = search;
		}

		this.setState( { isLoading: true } );

		fetchJson( {
			path: addQueryArgs( `wp/v2/${restBase}/`, query ),
			signal: this.fetchPostAbortController.signal,
		} ).then( ( [ terms, headers ] ) => {
			const newOptions = _uniqBy( [ ...options, ...terms.map( term => ( {
				value: term.id,
				label: term.name,
			} ) ) ], 'value' );

			this.setState( {
				options: newOptions,
				hasMore: parseInt( headers['x-wp-totalpages'], 10 ) > page,
				isLoading: false,
			} );
		} );
	}

	fetchMoreTerms() {
		const { page, hasMore, isLoading } = this.state;

		if ( ! hasMore || isLoading ) {
			return;
		}

		this.setState( { page: page + 1 }, () => this.fetchTerms() );
	}

	updateSearch( search ) {
		if ( search.length >= 3 ) {
			this.setState( {
				search,
				page: 1,
			}, () => this.fetchTerms() );
		}
	}

	handleChange( value ) {
		const { onChange } = this.props;
		this.setState( {
			search: null,
			page: 1,
		} );
		onChange( value );
	}

	render() {
		return (
			<FormFieldSelect
				{ ...this.state }
				{ ...this.props }
				fieldId={ this.props.fieldId }
				label={ __( `Filter by ${this.props.label}` )  }
				placeholder={ __( `Filter by ${this.props.label}` )  }
				onChange={ value => this.handleChange( value ) }
				onFetchMoreTerms={ () => this.fetchMoreTerms() }
				onUpdateSearch={ s => this.updateSearch( s ) }
			/>
		);
	}
}

TermSelect.propTypes = {
	fieldId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	restBase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default TermSelect;
