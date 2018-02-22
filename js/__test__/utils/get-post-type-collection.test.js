/**
 * @jest-environment node
 */
jest.mock( 'wp' );

import wp from 'wp';
import getPostTypeCollection from '../../utils/get-post-type-collection';

global.wpApiSettings = { versionString: 'v2/' };

test( 'Gets post type collection', () => {
	expect( getPostTypeCollection( 'post' ) ).toEqual( wp.api.collections.Posts );
	expect( getPostTypeCollection( 'page' ) ).toBe( undefined );
} );

