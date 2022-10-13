import { registerBlockType } from '@wordpress/blocks';

import metadata from '../block.json';

import Edit from './components/edit';
import Save from './components/save';

registerBlockType( metadata, {
	edit: Edit,
	save: Save,
} );
