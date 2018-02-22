const hash = str => {
	let hash = 0;

	if ( typeof str !== 'string' ) {
		str = JSON.stringify( str );
	}

	if ( str.length === 0 ) {
		return hash;
	}

	for ( let i = 0; i < str.length; i++ ) {
		let char = str.charCodeAt( i );
		hash = ( ( hash << 5  ) - hash ) + char;
		hash &= hash; // Convert to 32bit integer
	}

	return hash;
}

export default hash;
