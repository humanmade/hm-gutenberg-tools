import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

const {
	Button,
	Dashicon,
} = wp.components;

const PostListItemAction = ( { text, icon, onClick, disabled } ) => (
	<Button className="post-list-item-remove" onClick={ onClick } disabled={ disabled } isSmall>
		<Dashicon icon={ icon } />
		<span className="screen-reader-text">{ text }</span>
	</Button>
)

PostListItemAction.propTypes = {
	id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
}

PostListItemAction.defaultProps = {
	disabled: false,
}

export default PostListItemAction;
