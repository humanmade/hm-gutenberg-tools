import React from 'react';
import * as wpData from '@wordpress/data';

const wp = {
	data: wpData,
	components: {
		Button: props => <button id={ props.id } className={ props.className }>{ props.children }</button>,
		Spinner: () => <span>Spinner</span>,
	},
	i18n: { __: str => str },
	element: { createElement: React.createElement },
};

export default wp;
