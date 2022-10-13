import React from 'react';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

function Save() {
	return (
		<div { ...useBlockProps.save() }>
			<div { ...useInnerBlocksProps.save() } />
		</div>
	);
}

export default Save;
