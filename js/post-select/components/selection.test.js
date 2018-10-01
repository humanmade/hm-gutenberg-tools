import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Selection from './selection';

test( 'Selection - with no items.', () => {
	const renderer = new ShallowRenderer();
	renderer.render(
		<Selection
			postType="post"
			selection={ [] }
			onRemoveItem={ jest.fn() }
			onMoveItemUp={ jest.fn() }
			onMoveItemDown={ jest.fn() }
		/>
	);

	expect( renderer.getRenderOutput() ).toMatchSnapshot();
} );

test( 'Selection - with items.', () => {
	const renderer = new ShallowRenderer();
	renderer.render( <Selection
		postType="page"
		selection={ [ 1, 2 ] }
		onRemoveItem={ jest.fn() }
		onMoveItemUp={ jest.fn() }
		onMoveItemDown={ jest.fn() }
	/> );

	expect( renderer.getRenderOutput() ).toMatchSnapshot();
} );
