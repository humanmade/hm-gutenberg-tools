import React from 'react';
import TestRenderer from 'react-test-renderer';

import PostListItemAuthor from './post-list-item-author';

const author = {
	name: 'Matt Mullenweg',
}

test( 'Post List Item Author', () => {
	const testRenderer = TestRenderer.create( <PostListItemAuthor id={ 1 } author={ author } /> );
	expect( testRenderer.toJSON() ).toMatchSnapshot();
} );
