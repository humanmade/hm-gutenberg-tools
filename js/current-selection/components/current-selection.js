import PropTypes from 'prop-types';
import React from 'react';
import wp from 'wp';

const { Spinner } = wp.components;
const { __ } = wp.i18n;

const CurrentSelection = ( {
	posts,
	isLoading,
	title,
} ) => (
	<div className="hm-post-control-current-selection">
		<h4>{ title }</h4>
		{ isLoading ? (
			<Spinner style={ { float: 'none' } } />
		) : (
			<ul className="hm-post-select-control-list">
				{ posts.map( post => (
					<li
						key={ post.id }
						dangerouslySetInnerHTML={ { __html: post.title.rendered } }
					/>
				) ) }
			</ul>
		) }
	</div>
);

CurrentSelection.defaultProps = {
	isLoading: false,
	title: __( 'Current Selection', 'hm-gb-tools' ),
};

CurrentSelection.propTypes = {
	posts: PropTypes.arrayOf( PropTypes.object ).isRequired,
	isLoading: PropTypes.bool,
	title: PropTypes.string,
};

export default CurrentSelection;
