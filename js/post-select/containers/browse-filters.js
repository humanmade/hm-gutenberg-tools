import React from 'react';
import PropTypes from 'prop-types';
import _uniqueId from 'lodash/uniqueId';
import wp from 'wp';

import PostBrowseFilters from '../components/browse-filters';

const { withSelect } = wp.data;

class PostBrowseFiltersContainer extends React.Component {
	state = {
		filters: {},
	};

	componentDidMount() {
		this.setState( { id: _uniqueId( 'post-select-modal-filters-' ) } );
	}

	render() {
		return (
			<PostBrowseFilters
				formId={ this.state.id }
				value={ this.state.filters }
				terms={ this.props.terms }
				onUpdateFilters={ filters => this.setState( { filters } ) }
				onSubmitFilters={ () => this.props.onApplyFilters( this.state.filters ) }
			/>
		);
	}
}

PostBrowseFiltersContainer.propTypes = {
	onApplyFilters: PropTypes.func.isRequired,
	termFilters: PropTypes.arrayOf( PropTypes.string ).isRequired,
}

const applyWithSelect = withSelect( ( select, ownProps ) => {
	const { getEntityRecord } = select( 'core' );
	const { termFilters } = ownProps;

	const terms = termFilters.map( slug => getEntityRecord( 'root', 'taxonomy', slug ) )
		.filter( term => !! term );

	return {
		...ownProps,
		terms: terms || [],
	};
} );

export default applyWithSelect( PostBrowseFiltersContainer );
