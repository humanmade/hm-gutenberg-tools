import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _uniqBy from 'lodash/uniqBy';

import FormFieldSelect from '../../components/post-select/form-field-select';

const { apiFetch } = wp;
const { addQueryArgs } = wp.url;

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

		apiFetch( {
			path: addQueryArgs( `wp/v2/${restBase}/`, query ),
			signal: this.fetchPostAbortController.signal,
			parse: false,
		} ).then( response => Promise.all( [
			response.json ? response.json() : [],
			parseInt( response.headers.get( 'x-wp-totalpages' ), 10 ),
		] ) ).then( ( [ terms, totalPages ] ) => {
			const newOptions = _uniqBy( [ ...options, ...terms.map( term => ( {
				value: term.id,
				label: term.name,
			} ) ) ], 'value' );

			this.setState( {
				options: newOptions,
				hasMore: totalPages > page,
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
				placeholder={ __( `Filter by ${this.props.label}` )  }
				onChange={ value => this.handleChange( value ) }
				onFetchMoreTerms={ () => this.fetchMoreTerms() }
				onUpdateSearch={ s => this.updateSearch( s ) }
			/>
		);
	}
}

TermSelect.PropTypes = {
	slug: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	restBase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default TermSelect;
