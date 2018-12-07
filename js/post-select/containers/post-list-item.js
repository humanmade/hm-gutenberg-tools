import wp from 'wp';

import PostListItem from '../components/post-list-item';

const { withSelect } = wp.data;

/**
 * Core seems to only support fetching all users at once.
 * But since this data is probably available already, lets use it.
 */
export default withSelect( ( select, ownProps ) => ( {
	...ownProps,
	author: select( 'core' ).getAuthors().find( a => ownProps.post.author.id === a.id ),
	postTypeObject: select( 'core' ).getEntityRecord( 'root', 'postType', ownProps.post.type ),
} ) )( PostListItem );
