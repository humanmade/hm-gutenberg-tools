import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _uniqueId from 'lodash/uniqueId';
import wp from 'wp';

const { __ } = wp.i18n;
const { withAPIData } = wp.components;

class PostTypeFilter extends React.Component {
	render() {
		const { label, onChange, types, value } = this.props;
		const id = _uniqueId( 'post-select-post-type-filter' );

		let selectProps = {
			id,
			value,
			backspaceRemoves: false,
			isLoading:        types.isLoading,
			multi:            false,
			onChange:         selected => onChange( selected ),
		};

		if ( types.data ) {
			selectProps = Object.assign( {}, selectProps, {
				options: Object.keys( types.data ).map( type => ( {
					label:      types.data[ type ].name,
					taxonomies: types.data[ type ].taxonomies,
					value:      types.data[ type ].slug,
				} ) ),
			} );
		}

		return <div className="post-select-filters-row">
			<label htmlFor={ id }>{ __( 'Type' ) }</label>
			<Select { ...selectProps } />
		</div>;
	}
}

PostTypeFilter.defaultProps = { value: 'post' };

PostTypeFilter.propTypes = {
	value:    PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default withAPIData( () => ( { types: '/wp/v2/types' } ) )( PostTypeFilter );
