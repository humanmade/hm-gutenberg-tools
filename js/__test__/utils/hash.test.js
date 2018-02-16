/**
 * @jest-environment node
 */
import hash from '../../utils/hash';

test( 'Generates hash', () => {
	expect( hash( 'test' ) ).toEqual( 3556498 );
	expect( hash( [ 1, 2, 3 ] ) ).toEqual( 603453178 );
	expect( hash( { a: 'b' } ) ).toEqual( 1363984429 );
	expect( hash( '' ) ).toEqual( 0 );
} );

