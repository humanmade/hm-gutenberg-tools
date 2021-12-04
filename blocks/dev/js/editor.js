import React from 'react';

import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

const { PostControl } = window.hm.controls;

function Edit(  { attributes, setAttributes }  ) {
	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="setting">
				<PostControl
					btnText={ __( 'Select Page' ) }
					label={ __( 'Linked Page.' ) }
					postSelectProps={ { postType: 'page' } }
					// value={ attributes.testPostControl }
					// onChange={ value => console.log( value ) }
				/>
			</InspectorControls>

			<p>Test</p>
		</div>
	);
}

registerBlockType( 'hm-gb-tools/dev', {
	apiVersion: 2,
	attributes: {
		testPostControl: {
			type: 'array',
		},
	},
	edit: Edit,
} );
