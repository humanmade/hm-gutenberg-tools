/* global hmGbToolsData */
import _get from 'lodash/get';

export default function getPostTypeLabel( postType ) {
	return _get( hmGbToolsData, `postTypeLabels.${postType}.singular_name`, 'Type' );
}
