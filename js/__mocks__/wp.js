import React from 'react';

const wp = {
	components: { Button: props => <button id={ props.id } className={ props.className }>{ props.children }</button> },
	i18n: { __: str => str },
	element: { createElement: React.createElement },
};

export default wp;
