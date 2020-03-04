/* global wpApiSettings */
import wp from 'wp';
import _get from 'lodash/get';
import _find from 'lodash/find';
const taxonomyRestBaseMapping = window.hmGbToolsData.taxonomyRestBaseMapping;
export const getTaxonomyRoute = ( taxonomy ) => taxonomyRestBaseMapping[ taxonomy ];

const getTaxonomyCollection = taxonomy => {
	let route = '/' + wpApiSettings.versionString + getTaxonomyRoute( taxonomy );
	return wp.api.getCollectionByRoute( route );
};

export default getTaxonomyCollection;
