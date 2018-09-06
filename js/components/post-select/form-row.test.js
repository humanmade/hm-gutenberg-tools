import React from 'react';
import TestRenderer from 'react-test-renderer';

import FormRow from './form-row';

test( 'Form Row', () => {
	const testRenderer = TestRenderer.create( <FormRow label="Foo" labelFor="bar">Test</FormRow> );
	expect( testRenderer.toJSON() ).toMatchSnapshot();
} );
