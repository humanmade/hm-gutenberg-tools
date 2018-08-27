import _get from 'lodash/get';

export default function ( postType ) {
	return _get( window, `hmGbToolsData.postTypeTaxonomies.${ postType }`, [] );
}
