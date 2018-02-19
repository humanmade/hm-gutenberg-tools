import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

const { Button } = wp.components;

const PostListItem = ( { post, onClick, className } ) => {
	return <Button id={ `post-list-item-button-${post.id}` } className={ className } onClick={ onClick }>
		<h2 className="post-list-item--title" dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
		<div className="post-list-item--meta">Type, Date, author</div>
	</Button>
}

PostListItem.propTypes = {
	post:      PropTypes.object.isRequired,
	onClick:   PropTypes.func.isRequired,
	className: PropTypes.string,
}

export default PostListItem;
