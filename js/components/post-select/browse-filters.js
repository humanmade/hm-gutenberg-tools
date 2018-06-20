import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import Select from 'react-select';
import _uniqueId from 'lodash/uniqueId';
import _get from 'lodash/get';

const { Button } = wp.components;
const { __ } = wp.i18n;

class PostBrowseFilters extends React.Component {
	state = {};

	constructor( props ) {
		super( props );
		this.id = _uniqueId( 'post-select-modal-filters-' );
	}

	render() {
		const { termFilters } = this.props;

		return <form
			className="post-select-filters"
			onSubmit={ event => {
				event.preventDefault();
				this.onUpdate()
			} }
		>
			<div className="post-select-filters-row">
				<label htmlFor={ `${this.id}-search` } className="screen-reader-text">
					{ __( 'Search posts' ) }
				</label>
				<input
					id={ `${this.id}-search` }
					placeholder={ __( 'Search posts...' ) }
					type="search"
					ref={ input => this.searchInput = input } />
			</div>
			{ termFilters.map( termFilter => {
				return <div
					key={ termFilter.slug }
					className="post-select-filters-row"
				>
					<label htmlFor={ `${this.id}-${termFilter.slug}` }>
						{ termFilter.label }
					</label>
					<Select.Async
						id={ `${this.id}-${termFilter.slug}` }
						multi
						backspaceRemoves
						value={ _get( this.state, termFilter.slug ) }
						onChange={ selectedOptions => {
							const newState = {};
							newState[ termFilter.slug ] = selectedOptions.map( option => option.value );
							this.setState( newState );
						} }
						loadOptions={ ( query, callback ) => {
							this.getTerms( termFilter.slug, query, callback )
						}}
					/>
				</div>
			} ) }
			<Button
				isPrimary
				isLarge
				type="submit"
			>
				Filter Posts
			</Button>
		</form>
	}

	onUpdate() {
		const args = { search: _get( this, 'searchInput.value' ) };

		this.props.termFilters.forEach( termFilter => {
			const terms = _get( this.state, termFilter.slug );
			if ( terms ) {
				args[ termFilter.slug ] = terms;
			}
		} );

		this.props.onUpdate( args );
	}

	getTerms( taxSlug, query, callback ) {
		const Collection = hm.utils.api.getTaxonomyCollection( taxSlug );
		const taxCollection = new Collection();

		const fetchData = {
			hmCache: true,
			data:    { search: query },
		};

		return taxCollection.fetch( fetchData )
			.then( json => {
				callback( null, {
					options: json.map( item => {
						return {
							label: item.name,
							value: item.id,
						}
					} ),
					complete: ! taxCollection.hasMore(),
				} );
			} );
	}
}

PostBrowseFilters.propTypes = {
	onUpdate:    PropTypes.func.isRequired,
	termFilters: PropTypes.arrayOf( PropTypes.shape( {
		slug:  PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		rest:  PropTypes.string.isRequired,
	} ) ).isRequired,
}

export default PostBrowseFilters;
