import PropTypes from 'prop-types';
import React from 'react';

import { DatePicker } from '@wordpress/components';

import FormRow from './form-row';

const FormFieldDate = ( { onChange, value } ) => (
	<FormRow>
		<DatePicker
			currentDate={ value }
			onChange={ newDate => onChange( newDate ) }
		/>
	</FormRow>
);

FormFieldDate.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default FormFieldDate;
