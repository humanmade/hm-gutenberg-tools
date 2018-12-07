import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

import FormFieldSelect from './form-field-select';
import FormFieldSearch from './form-field-search';
import FormFieldSelectTerm from '../containers/term-select-form-field';

const { Button } = wp.components;
const { __ } = wp.i18n;

const PostBrowseFilters = ( {
	formId,
	value,
	terms,
	postTypeObjects,
	onSubmitFilters,
	onUpdateFilters,
} ) => (
	<form
		className="post-select-filters"
		onSubmit={ event => {
			event.preventDefault();
			onSubmitFilters();
		} }
	>
		<FormFieldSearch
			label={ __( 'Search' ) }
			placeholder={ __( 'Search' ) }
			fieldId={ `${formId}-search` }
			value={ value.search || '' }
			onChange={ search => onUpdateFilters( {
				...value,
				search,
			} ) }
		/>

		{ postTypeObjects.length > 1 && (
			<FormFieldSelect
				fieldId={ `${formId}-post-type` }
				label={ __( 'Filter by Post Type' ) }
				onChange={ type => onUpdateFilters( {
					...value,
					type,
				} ) }
				options={ postTypeObjects.map( postType => ( {
					label: postType.labels.name,
					value: postType.slug,
				} ) ) }
				placeholder={ __( 'Filter by Post Type' ) }
			/>
		) }

		{ terms.map( term => (
			<FormFieldSelectTerm
				key={ `term-filter-${ term.slug }` }
				label={ term.labels.name }
				restBase={ term.rest_base }
				fieldId={ `${formId}-${term.slug}` }
				value={ value[ term.rest_base ] }
				onChange={ filterValue => onUpdateFilters( {
					...value,
					[term.rest_base]: filterValue,
				} ) }
			/>
		) ) }

		<Button
			isPrimary
			isLarge
			type="submit"
		>
			Filter Posts
		</Button>
	</form>
);

PostBrowseFilters.defaultProps = {
	value: {},
	terms: [],
}

PostBrowseFilters.propTypes = {
	value: PropTypes.object,
	onUpdateFilters: PropTypes.func.isRequired,
	terms: PropTypes.arrayOf( PropTypes.object ),
}

export default PostBrowseFilters;
