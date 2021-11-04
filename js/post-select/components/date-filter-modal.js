import PropTypes from 'prop-types';
import React from 'react';

import { Button, Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';

import FormFieldDate from './form-field-date';

const DateFilterModal = ( { dateId, description, heading, setErrorMessage, title, value, onUpdateFilters } ) => {
	const [ isOpen, setOpen ] = useState( false );

	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	const updateDate = newDate => {
		setErrorMessage( '' );

		const filtersUpdate = {
			...value,
		};

		// date is being unset.
		if ( newDate === null ) {
			filtersUpdate[dateId] = null;

			onUpdateFilters( filtersUpdate );
			return;
		}

		let date = new Date( newDate );

		// validate dates.
		switch ( dateId ) {
			case 'publishedAfter': {
				date.setHours( 0, 0, 0, 0 );

				const publishedBefore = value.publishedBefore ? new Date( value.publishedBefore ).getTime() / 1000 : null;

				if ( publishedBefore && date.getTime() / 1000 > publishedBefore ) {
					setErrorMessage( 'The published after date cannot be after the published before date.' );
					date = null;
				}
				break;
			}
			case 'publishedBefore': {
				date.setHours( 23, 59, 59 );

				const publishedAfter = value.publishedAfter ? new Date( value.publishedAfter ).getTime() / 1000 : null;

				if ( publishedAfter && date.getTime() / 1000 < publishedAfter ) {
					setErrorMessage( 'The published before date cannot be before the published after date.' );
					date = null;
				}
				break;
			}
			default:
				break;
		}

		filtersUpdate[dateId] = date ? date.toDateString() : date;

		onUpdateFilters( filtersUpdate );
	};

	return (
		<div className={ `hm-form-field-date-${dateId}` } >
			<h4>{ heading }</h4>

			<Button isSecondary onClick={ openModal }>
				Set date
			</Button>

			<p>{ value[dateId] ? value[dateId] : 'not set' }</p>

			{ isOpen && (
				<Modal
					overlayClassName="hm-date-filter-modal"
					title={ title }
					onRequestClose={ closeModal }
				>
					{ description }

					<FormFieldDate
						value={ value[dateId] || null }
						onChange={ newDate => updateDate( newDate ) }
					/>

					<Button isSecondary onClick={ () => updateDate( null ) }>
						Unset date
					</Button>
				</Modal>
			) }
		</div>
	);
};

DateFilterModal.propTypes = {
	description: PropTypes.string.isRequired,
	dateId: PropTypes.string.isRequired,
	heading: PropTypes.string.isRequired,
	setErrorMessage: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	onUpdateFilters: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default DateFilterModal;

