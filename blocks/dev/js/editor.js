import React from 'react';

import { registerBlockType } from '@wordpress/blocks';

function Edit() {
	return (
		<div>Test</div>
	);
}

registerBlockType( 'hm-gb-tools/dev', {
	apiVersion: 2,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
} );
