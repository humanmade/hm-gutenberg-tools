import PropTypes from 'prop-types';
import * as React from 'react';

const FormRow = ( { label, labelFor, children } ) => (
	<div className="post-select-form-row">
		<label className="screen-reader-text" htmlFor={ labelFor }>
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
};

export default FormRow;
