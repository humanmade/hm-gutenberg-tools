/* global wp */

import _get from 'lodash/get';
import _difference from 'lodash/difference';

/**
 * Fitler an array of post IDs to only those that are not alredy in the core data store.
 *
 * This is useful if you want to restrict a query to only those not already fetched.
 *
 * @param {array} ids
 * @param {string} postType
 */
const filterIdsByNotStored = ( ids, postType = 'post' ) => {
	const state = wp.coreData.default.getState();
	const items = _get( state, `entities.data.postType.${postType}.items`, {} );
	const idsInStore = Object.keys( items ).map( id => parseInt( id, 10 ) );
	return _difference( ids, idsInStore );
}

export default filterIdsByNotStored;
