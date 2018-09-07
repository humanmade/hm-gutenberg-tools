import wp from 'wp';

import PostListItemAuthor from '../../components/post-select/post-list-item-author';

const { withSelect } = wp.data;

/**
 * Core seems to only support fetching all users at once.
 * But since this data is probably available already, lets use it.
 */
export default withSelect( ( select, ownProps ) => ( {
	...ownProps,
	author: select( 'core' ).getAuthors().find( a => ownProps.id === a.id ),
} ) )( PostListItemAuthor );
