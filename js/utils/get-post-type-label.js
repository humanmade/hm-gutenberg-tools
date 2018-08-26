/* global hmGbToolsData */
import _get from 'lodash/get';

export default function getPostTypeLabel( postType ) {
	return _get( hmGbToolsData, `postTypes.${postType}.labels.singular_name`, postType );
}
