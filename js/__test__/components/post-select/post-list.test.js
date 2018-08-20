/**
 * @jest-environment node
 */
jest.mock( 'wp' );

import React from 'react';
import { shallow } from 'enzyme';
import wp from 'wp'; // eslint-disable-line no-unused-vars
import PostList from '../../../components/post-select/post-list';

test( 'Post List with defaults', () => {
	const postList = shallow( <PostList onToggleSelectedPosts={ () => {} }  /> );
	expect( postList.children( '.post-list-item' ).length ).toBe( 0 );
} );

test( 'Post List with posts ', () => {
	const posts = [
		{
			id: 1,
			title: { rendered: 'Foo' },
		},
		{
			id: 2,
			title: { rendered: 'Bar' },
		},
	];

	const selectedPosts = [
		{
			id: 2,
			title: { rendered: 'Bar' },
		},
	];

	const postList = shallow( <PostList
		posts={ posts }
		selectedPosts={ selectedPosts }
		onToggleSelectedPosts={ () => {} }
	/> );

	expect( postList.find( '.post-list-item' ).length ).toBe( 2 );
	expect( postList.find( '.focused' ).length ).toBe( 1 );
} );

test( 'Post List select post', () => {
	const onToggleSelectedPosts = jest.fn();

	const posts = [
		{
			id: 1,
			title: { rendered: 'Foo' },
		},
		{
			id: 2,
			title: { rendered: 'Bar' },
		},
	];

	const selectedPosts = [
		{
			id: 2,
			title: { rendered: 'Bar' },
		},
	];

	const postList = shallow( <PostList
		posts={ posts }
		selectedPosts={ selectedPosts }
		onToggleSelectedPosts={ onToggleSelectedPosts }
	/> );

	postList.find( '.post-list-item' ).at( 1 ).simulate( 'click' );
	expect( onToggleSelectedPosts.mock.calls.length ).toBe( 1 );
	expect( onToggleSelectedPosts.mock.calls[0][0] ).toEqual( posts[1] );
} );
