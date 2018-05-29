import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import getPostTypeLabel from '../../utils/get-post-type-label';

const {
	Button,
	Dashicon,
} = wp.components;

const PostListItemActionButton = ( { text, icon, onClick, disabled } ) => (
	<Button className="post-list-item-remove" onClick={ onClick } disabled={ disabled } isSmall>
		<Dashicon icon={ icon } />
		<span className="screen-reader-text">{ text }</span>
	</Button>
)

PostListItemActionButton.propTypes = {
	text: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
}

PostListItemActionButton.defaultProps = {
	disabled: false,
}

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
