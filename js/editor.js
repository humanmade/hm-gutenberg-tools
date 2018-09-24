import PostSelectButton from './containers/post-select/button';
import EditableHTML from './components/editable-html';
import ImageControl from './components/controls/image';
import PostControl from './components/controls/post';
import LinkControl from './components/controls/link';

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

