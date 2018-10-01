import React from 'react';
import Select from 'react-select'

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
			onMenuScrollToBottom={ () => onFetchMoreTerms() }
			onInputChange={ s => onUpdateSearch( s ) }
			maxMenuHeight={ 300 }
			placeholder={ placeholder }
		/>
	</FormRow>
);

export default FormFieldSelect;
