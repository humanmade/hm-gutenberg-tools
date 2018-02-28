/**
 * @jest-environment node
 */
jest.mock( 'wp' );

import React from 'react';
import { mount } from 'enzyme';
import wp from 'wp'; // eslint-disable-line no-unused-vars
import PostListItem from '../../../components/post-select/post-list-item';

const post = {
	id:    123,
	title: { rendered: 'Hello World' },
	type:  'post',
};

test( 'Post List Item', () => {
	const onClick = jest.fn();

	const postListItem = mount( <PostListItem post={ post } onClick={ onClick } className="foo" /> );

	expect( postListItem.childAt( 0 ).hasClass( 'foo' ) ).toBe( true );
	expect( postListItem.childAt( 0 ).props().id ).toBe( 'post-list-item-button-123' );
	expect( postListItem.find( '.post-list-item--title' ).text() ).toBe( 'Hello World' );
	expect( postListItem.find( '.post-list-item--meta' ).text() ).toBe( 'Post, Date, author' );
	expect( onClick.mock.calls.length ).toBe( 0 );

	postListItem.childAt( 0 ).props().onClick();
	expect( onClick.mock.calls.length ).toBe( 1 );
} );
