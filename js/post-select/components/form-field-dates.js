import PropTypes from 'prop-types';
import React from 'react';
import wp from 'wp';

import { Button, Modal, Notice } from '@wordpress/components';
import { useState } from '@wordpress/element';

import DateFilter from './date-filter';
import FormRow from './form-row';

const { __ } = wp.i18n;

const FormFieldDates = ( { onUpdateFilters, value } ) => {
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const [ isOpen, setOpen ] = useState( false );
	const [ selectedDateRange, setSelectedDateRange ] = useState( '' );
	const [ filtersUpdate, setFiltersUpdate ] = useState( { ...value } );

	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	const save = () => {
		if ( filtersUpdate.after && ! ( filtersUpdate.before ) ) {
			setSelectedDateRange(
				`${__( 'Published after', 'hm-gb-tools' )} ${filtersUpdate.after}`
			);
		} else if ( ! ( filtersUpdate.after ) && filtersUpdate.before ) {
			setSelectedDateRange(
				`${__( 'Published before', 'hm-gb-tools' )} ${filtersUpdate.before}`
			);
		} else if ( filtersUpdate.after && filtersUpdate.before ) {
			if ( filtersUpdate.after === filtersUpdate.before ) {
				setSelectedDateRange(
					`${__( 'Published on', 'hm-gb-tools' )} ${filtersUpdate.after}`
				);
			} else {
				setSelectedDateRange(
					`${__( 'Published between', 'hm-gb-tools' )} ${filtersUpdate.after} ${__( 'and', 'hm-gb-tools' )} ${filtersUpdate.before}`
				);
			}
		} else {
			setSelectedDateRange( '' );
		}

		onUpdateFilters( filtersUpdate );
	};

	return (
		<FormRow>
			{
				selectedDateRange
			}

			<div className="hm-date-filters-modal-btn-edit-container">
				<Button isSecondary onClick={ openModal }>
					Edit date filter
				</Button>
			</div>

			{ isOpen && (
				<Modal
					className="hm-date-filters-modal"
					overlayClassName="hm-date-filters-modal-overlay"
					shouldCloseOnClickOutside={ false }
					title={ __( 'Set date range filter', 'hm-gb-tools' ) }
					onRequestClose={ () => {
						// reset to saved state.
						setFiltersUpdate( { ...value } );
						closeModal();
					} }
				>
					{
						errorMessage !== '' && (
							<Notice
								status="error"
								onRemove={ () => setErrorMessage( '' ) }
							>
								<p>
									{ __( 'An error occurred: ', 'hm-gb-tools' ) } <code>{ errorMessage }</code>.
								</p>
							</Notice>
						)
					}

					<DateFilter
						dateId="after"
						description={ __( 'Only posts published after the date will be returned when date is set.', 'hm-gb-tools' ) }
						setErrorMessage={ setErrorMessage }
						value={ filtersUpdate }
						onUpdateDateFilter={ setFiltersUpdate }
					/>

					<DateFilter
						dateId="before"
						description={ __( 'Only posts published before the date will be returned when date is set.', 'hm-gb-tools' ) }
						setErrorMessage={ setErrorMessage }
						value={ filtersUpdate }
						onUpdateDateFilter={ setFiltersUpdate }
					/>

					<div className="hm-date-filters-modal-btn-confirm-container">
						<Button
							isSecondary
							onClick={ () => {
								save();
								closeModal();
							} }
						>
								Confirm
						</Button>
					</div>
				</Modal>
			) }
		</FormRow>
	);
};

FormFieldDates.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default FormFieldDates;
