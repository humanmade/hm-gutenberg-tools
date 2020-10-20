const deleteAtIndex = ( a, i ) => {
	const newArray = [ ...a ];
	newArray.splice( i, 1 );
	return newArray;
};

const moveItemAtIndexUp = ( a, i ) => {
	const newArray = [ ...a ];

	if ( i < 1 ) {
		return newArray;
	}

	const insertAfterItem = a[ i - 1 ];
	const value = [ ...newArray.splice( i, 1 ) ];
	newArray.splice( newArray.indexOf( insertAfterItem ), 0, ...value );

	return newArray;
};

const moveItemAtIndexDown = ( a, i ) => {
	const newArray = [ ...a ];

	if ( i > a.length - 1 ) {
		return;
	}

	const insertAfterItem = a[ i + 1 ];
	const value = [ ...newArray.splice( i, 1 ) ];
	newArray.splice( newArray.indexOf( insertAfterItem ) + 1, 0, ...value );

	return newArray;
};

export {
	deleteAtIndex,
	moveItemAtIndexUp,
	moveItemAtIndexDown,
};
