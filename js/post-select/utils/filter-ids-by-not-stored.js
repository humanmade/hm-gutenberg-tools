/* global wp */

import _get from 'lodash/get';
import _difference from 'lodash/difference';

/**
 * Fitler an array of post IDs to only those that are not alredy in the core data store.
 *
 * This is useful if you want to restrict a query to only those not already fetched.
 *
 * @param {Fi} ids
 * @param {*} postType
 */
const filterIdsByNotStored = ( ids, postType = 'post' ) => {
	const state = wp.coreData.default.getState();
	const idsInStore = Object.keys( _get( state, `entities.postType.${postType}`, {} ) );
	return _difference( ids, idsInStore );
}

export default filterIdsByNotStored;
