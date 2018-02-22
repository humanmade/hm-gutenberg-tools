import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import wp from 'wp' // eslint-disable-line no-unused-vars
import PostListItem from './post-list-item';

const PostList = ( { posts = [], selectedPosts = [], onToggleSelectedPosts } ) => {
	return <div className="post-list">
		{ posts.map( post => {
			return <PostListItem
				key={ post.id }
				post={ post }
				onClick={ () => onToggleSelectedPosts( post ) }
				className={ classNames( {
					'post-list-item': true,
					'focused':        selectedPosts.length && selectedPosts.find( p => p.id === post.id ),
				} )}
			/>
		} ) }
	</div>
}

PostList.propTypes = {
	posts:                 PropTypes.arrayOf( PropTypes.object ),
	selectedPosts:         PropTypes.arrayOf( PropTypes.object ),
	onToggleSelectedPosts: PropTypes.func.isRequired,
};

export default PostList;
