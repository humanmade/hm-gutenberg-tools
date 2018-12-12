import * as React from 'react';
import PropTypes from 'prop-types';

const FormRow = ( { label, labelFor, children } ) => (
	<div className="post-select-form-row">
		<label htmlFor={ labelFor } className="screen-reader-text">
			{ label }
		</label>
		{ children }
	</div>
);

FormRow.propTypes = {
	label: PropTypes.string.isRequired,
	labelFor: PropTypes.string.isRequired,
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node,
	] ).isRequired,
}

export default FormRow;
