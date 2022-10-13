import { registerBlockType } from '@wordpress/blocks';

import metadata from '../block.json';

import Edit from './components/edit';

registerBlockType( metadata, {
	edit: Edit,
} );
