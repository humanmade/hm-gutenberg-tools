import wp from 'wp';

import CurrentSelection from './components/current-selection';
// import filterIdsByNotStored from '../utils/filter-ids-by-not-stored';

const { withSelect } = wp.data;

export default withSelect( ( select, ownProps ) => {
	const { getEntityRecords } = select( 'core' );
	const { postIds, postType } = ownProps;
	const posts = getEntityRecords( 'postType', postType, { include: postIds } );

	return {
		posts: posts || [],
		isLoading: ! posts,
	}
} )( CurrentSelection );
