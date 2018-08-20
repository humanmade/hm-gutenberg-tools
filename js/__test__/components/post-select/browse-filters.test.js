/**
 * @jest-environment node
 */
jest.mock( 'wp' );

import React from 'react';
import { mount, shallow } from 'enzyme';
import wp from 'wp'; // eslint-disable-line no-unused-vars
import Select from 'react-select';
import PostBrowseFilters from '../../../components/post-select/browse-filters';

test( 'Browse Filters ', () => {
	const props = {
		onUpdate: jest.fn(),
		termFilters: [
			{
				slug: 'foo',
				label: 'Foo',
				rest: 'foo/foo',
			},
			{
				slug: 'bar',
				label: 'Bar',
				rest: 'bar/bar',
			},
		],
	};

	const filters = mount( <PostBrowseFilters { ...props } /> );

	expect( filters.find( '.post-select-filters-row' ).length ).toBe( 3 );
	expect( filters.find( '.post-select-filters-row' ).at( 1 ).find( 'label' ).text() ).toEqual( 'Foo' );

	filters.find( Select.Async ).at( 0 ).props().onChange( [
		{ value: 'news' },
	] );

	expect( filters.state().foo ).toEqual( [ 'news' ] );

	const submitEvent = { preventDefault: jest.fn() };
	filters.find( '.post-select-filters' ).simulate( 'submit', submitEvent );
	expect( props.onUpdate.mock.calls.length ).toBe( 1 );
	expect( submitEvent.preventDefault.mock.calls.length ).toBe( 1 );
} );

it( 'Browse filters load options', done => {
	expect.assertions( 1 );

	const props = {
		onUpdate: jest.fn(),
		termFilters: [
			{
				slug: 'foo',
				label: 'Foo',
				rest: 'foo/foo',
			},
			{
				slug: 'bar',
				label: 'Bar',
				rest: 'bar/bar',
			},
		],
	};

	const filters = shallow( <PostBrowseFilters { ...props } /> );

	filters.find( Select.Async ).at( 0 ).props().loadOptions( {}, ( args, data ) => {
		expect( data.options.length ).toBe( 1 );
		done();
	} );
} );
