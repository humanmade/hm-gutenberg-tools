import wp from 'wp';

import CurrentSelection from './components/current-selection';

const { withSelect, dispatch } = wp.data;

dispatch( 'core' ).addEntities( [
	{
		name: 'post-select',
		kind: 'hm-gb-tools/v1',
		baseURL: '/hm-gb-tools/v1/post-select',
	},
] );

export default withSelect( ( select, ownProps ) => {
	const { getEntityRecords } = select( 'core' );
	const { postIds, postType } = ownProps;
	const postTypes = Array.isArray( postType ) ? postType : [ postType ];
	const posts = getEntityRecords( 'hm-gb-tools/v1', 'post-select', {
		include: postIds,
		per_page: postIds.length,
		types: postTypes,
		orderby: 'include',
		context: 'view',
	} ) || [];

	return {
		posts: posts,
		isLoading: ! posts,
	};
} )( CurrentSelection );
