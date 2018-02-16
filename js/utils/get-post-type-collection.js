/* global wpApiSettings */
import wp from 'wp';
import _get from 'lodash/get';
import _find from 'lodash/find';

const getPostTypeCollection = postType => {
	let route = '/' + wpApiSettings.versionString + wp.api.postTypeRestBaseMapping[ postType ];
	return _find( wp.api.collections, model => route === _get( model, 'prototype.route.index' ) );
};

export default getPostTypeCollection;
