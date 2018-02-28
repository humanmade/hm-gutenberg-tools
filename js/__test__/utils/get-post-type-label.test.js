/**
 * @jest-environment node
 */
import getPostTypeLabel from '../../utils/get-post-type-label';

global.hmGbToolsData = {
	postTypeLabels: {
		post: {
			name:          'Posts',
			singular_name: 'Post',
		},
	},
};

test( 'Gets post type label', () => {
	expect( getPostTypeLabel( 'post' ) ).toEqual( 'Post' );
	expect( getPostTypeLabel( 'page' ) ).toEqual( 'Type' );
	expect( getPostTypeLabel( '' ) ).toEqual( 'Type' );
} );
