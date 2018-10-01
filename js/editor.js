import PostSelectButton from './post-select';
import EditableHTML from './editable-html';
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

