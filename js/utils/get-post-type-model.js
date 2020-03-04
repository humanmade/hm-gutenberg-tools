/* global wpApiSettings */
import wp from 'wp';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { postTypeRestBaseMapping } from './get-post-type-collection';

const getPostTypeModel = postType => {
	let route = '/' + wpApiSettings.versionString + postTypeRestBaseMapping[ postType ] + '/(?P<id>[\\\\d]+)';
	return _.find( wp.api.models, model => model.prototype.route && route === model.prototype.route.index );
};

export default getPostTypeModel;
