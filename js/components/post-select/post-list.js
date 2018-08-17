import React from 'react';
import PropTypes from 'prop-types';
import PostListItem from './post-list-item';

const PostList = ( { posts, selectedPosts, onToggleSelected } ) => (
	<ol className="post-list">
		{ posts.map( post => (
			<PostListItem
				key={ post.id }
				post={ post }
				onToggleSelected={ () => onToggleSelected( post.id ) }
				isSelected={ selectedPosts.length && !! selectedPosts.find( p => p.id === post.id ) }
			/>
		) ) }
	</ol>
)

PostList.propTypes = {
	posts: PropTypes.arrayOf( PropTypes.object ),
	selectedPosts: PropTypes.arrayOf( PropTypes.object ),
	onToggleSelected: PropTypes.func.isRequired,
};

PostList.defaultProps = {
	posts: [],
	selectedPosts: [],
}

export default PostList;
