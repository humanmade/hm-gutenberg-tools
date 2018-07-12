import wp from 'wp';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server'
import HtmlToReactParser from 'html-to-react';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

const { RichText } = wp.editor;

/**
 * The Editable component doesn't really work if you're data is not stored in markup.
 * This component is a wrapper that lets you store simple HTML strings.
 * It handles converting it to react, and back to a string.
 */
class EditableHTML extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { text: this.toEditableValue( _get( this.props, 'value' ) ) };
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( ! _isEqual( _get( prevProps, 'value' ), _get( this.props, 'value' ) ) ) {
			this.setState( { text: this.toEditableValue( _get( this.props, 'value' ) ) } );
		}

		if ( ! _isEqual( _get( prevState, 'text' ), _get( this.state, 'text' ) ) ) {
			this.props.onChange( this.fromEditableValue( this.state.text ) );
		}
	}

	render() {
		const props = {
			...this.props,
			value:    this.state.text,
			onChange: text => this.setState( { text } ),
		}

		return <RichText { ...props } />
	}

	// Helper to convert multiline editable into an array of react elements.
	toEditableValue( value ) {
		if ( ! value || typeof value !== 'string' || value.length < 1 ) {
			return [];
		}

		const parser = new HtmlToReactParser.Parser();
		const parsed = parser.parse( '<div>' + value + '</div>' );

		return React.Children.toArray( parsed.props.children );
	}

	// Helper to convert react elements into array of strings.
	fromEditableValue( value ) {
		const { multiline } = this.props;

		if ( ! Array.isArray( value ) ) {
			return value;
		}

		// Strip all empty items.
		// Strip last item if br.
		const filteredValue = value.filter( ( child, i ) => {
			const type =_get( child, 'type' );

			if ( type && type === multiline && ! ( child.props.children && child.props.children.length > 0 ) ) {
				return false;
			}

			if ( type && type === 'br' && ( i + 1 ) === value.length ) {
				return false;
			}

			return true;
		} );

		return renderToStaticMarkup( filteredValue );
	}
}

export default EditableHTML;
