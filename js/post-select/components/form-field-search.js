import PropTypes from 'prop-types';
import React from 'react';

import FormRow from './form-row';

const FormFieldSearch = ( { fieldId, label, placeholder, value, onChange } ) => (
	<FormRow
		label={ label }
		labelFor={ fieldId }
	>
		<input
			id={ fieldId }
			placeholder={ placeholder }
			type="search"
			value={ value }
			onChange={ e => onChange( e.target.value ) }
		/>
	</FormRow>
);

FormFieldSearch.propTypes = {
	fieldId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default FormFieldSearch;
