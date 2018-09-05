import React from 'react';
import TestRenderer from 'react-test-renderer';

import FormRow from './form-row';

test( 'Form Row', () => {
	const testRenderer = TestRenderer.create(
		React.createElement( FormRow, {
			label: 'Foo',
			labelFor: 'bar',
		}, 'test' )
	);

	expect( testRenderer.toJSON() ).toMatchSnapshot();
} );
