import _zipObject from 'lodash/zipObject';
import wp from 'wp';

const { apiFetch } = wp;
const { addQueryArgs } = wp.url;
const { postSelectEndpoint } = window.hmGbToolsData;

/**
 * Fetch JSON.
 *
 * Helper function to return parsed JSON and also the response headers.
 *
 * @param {object} args
 * @param {array} headerKeys Array of headers to include.
 */
export const fetchJson = ( args, headerKeys = [ 'x-wp-totalpages' ] ) => {
	return new Promise( resolve => {
		apiFetch( {
			...args,
			parse: false,
		} ).then( response => Promise.all( [
			response.json ? response.json() : [],
			_zipObject( headerKeys, headerKeys.map( key => response.headers.get( key ) ) ),
		] ) ).then( data => (
			resolve( data )
		) ).catch( () => {} );
	} );
};

/**
 * Helper function to fetch posts by ID.
 *
 * @param {args} args
 */
export const fetchPostsById = ( ids, postTypes ) => {
	if ( ! ids || ids.length < 1 ) {
		return Promise.resolve( [] );
	}

	return new Promise( resolve => {
		fetchJson( {
			path: addQueryArgs(
				postSelectEndpoint,
				{
					include: ids,
					per_page: ids.length,
					context: 'view',
					types: postTypes.map( o => o.slug ),
				}
			),
		} ).then( ( [ posts, headers ] ) => {
			resolve( posts, headers );
		} ).catch( () => {} );
	} );
};
