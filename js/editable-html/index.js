import React from 'react';
import wp from 'wp';

const { RichText } = wp.editor;

/**
 * EditableHTML component - Deprecated.
 *
 * This was originally needed in order to convert data from the RichText component into a string.
 * However this is now supported by passing the prop format: string to the RichText component.
 */
const EditableHTML = props => {
	wp.deprecated( 'hm.components.EditableHTML', {
		version: 'the future',
		plugin: 'HM Gutenberg Tools',
		alternative: 'wp.editor.RichText with the format prop set to string',
	} );

	const richTextProps = {
		...props,
		format: 'string',
	};

	return <RichText { ...richTextProps } />;
};

export default EditableHTML;
