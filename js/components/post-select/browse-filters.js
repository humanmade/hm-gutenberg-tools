import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

import FormFieldSearch from './form-field-search';
import TermSelect from '../../containers/post-select/term-select';

const { Button } = wp.components;
const { __ } = wp.i18n;

const PostBrowseFilters = ( { formId, value, termFilters, onSubmitFilters, onUpdateFilters } ) => (
	<form
		className="post-select-filters"
		onSubmit={ event => {
			event.preventDefault();
			onSubmitFilters();
		} }
	>
		<FormFieldSearch
			label={ __( 'Search Posts…' ) }
			placeholder={ __( 'Search posts…' ) }
			fieldId={ `${formId}-search` }
			value={ value.search || '' }
			onChange={ search => onUpdateFilters( {
				...value,
				search,
			} ) }
		/>

		{ termFilters.map( termFilter => (
			<TermSelect
				{ ...termFilter }
				formId={ `${formId}-${termFilter.slug}` }
				value={ value[ termFilter.restBase ] }
				onChange={ filterValue => {
					const filters = { ...value };
					filters[ termFilter.restBase ] = filterValue;
					onUpdateFilters( filters );
				} }
				key={ `term-filter-${ termFilter.slug }` }
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
