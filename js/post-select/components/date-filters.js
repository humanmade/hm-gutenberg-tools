import PropTypes from 'prop-types';
import React from 'react';
import wp from 'wp';

import { Notice } from '@wordpress/components';
import { useState } from '@wordpress/element';

import DateFilterModal from './date-filter-modal';

const { __ } = wp.i18n;

const DateFilters = ( { onUpdateFilters, value } ) => {
	const [ errorMessage, setErrorMessage ] = useState( '' );

	return (
		<div className="hm-published-date-filters-container">
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

			<div className="hm-published-date-filters">
				<DateFilterModal
					dateId="publishedAfter"
					description={ __( 'Only posts published after the date will be returned when date is set.', 'hm-gb-tools' ) }
					heading={ __( 'Published after date', 'hm-gb-tools' ) }
					setErrorMessage={ setErrorMessage }
					title={ __( 'Set published after date', 'hm-gb-tools' ) }
					value={ value }
					onUpdateFilters={ onUpdateFilters }
				/>

				<DateFilterModal
					dateId="publishedBefore"
					description={ __( 'Only posts published before the date will be returned when date is set.', 'hm-gb-tools' ) }
					heading={ __( 'Published before date', 'hm-gb-tools' ) }
					setErrorMessage={ setErrorMessage }
					title={ __( 'Set published before date', 'hm-gb-tools' ) }
					value={ value }
					onUpdateFilters={ onUpdateFilters }
				/>
			</div>
		</div>
	);
};

DateFilters.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default DateFilters;
