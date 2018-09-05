// jest.mock( 'wp', () => {} );
import * as React from 'react';
// import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import FormRow from './form-row';

test( 'Form Row', () => {
// 	const testRenderer = TestRenderer.create(
// 		React.createElement( FormRow, {
// 			label: 'Foo',
// 			labelFor: 'bar',
// 		}, 'test' )
// 	);

// 	console.log( testRenderer.toJSON() );
// 	expect( testRenderer.toJSON() ).toMatchSnapshot();

	const formRow = shallow( <FormRow label="Foo" labelFor="bar">Test</FormRow> );
	console.log( formRow )
	// expect( FormRow.children( '.post-list-item' ).length ).toBe( 0 );
} );
