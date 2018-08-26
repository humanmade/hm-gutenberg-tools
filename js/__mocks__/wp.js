import React from 'react';
import MockCollection from './wp-api-collection';

const wp = {
	components: { Button: props => <button id={ props.id } className={ props.className }>{ props.children }</button> },
	i18n: { __: str => str },
	element: { createElement: React.createElement },
};

export default wp;
