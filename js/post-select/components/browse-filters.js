import PropTypes from 'prop-types';
import React from 'react';
import wp from 'wp';

import FormFieldSelectTerm from '../containers/term-select-form-field';

import FormFieldDates from './form-field-dates';
import FormFieldSearch from './form-field-search';
import FormFieldSelect from './form-field-select';

const { Button } = wp.components;
const { __ } = wp.i18n;
const { postStatuses } = window.hmGbToolsData;

const PostBrowseFilters = ( {
	formId,
	value,
	showDateFilters,
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

		{
			showDateFilters && (
				<FormFieldDates value={ value } onUpdateFilters={ onUpdateFilters } />
			)
		}

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
					// Convert type option objects to their post type slug.
					type: type.map( ( { value } ) => value ),
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

		<FormFieldSelect
			key={ 'status-filter' }
			fieldId={ `${formId}-status` }
			label={ __( 'Filter by Status', 'hm-gb-tools' ) }
			options={
				Object.entries( postStatuses ).map( ( [ key, label ] ) => ( {
					label: label.charAt( 0 ).toUpperCase() + label.slice( 1 ),
					value: key,
				} ) )
			}
			placeholder={ __( 'Filter by Status', 'hm-gb-tools' ) }
			onChange={ filterValue => onUpdateFilters( {
				...value,
				status: filterValue.map( ( { value } ) => value ),
			} ) }
		/>

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
	value: PropTypes.objectOf(
		PropTypes.oneOfType( [
			PropTypes.arrayOf( PropTypes.number ),
			PropTypes.string,
		] )
	),
	onUpdateFilters: PropTypes.func.isRequired,
	terms: PropTypes.arrayOf( PropTypes.object ),
};

export default PostBrowseFilters;
