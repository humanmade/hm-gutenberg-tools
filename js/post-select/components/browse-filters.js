import PropTypes from 'prop-types';
import React from 'react';
import wp from 'wp';

import FormFieldSelectTerm from '../containers/term-select-form-field';

import FormFieldSearch from './form-field-search';
import FormFieldSelect from './form-field-select';

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
			fieldId={ `${formId}-search` }
			label={ __( 'Search' ) }
			placeholder={ __( 'Search' ) }
			value={ value.search || '' }
			onChange={ search => onUpdateFilters( {
				...value,
				search,
			} ) }
		/>

		{ postTypeObjects.length > 1 && (
			<FormFieldSelect
				fieldId={ `${formId}-post-type` }
				label={ __( 'Filter by Post Type', 'hm-gb-tools' ) }
				options={ postTypeObjects.map( postType => ( {
					label: postType.labels.name,
					value: postType.slug,
				} ) ) }
				placeholder={ __( 'Filter by Post Type', 'hm-gb-tools' ) }
				onChange={ type => onUpdateFilters( {
					...value,
					type,
				} ) }
			/>
		) }

		{ terms.map( term => (
			<FormFieldSelectTerm
				key={ `term-filter-${ term.slug }` }
				fieldId={ `${formId}-${term.slug}` }
				label={ term.labels.name }
				restBase={ term.rest_base }
				value={ value[ term.rest_base ] }
				onChange={ filterValue => onUpdateFilters( {
					...value,
					[term.rest_base]: filterValue,
				} ) }
			/>
		) ) }

		<Button
			isPrimary
			type="submit"
		>
			Filter Posts
		</Button>
	</form>
);

PostBrowseFilters.defaultProps = {
	value: {},
	terms: [],
};

PostBrowseFilters.propTypes = {
	value: PropTypes.object,
	onUpdateFilters: PropTypes.func.isRequired,
	terms: PropTypes.arrayOf( PropTypes.object ),
};

export default PostBrowseFilters;
