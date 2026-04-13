/* global wp */

import PropTypes from 'prop-types';
import React from 'react';

const { Spinner } = wp.components;
const { __ } = wp.i18n;

const CurrentSelection = ( {
	posts,
	isLoading = false,
	title = __( 'Current Selection', 'hm-gb-tools' ),
} ) => (
	<div className="hm-post-control-current-selection">
		<h4>{ title }</h4>
		{ isLoading && (
			<Spinner style={ { float: 'none' } } />
		) }
		{ posts.length > 0 && ! isLoading && (
			<ul className="hm-post-select-control-list">
				{ posts.map( post => (
					<li key={ post.id }>{ post.title.rendered }</li>
				) ) }
			</ul>
		) }
	</div>
);

CurrentSelection.propTypes = {
	posts: PropTypes.arrayOf( PropTypes.object ).isRequired,
	isLoading: PropTypes.bool,
	title: PropTypes.string,
};

export default CurrentSelection;
