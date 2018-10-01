import wp from 'wp';

import CurrentSelection from './components/current-selection';
import filterIdsByNotStored from '../utils/filter-ids-by-not-stored';

const { withSelect } = wp.data;

export default withSelect( ( select, ownProps ) => {
	const { getEntityRecords, getEntityRecord } = select( 'core' );
	const { postIds, postType } = ownProps;

	// If all posts already in store, use getEntityRecord for performance.
	if ( filterIdsByNotStored( postIds, postType ).length === 0 ) {
		return {
			posts: postIds.map( id => getEntityRecord( 'postType', postType, id ) ),
			isLoading: false,
		}
	}

	const posts = getEntityRecords( 'postType', postType, { include: postIds } );

	return {
		posts: posts || [],
		isLoading: ! posts,
	}
} )( CurrentSelection );
