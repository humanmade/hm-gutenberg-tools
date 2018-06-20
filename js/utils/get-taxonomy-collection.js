/* global wpApiSettings */
import wp from 'wp';
import _get from 'lodash/get';
import _find from 'lodash/find';

const getTaxonomyCollection = taxonomy => {
	let route = '/' + wpApiSettings.versionString + wp.api.getTaxonomyRoute( taxonomy );
	return wp.api.getCollectionByRoute( route );
};

export default getTaxonomyCollection;
