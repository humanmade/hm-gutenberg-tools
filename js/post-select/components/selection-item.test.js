import React from 'react';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import SelectionListItem from './selection-post-list-item';

const post = {
	id: 123,
	type: 'foo',
	date_gmt: '2018-09-03T12:20:32',
	author: 456,
	title: { rendered: 'Test Post' },
};

test( 'Selection Post List Item - Loading', () => {
	const testRenderer = TestRenderer.create( <SelectionListItem /> );
	expect( testRenderer.toJSON() ).toMatchSnapshot();
} );

test( 'Selection Post List Item - With Post', () => {
	const renderer = new ShallowRenderer();
	renderer.render( <SelectionListItem post={ post } /> );
	expect( renderer.getRenderOutput() ).toMatchSnapshot();
} );
