import './cached-backbone-sync';

import PostSelectButton from './components/post-select/button';
import EditableHTML from './components/editable-html';
import ImageControl from './controls/image';
import PostControl from './controls/post';
import LinkControl from './controls/link';
import getPostTypeModel from './utils/get-post-type-model';
import getPostTypeCollection from './utils/get-post-type-collection';
import getTaxonomyCollection from './utils/get-taxonomy-collection';

window.hm = {
	// Sidebar controls.
	controls: {
		ImageControl,
		PostControl,
		LinkControl,
	},
	// Misc components.
	components: {
		PostSelectButton,
		EditableHTML,
	},
	utils: {
		api: {
			getPostTypeModel,
			getPostTypeCollection,
			getTaxonomyCollection,
		}
	}
};

