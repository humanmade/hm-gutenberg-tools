import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import getPostTypeLabel from '../../utils/get-post-type-label';

const { Button } = wp.components;

const PostListItem = ( { post, onClick, className } ) => {
	const meta =[
		getPostTypeLabel( post.type ),
		'Date',
		'author',
	];

	return <Button id={ `post-list-item-button-${post.id}` } className={ className } onClick={ onClick }>
		<h2 className="post-list-item--title" dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
		<div className="post-list-item--meta">{ meta.join( ', ' ) }</div>
	</Button>
}

PostListItem.propTypes = {
	post:      PropTypes.object.isRequired,
	onClick:   PropTypes.func.isRequired,
	className: PropTypes.string,
}

export default PostListItem;
