import React from 'react';
import PropTypes from 'prop-types';

const FiltersRow = ( { label, labelFor, children } ) => (
	<div className="post-select-form-row">
		<label htmlFor={ labelFor } className="screen-reader-text">
			{ label }
		</label>
		{ children }
	</div>
);

FiltersRow.propTypes = {
	label: PropTypes.string.isRequired,
	labelFor: PropTypes.string.isRequired,
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node,
	] ).isRequired,
}

export default FiltersRow;
