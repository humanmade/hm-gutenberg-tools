/* global wpApiSettings */
import wp from 'wp';
import _get from 'lodash/get';
import _find from 'lodash/find';

const getPostTypeModel = postType => {
	let route = '/' + wpApiSettings.versionString + wp.api.postTypeRestBaseMapping[ postType ] + '/(?P<id>[\\\\d]+)';
	return _.find( wp.api.models, model => model.prototype.route && route === model.prototype.route.index );
};

export default getPostTypeModel;
