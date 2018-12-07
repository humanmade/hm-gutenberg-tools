import React from 'react';
import PropTypes from 'prop-types';
import _uniqueId from 'lodash/uniqueId';
import wp from 'wp';
import _flatten from 'lodash/flatten';
import _uniq from 'lodash/uniq';

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
				postTypeObjects={ this.props.postTypeObjects }
				onUpdateFilters={ filters => this.setState( { filters } ) }
				onSubmitFilters={ () => this.props.onApplyFilters( this.state.filters ) }
			/>
		);
	}
}

PostBrowseFiltersContainer.propTypes = {
	onApplyFilters: PropTypes.func.isRequired,
	termFilters: PropTypes.arrayOf( PropTypes.string ),
}

const applyWithSelect = withSelect( ( select, ownProps ) => {
	const { getEntityRecord } = select( 'core' );
	const { postTypes } = ownProps;

	const postTypeObjects = postTypes.map( type => getEntityRecord( 'root', 'postType', type ) );

	// Set default term filters. Either defined or ALL from queried post types.
	const termFilters = Array.isArray( ownProps.termFilters ) ? ownProps.termFilters : _uniq( _flatten( postTypeObjects.map( o => o ? o.taxonomies : [] ) ) );

	// Get all terms objects for the current term filters.
	const terms = termFilters.map( slug => getEntityRecord( 'root', 'taxonomy', slug ) )
		.filter( term => !! term );

	return {
		...ownProps,
		terms: terms || [],
		postTypeObjects: postTypeObjects.filter( o => !! o ),
	};
} );

export default applyWithSelect( PostBrowseFiltersContainer );
