import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _uniqueId from 'lodash/uniqueId';
import _get from 'lodash/get';

import getPostTypeTaxFilters from '../../utils/get-post-type-tax-filters';
import PostTypeFilter from './post-type-filter';
import TaxonomyFilter from './taxonomy-filter';

const { Button } = wp.components;
const { __ } = wp.i18n;

class PostBrowseFilters extends React.Component {

	constructor( props ) {
		super( props );

		this.id = _uniqueId( 'post-select-modal-filters-' );
		this.state = { postType: props.postType };
	}

	render() {
		const { postType } = this.state;
		const taxonomies = getPostTypeTaxFilters( postType );

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
			<PostTypeFilter
				value={ postType }
				onChange={ nextType => this.setState( {
					postType:   nextType.value,
					taxonomies: nextType.taxonomies,
				} ) }
			/>
			{ taxonomies.map( taxonomy => (
				<TaxonomyFilter
					key={ `${ this.id }-${ taxonomy.slug }` }
					label={ taxonomy.label }
					taxonomy={ taxonomy.slug }
					value={ _get( this.state, taxonomy.slug, [] ) }
					onChange={ value => this.setState( { [ taxonomy.slug ]: value } ) }
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
		let args = {
			postType: this.state.postType,
			search:   _get( this, 'searchInput.value' ),
		};

		this.state.taxonomies.forEach( taxonomy => {
			const termIds = _get( this.state, taxonomy );

			if ( termIds ) {
				args = {
					...args,
					[ taxonomy ]: termIds,
				};
			}
		} );

		this.props.onUpdate( args );
	}
}

PostBrowseFilters.propTypes = { onUpdate: PropTypes.func.isRequired };

export default PostBrowseFilters;
