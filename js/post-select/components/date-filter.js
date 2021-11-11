import PropTypes from 'prop-types';
import React from 'react';

import { Button, DatePicker } from '@wordpress/components';

const DateFilter = ( { dateId, description, setErrorMessage, value, onUpdateDateFilter } ) => {
	const updateDate = newDate => {
		setErrorMessage( '' );

		const filtersUpdate = {
			...value,
		};

		// date is being unset.
		if ( newDate === null ) {
			filtersUpdate[dateId] = null;

			onUpdateDateFilter( filtersUpdate );
			return;
		}

		let date = new Date( newDate );

		// validate dates.
		switch ( dateId ) {
			case 'after': {
				date.setHours( 0, 0, 0, 0 );

				const before = value.before ? new Date( value.before ) : null;

				if ( before && date > before ) {
					setErrorMessage( 'The published after date cannot be after the published before date.' );
					date = null;
				}
				break;
			}
			case 'before': {
				date.setHours( 23, 59, 59 );

				const after = value.after ? new Date( value.after ) : null;

				if ( after && date < after ) {
					setErrorMessage( 'The published before date cannot be before the published after date.' );
					date = null;
				}
				break;
			}
			default:
				break;
		}

		if ( date ) {
			filtersUpdate[dateId] = date.toDateString();
		}

		onUpdateDateFilter( filtersUpdate );
	};

	return (
		<div className={ 'hm-form-field-date-filter' } >
			<p>{ description }</p>

			<DatePicker
				currentDate={ value[dateId] || null }
				onChange={ newDate => updateDate( newDate ) }
			/>

			<Button isSecondary onClick={ () => updateDate( null ) }>
				Unset date
			</Button>
		</div>
	);
};

DateFilter.propTypes = {
	description: PropTypes.string.isRequired,
	dateId: PropTypes.string.isRequired,
	setErrorMessage: PropTypes.func.isRequired,
	onUpdateDateFilter: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default DateFilter;

