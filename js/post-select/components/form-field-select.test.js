// import jest from 'jest';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import FormFieldSelect from './form-field-select';

const options = [
	{
		value: 1,
		label: 'Option 1',
	},
	{
		value: 2,
		label: 'Option 2',
	},
];

test( 'Form Search Field', () => {
	const onChangeHandler = jest.fn();
	const renderer = new ShallowRenderer();

	renderer.render(
		<FormFieldSelect
			fieldId="test-field"
			label="Test Select Field Label"
			onChange={ onChangeHandler }
			options={ options }
			isLoading={ false }
			onFetchMoreTerms={ jest.fn() }
			onUpdateSearch={ jest.fn() }
		/>
	);

	const result = renderer.getRenderOutput()
	expect( result ).toMatchSnapshot();

	// Test that onChange is called correctly.
	result.props.children.props.onChange( [ { value: 'a' } ] );
	expect( onChangeHandler.mock.calls.length ).toBe( 1 );
	expect( onChangeHandler.mock.calls[0][0] ).toHaveLength( 1 );
	expect( onChangeHandler.mock.calls[0][0][0] ).toBe( 'a' );
} );
