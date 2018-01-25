import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

const {
	Button,
} = wp.components;

const PostSelectButton = props => {
	return <div className="post-select">
		<Button
			isLarge={true}
			onClick={ () => {
				window.hmPostSelect( props );
			} }
		>{ props.children }</Button>
	</div>
}

PostSelectButton.propTypes = {
	btnText: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
}

export default PostSelectButton;
