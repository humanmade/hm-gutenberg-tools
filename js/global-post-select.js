// I originally used a Portal for the modal.
// And indeed, they worked pretty well.
// Until I tried to do drag/drop inside the modal.
// This works perfectly, as long as the PostSelectButton component (that creates the portal) wasn't a child of the gutenberg block list component.
// So it worked fine if the button is in the sidebar, but it broke if it was actually in the editor.
// I couldn't find a good solution.
// I suspect its related to the way React handles event bubbling in portals, and that react-dnd is listening for drag events on window.
// This is an alternative approach that keeps the modal completely independent from Gutenberg.
// And you just trigger it with some globally available helpers.
// Then, it cleans itself up on close or submit.
// Its a bit hacky, but actually works OK.
// I'd love to find a proper solution.

import PostSelectModal from './components/post-select/modal';

const el = document.createElement( 'div' );

window.hmPostSelect = props => {
	if ( ! document.body.contains( el ) ) {
		document.getElementsByTagName( 'body' )[0].appendChild( el );
	}

	const destroy = () => ReactDOM.unmountComponentAtNode( el );

	const onSelect = val => {
		props.onSelect && props.onSelect( val );
		destroy();
	}

	const modal = <PostSelectModal
		{ ...props }
		onSelect={ onSelect }
		onClose={ () => destroy() }
	/>;

	ReactDOM.render( modal, el );
};
