// What on earth am I doing here.
// Well... React Portals seem designed for things just like this. Modals.
// And indeed, they worked pretty well.
// Until I tried to do drag/drop inside the modal.
// This works perfectly, as long as the PostSelectButton component (that creates the portal) wasn't a child of the gutenberg block list component.
// So whilst it worked fine if the button is in the sidebar. It broke if it was actually in the editor.
// I couldn't find a good solution.
// Gutenberg calls e.preventDefault() for onDragStart on the block list component. If you remove this line, it all works fine.
// This alternative approach keeps the modal completely independent from Gutenberg.
// And you just trigger it with some globally available helpers.
// And it cleans itself up on close or submit.
// Its a bit of a hacky workaround... I'd love to find a proper solution.

import PostSelectModal from './components/post-select/modal';

// Create container element to mount the react component.
const el = document.createElement( 'div' );

window.hmPostSelect = {
	init: ( props ) => {
		const modal = <PostSelectModal
			{ ...props }
			onSelect={ val => {
				props.onSelect && props.onSelect( val );
				window.hmPostSelect.destroy();
			} }
			onClose={ () => window.hmPostSelect.destroy() }
		/>;
		ReactDOM.render( modal, el );
	},
	destroy: () => ReactDOM.unmountComponentAtNode( el ),
};

document.onreadystatechange = () => {
	if ( document.readyState == "complete" ) {
		document.getElementsByTagName( 'body' )[0].appendChild( el );
	}
}
