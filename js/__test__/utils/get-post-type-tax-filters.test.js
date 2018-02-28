/**
 * @jest-environment node
 */
import getPostTypeTaxFilters from '../../utils/get-post-type-tax-filters';

test( 'Gets post type tax filters', () => {
	expect( getPostTypeTaxFilters( 'post' ) ).toEqual( [ 'foo', 'bar' ] );
	expect( getPostTypeTaxFilters( 'page' ) ).toEqual( [] );
	expect( getPostTypeTaxFilters( '' ) ).toEqual( [] );
} );

