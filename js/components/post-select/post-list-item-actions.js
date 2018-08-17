import React from 'react';
import PropTypes from 'prop-types';
import PostListItemAction from './post-list-item-action';

const PostListItemActions = ( { actions } ) => (
	<div className="post-list-item-actions">
		{ actions.map( action => <PostListItemAction { ...action } /> ) }
	</div>
);

PostListItemActions.propTypes = {
	actions: PropTypes.array.isRequired,
}

export default PostListItemActions;
