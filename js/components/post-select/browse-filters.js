import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import AsyncPaginate from 'react-select-async-paginate';
import _uniqueId from 'lodash/uniqueId';
import _get from 'lodash/get';

const { Button } = wp.components;
const { apiFetch } = wp;
const { __ } = wp.i18n;

const FiltersRow = ( { label, labelFor, children } ) => (
	<div className="post-select-filters-row">
		<label htmlFor={ labelFor } className="screen-reader-text">
			x { label }
		</label>
		{ children }
	</div>
);

const FilterSearch = ( { formId, value, onChange } ) => (
	<FiltersRow
		label={ __( 'Search posts' )}
		labelFor={ `${formId}-search` }
	>
		<input
			id={ `${formId}-search` }
			placeholder={ __( 'Search posts...' ) }
			type="search"
			value={ value || '' }
			onChange={ e => onChange( e.target.value ) }
		/>
	</FiltersRow>
);

const TermFilter = ( { formId, value, slug, restBase, label, onChange } ) => (
	<FiltersRow
		labelFor={ `${formId}-${slug}` }
		label={ label }
	>
		<AsyncPaginate
			id={ `${formId}-${slug}` }
			onChange={ val => console.log( val ) }
			loadOptions={ ( s, loadedOptions ) => {
				const response = apiFetch(`/wp/v2/${restBase}/?search=${s}` );
				console.log( response );
			} }
		/>
	</FiltersRow>
);

const PostBrowseFilters = ( { formId, value, termFilters, onSubmitFilters, onUpdateFilters } ) => (
	<form
		className="post-select-filters"
		onSubmit={ event => {
			event.preventDefault();
			onSubmitFilters();
		} }
	>
		<FilterSearch
			formId={ formId }
			value={ value.search }
			onChange={ search => onUpdateFilters( { search } ) }
		/>

		<Button isPrimary isLarge type="submit">
			Filter Posts
		</Button>
	</form>
);

PostBrowseFilters.defaultProps = {
	value: {},
}

PostBrowseFilters.propTypes = {
	value: PropTypes.object,
	onUpdateFilters: PropTypes.func.isRequired,
	termFilters: PropTypes.arrayOf( PropTypes.shape( {
		slug: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		restBase: PropTypes.string.isRequired,
	} ) ).isRequired,
}

export default PostBrowseFilters;
