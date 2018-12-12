import React from 'react';
import Select from 'react-select'
import PropTypes from 'prop-types'

import FormRow from './form-row';

const FormFieldSelect = ( {
	fieldId,
	label,
	onChange,
	options,
	isLoading,
	onFetchMoreTerms,
	onUpdateSearch,
	placeholder,
} ) => (
	<FormRow
		labelFor={ fieldId }
		label={ label }
	>
		<Select
			onChange={ options => onChange( options.map( option => option.value ) ) }
			id={ fieldId }
			options={ options }
			isMulti={ true }
			isLoading={ isLoading }
			onMenuScrollToBottom={ () => onFetchMoreTerms && onFetchMoreTerms() }
			onInputChange={ s => onUpdateSearch && onUpdateSearch( s ) }
			maxMenuHeight={ 300 }
			placeholder={ placeholder }
		/>
	</FormRow>
);

FormFieldSelect.propTypes = {
	fieldId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf( PropTypes.shape( {
		label: PropTypes.string.isRequired,
		value: PropTypes.oneOfType( [
			PropTypes.string,
			PropTypes.number,
		] ).isRequired,
	} ) ).isRequired,
	isLoading: PropTypes.bool,
	onFetchMoreTerms: PropTypes.func,
	onUpdateSearch: PropTypes.func,
}

export default FormFieldSelect;
