import _flatten from 'lodash/flatten';
import _uniq from 'lodash/uniq';
import _uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React from 'react';
import wp from 'wp';

import PostBrowseFilters from '../components/browse-filters';

const { withSelect } = wp.data;

class PostBrowseFiltersContainer extends React.Component {
	constructor( props ) {
		super( props );
		const { filters } = props;

		this.state = {
			filters: { ...filters },
		};
	}

	componentDidMount() {
		this.setState( { id: _uniqueId( 'post-select-modal-filters-' ) } );
	}

	render() {
		return (
			<PostBrowseFilters
				formId={ this.state.id }
				postTypeObjects={ this.props.postTypeObjects }
				showDateFilters={ this.props.showDateFilters }
				terms={ this.props.terms }
				value={ this.state.filters }
				onSubmitFilters={ () => this.props.onApplyFilters( this.state.filters ) }
				onUpdateFilters={ filters => this.setState( { filters } ) }
			/>
		);
	}
}

PostBrowseFiltersContainer.propTypes = {
	filters: PropTypes.objectOf( PropTypes.arrayOf( PropTypes.number ) ),
	onApplyFilters: PropTypes.func.isRequired,
	termFilters: PropTypes.arrayOf( PropTypes.string ),
};

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
