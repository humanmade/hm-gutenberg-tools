import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

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
	value,
} ) => (
	<FormRow
		label={ label }
		labelFor={ fieldId }
	>
		<Select
			id={ fieldId }
			isLoading={ isLoading }
			isMulti
			maxMenuHeight={ 300 }
			options={ options }
			placeholder={ placeholder }
			value={ value }
			onChange={ onChange }
			onInputChange={ s => onUpdateSearch && onUpdateSearch( s ) }
			onMenuScrollToBottom={ () => onFetchMoreTerms && onFetchMoreTerms() }
		/>
	</FormRow>
);

FormFieldSelect.propTypes = {
	fieldId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.arrayOf( PropTypes.shape( {
		label: PropTypes.string.isRequired,
		value: PropTypes.oneOfType( [
			PropTypes.string,
			PropTypes.number,
		] ).isRequired,
	} ) ),
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
};

export default FormFieldSelect;
