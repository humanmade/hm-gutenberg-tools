import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import wp from 'wp' // eslint-disable-line no-unused-vars
import PostListItem from './post-list-item';

const PostList = ( { posts, selectedPosts, onToggleSelectedPost } ) => (
	<ol className="post-list">
		{ posts.map( post => (
			<PostListItem
				key={ post.id }
				post={ post }
				onSelectItem={ () => onToggleSelectedPost( post ) }
				isSelected={ selectedPosts.length && selectedPosts.find( p => p.id === post.id ) }
			/>
		) ) }
	</ol>
)

PostList.propTypes = {
	posts:                 PropTypes.arrayOf( PropTypes.object ),
	selectedPosts:         PropTypes.arrayOf( PropTypes.object ),
	onToggleSelectedPosts: PropTypes.func.isRequired,
};

PostList.defaultProps = {
	posts: [],
	selectedPosts: [],
}

export default PostList;
