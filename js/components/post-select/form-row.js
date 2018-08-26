import React from 'react';

const FiltersRow = ( { label, labelFor, children } ) => (
	<div className="post-select-form-row">
		<label htmlFor={ labelFor } className="screen-reader-text">
			{ label }
		</label>
		{ children }
	</div>
);

export default FiltersRow;
