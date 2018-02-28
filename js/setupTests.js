import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const { JSDOM } = require( 'jsdom' );

configure( { adapter: new Adapter() } );

const jsdom = new JSDOM( '<!doctype html><html><body></body></html>' );
const { window } = jsdom;

function copyProps( src, target ) {
	const props = Object.getOwnPropertyNames( src )
		.filter( prop => typeof target[prop] === 'undefined' )
		.reduce( ( result, prop ) => ( {
			...result,
			[prop]: Object.getOwnPropertyDescriptor( src, prop ),
		} ), {} );
	Object.defineProperties( target, props );
}

global.window = window;
global.document = window.document;
global.navigator = { userAgent: 'node.js' };
global.hmGbToolsData = {
	postTypeLabels: {
		post: {
			name:          'Posts',
			singular_name: 'Post',
		},
	},
	postTypeTaxonomies: { post: [ 'foo', 'bar' ] },
};

copyProps( window, global );
