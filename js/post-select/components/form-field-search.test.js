// import jest from 'jest';
import React from 'react';
import TestRenderer from 'react-test-renderer';

import FormFieldSearch from './form-field-search';

test( 'Form Search Field', () => {
	const onChangeHandler = jest.fn();

	const testRenderer = TestRenderer.create(
		<FormFieldSearch fieldId="id-123" label="Search Field" value="test value" onChange={ onChangeHandler } />
	);

	expect( testRenderer.toJSON() ).toMatchSnapshot();

	testRenderer.root.findByType( 'input' ).props.onChange( { target: { value: 'new value' } } );
	expect( onChangeHandler.mock.calls.length ).toBe( 1 );
	expect( onChangeHandler.mock.calls[0][0] ).toBe( 'new value' );
} );
