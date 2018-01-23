import './cached-backbone-sync';

import PostSelectButton from './components/post-select/button';
import EditableHTML from './components/editable-html';
import ImageControl from './controls/image';
import PostControl from './controls/post';
import LinkControl from './controls/link';

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
};
