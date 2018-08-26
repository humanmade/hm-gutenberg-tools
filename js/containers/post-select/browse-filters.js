import React from 'react';
import PropTypes from 'prop-types';
import _uniqueId from 'lodash/uniqueId';

import PostBrowseFilters from '../../components/post-select/browse-filters';

class PostBrowseFiltersContainer extends React.Component {
	state = {
		filters: {},
	};

	constructor( props ) {
		super( props );
		this.id = _uniqueId( 'post-select-modal-filters-' );
	}

	render() {
		const {
			onApplyFilters,
			termFilters,
		} = this.props;

		return (
			<PostBrowseFilters
				formId={ this.id }
				value={ this.state.filters }
				termFilters={ termFilters }
				onUpdateFilters={ filters => this.setState( { filters } ) }
				onSubmitFilters={ () => onApplyFilters( this.state.filters ) }
			/>
		);
	}
}

PostBrowseFiltersContainer.propTypes = {
	onApplyFilters: PropTypes.func.isRequired,
	termFilters: PropTypes.arrayOf( PropTypes.shape( {
		slug: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		restBase: PropTypes.string.isRequired,
	} ) ).isRequired,
}

export default PostBrowseFiltersContainer;
