import SelectionListItem from '../components/selection-item';
import PropTypes from 'prop-types';
import wp from 'wp';

const { withSelect } = wp.data;

const SelectionListItemContainer = withSelect( ( select, ownProps ) => {
	const { getEntityRecord } = select( 'core' );

	const {
		postType,
		postId,
	} = ownProps;

	return {
		...ownProps,
		post: getEntityRecord( 'postType', postType, postId ),
		postTypeObject: getEntityRecord( 'root', 'postType', postType ),
	}
} )( SelectionListItem );

SelectionListItemContainer.propTypes = {
	postId: PropTypes.number.isRequired,
}

export default SelectionListItemContainer;
