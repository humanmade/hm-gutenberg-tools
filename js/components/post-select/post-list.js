import React from 'react';
import classNames from 'classnames';

const { Button } = wp.components;

const PostListItem = ({ post, className, onClick }) => {
	return <Button id={ `post-select-button-${post.id}` } className={ className } onClick={ onClick }>
		<h2>{ post.title.rendered }</h2>
		<div className="post-select-result-meta">Type, Date, author</div>
	</Button>
}

const PostList = ({ posts, selectedPosts, onToggleSelectedPosts }) => {
	return <div className="post-list">
		{ posts.map( post => {
			return <PostListItem
				key={ post.id }
				post={ post }
				onClick={ () => onToggleSelectedPosts( post ) }
				className={ classNames( {
					'post-select-result': true,
					'focused': selectedPosts.findWhere( { id: post.id } ),
				} )}
			/>
		} ) }
	</div>
}

export default PostList;
