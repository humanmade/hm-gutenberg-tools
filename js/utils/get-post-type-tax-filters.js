import _get from 'lodash/get';

const taxonomyFilters = [
	{ slug: 'category', rest: 'categories', plural: 'Categories', collection: 'Categories' },
	{ slug: 'tag', rest: 'tags', plural: 'Tags', collection: 'Tags' },
];

export default function getPostTypeTaxFilters( postType ) {
	return _get( window.hmGbToolsData, `postTypeTaxonomies.${postType}`, [] );

}
