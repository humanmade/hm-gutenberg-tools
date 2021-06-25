import wp from 'wp';

import SelectionItem from '../components/selection-item';

const { withSelect } = wp.data;

/**
 * Core seems to only support fetching all users at once.
 * But since this data is probably available already, lets use it.
 */
export default withSelect( ( select, ownProps ) => ( {
	...ownProps,
	author: select( 'core' ).getAuthors().find( a => ownProps.post.author.id === a.id ),
	postTypeObject: select( 'core' ).getEntityRecord( 'root', 'postType', ownProps.post.type ),
	thumbnail: ownProps.post.thumbnail ? select( 'core' ).getMedia( ownProps.post.thumbnail ) : null,
} ) )( SelectionItem );
