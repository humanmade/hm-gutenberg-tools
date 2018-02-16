import React from 'react';

class GenericComponent extends React.Component {
	render() {
		return null
	}
}

class MockCollection {
	fetch() {
		return new Promise( ( resolve, reject ) => {
			process.nextTick( () => resolve( [
				{
					id:   1,
					name: 'sport',
				},
			] ) );
		} );
	}

	hasMore() {
		return true;
	}
}

const wp = {
	components: {
		Button:  GenericComponent,
		Spinner: GenericComponent,
	},
	i18n: { __: str => str },
	api:  {
		collections:             { Posts: { prototype: { route: { index: '/v2/posts' } } } },
		postTypeRestBaseMapping: { post: 'posts' },
		getTaxonomyCollection:   () => MockCollection,
	},
	element: { createElement: React.createElement },
};

export default wp;
