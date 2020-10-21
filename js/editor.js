import ImageControl from './controls/image';
import LinkControl from './controls/link';
import PostControl from './controls/post';
import EditableHTML from './editable-html';
import PostSelectButton from './post-select';

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

