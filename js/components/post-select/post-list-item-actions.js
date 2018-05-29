import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import getPostTypeLabel from '../../utils/get-post-type-label';

const {
	Button,
	Dashicon,
} = wp.components;

const PostListItemActionButton = ( { text = '', icon = 'warning', onClick = () => {}, disabled = false } ) => (
	<Button className="post-list-item-remove" onClick={ onClick } disabled={ disabled } isSmall>
		<Dashicon icon={ icon } />
		<span className="screen-reader-text">{ text }</span>
	</Button>
)

const PostListItemActions = ( { post, onClick, className, actions = [] } ) => (
	<div className="post-list-item-actions">
		{ actions.map( action => (
			<PostListItemActionButton { ...action } />
		) ) }
	</div>
);

PostListItemActions.propTypes = {
	actions: PropTypes.array.isRequired,
}

export default PostListItemActions;
