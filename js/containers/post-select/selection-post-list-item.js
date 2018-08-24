import SelectionListItem from '../../components/post-select/selection-post-list-item';
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
	}
} )( SelectionListItem );

SelectionListItemContainer.propTypes = {
	postId: PropTypes.number.isRequired,
}

export default SelectionListItemContainer;
