import _find from 'lodash/find';

const getPostTypeCollection = ( postType ) => {
	var route = '/' + wpApiSettings.versionString + wp.api.postTypeRestBaseMapping[ postType ];
	return _find( wp.api.collections, model => (
		model.prototype.route && route === model.prototype.route.index
	) );
};

export default getPostTypeCollection;
