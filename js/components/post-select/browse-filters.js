import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _uniqueId from 'lodash/uniqueId';
import _get from 'lodash/get';
import TaxonomyFilter from './taxonomy-filter';

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
			{ termFilters.map( termFilter => (
				<TaxonomyFilter
					key={ `${this.id}-${termFilter.slug}` }
					label={ termFilter.label }
					taxonomy={ termFilter.slug }
					value={ this.state[ termFilter.slug ] || [] }
					onChange={ selectedOptions => {
						const values = selectedOptions.map( option => option.value );
						this.setState( { [ termFilter.slug ]: values } );
					} }
				/>
			) ) }
			<Button
				isPrimary={true}
				isLarge={true}
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
