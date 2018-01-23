import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import Select from 'react-select';
import _uniqueId from 'lodash/uniqueId';
import _get from 'lodash/get';

import termFilters from './term-filters';

const { Button } = wp.components;
const { __ } = wp.i18n;

class PostBrowseFilters extends React.Component {
	state = {
		category: [],
	}

	constructor( props ) {
		super( props );
		this.id = _uniqueId( 'post-select-modal-filters' );
	}

	render() {
		const {
			onUpdate,
		} = this.props;

		return <form
			className="post-select-filters"
			onSubmit={ event => {
				event.preventDefault();
				this.onUpdate()
			} }
		>
			<div className="post-select-filters-row">
				<label htmlFor={ `${this.id}-search` } className="screen-reader-text">{ __( 'Search posts' ) }</label>
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
						{ termFilter.plural }
					</label>
					<Select.Async
						id={ `${this.id}-${termFilter.slug}` }
						multi={ true }
						backspaceRemoves={ true }
						value={ _get( this.state, termFilter.slug ) }
						onChange={ selectedOptions => {
							const newState = {};
							newState[ termFilter.slug ] = selectedOptions.map( option => option.value );
							this.setState( newState );
						} }
						loadOptions={ ( query, callback ) => {
							this.getTerms( termFilter.collection, query, callback )
						}}
					/>
				</div>
			} ) }
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
		const args = {
			search: this.searchInput.value,
		}

		termFilters.forEach( termFilter => {
			const terms = _get( this.state, termFilter.slug );
			if ( terms ) {
				args[ termFilter.slug ] = terms;
			}
		} );

		this.props.onUpdate( args );
	}

	getTerms( collectionName, query, callback ) {
		const collection = new wp.api.collections[ collectionName ]();

		const fetchData = {
			hmCache: true,
			data: {
				search: query
			}
		};

		return collection.fetch( fetchData )
			.then( json => {
				callback( null, {
					options: json.map( item => {
						return {
							label: item.name,
							value: item.id,
						}
					} ),
					complete: ! collection.hasMore(),
				});
			} );
	}
}

export default PostBrowseFilters;
