class MockCollection {
	fetch() {
		return new Promise( ( resolve, reject ) => {
			process.nextTick( () => resolve( [
				{
					id: 1,
					name: 'sport',
				},
			] ) );
		} );
	}

	hasMore() {
		return true;
	}
}

export default MockCollection;
