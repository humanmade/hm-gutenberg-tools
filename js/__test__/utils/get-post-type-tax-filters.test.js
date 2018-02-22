/**
 * @jest-environment node
 */
import getPostTypeTaxFilters from '../../utils/get-post-type-tax-filters';

global.hmGbToolsData = { postTypeTaxonomies: { post: [ 'foo', 'bar' ] } };

test( 'Gets post type tax filters', () => {
	expect( getPostTypeTaxFilters( 'post' ) ).toEqual( [ 'foo', 'bar' ] );
	expect( getPostTypeTaxFilters( 'page' ) ).toEqual( [] );
	expect( getPostTypeTaxFilters( '' ) ).toEqual( [] );
} );

