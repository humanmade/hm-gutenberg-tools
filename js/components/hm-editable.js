import React from 'react';
import _get from 'lodash/get';
import _flatten from 'lodash/flatten';
import _isEqual from 'lodash/isEqual';

const { Editable } = wp.blocks;

/**
 * The Editable component doesn't really work if you're data is not stored in markup.
 * This component means that you can store your data as a simple array of strings,
 * and this handles converting the data for you.
 */
class HmEditable extends React.Component {
	state = {
		text: [],
	}

	constructor(props) {
		super(props);
		this.state.text = this.toEditableValue( _get( this.props, 'value' ) );
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( ! _isEqual( _get( prevProps, 'value' ), _get( this.props, 'value' ) ) ) {
			this.setState({text: this.toEditableValue( _get( this.props, 'value' ) ) });
		}

		if ( ! _isEqual( _get( prevState, 'text' ), _get( this.state, 'text' ) ) ) {
			this.props.onChange( this.fromEditableValue( this.state.text ) );
		}
	}

	render() {
		const props = {
			...this.props,
			value: this.state.text,
			onChange: value => this.setState( { text: value } ),
		}

		return <Editable { ...props } />
	}

	// Helper to convert multiline editable into an array of react elements.
	toEditableValue( value ) {
		return ( value && Array.isArray( value ) ) ? value.map( ( paragraph, i ) => {
			const Tag = this.props.multiline;
			return <Tag key={ i }>{ paragraph }</Tag>
		} ) : [];
	}

	// Helper to convert react elements into array of strings.
	fromEditableValue( value ) {
		return _flatten( ( value && Array.isArray( value ) ) ? value.map( subValue => {
			return _get( subValue, 'props.children', '' );
		} ) : [] );
	}
}

export default HmEditable;
