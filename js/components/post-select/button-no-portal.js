import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

const {
	Button,
} = wp.components;

const PostSelectButton = props => {
	const { btnProps = {} } = props;

	return <div className="post-select">
		<Button
			{ ...btnProps }
			onClick={ () => {
				window.hmPostSelect( props );
			} }
		>{ props.children }</Button>
	</div>
}

PostSelectButton.propTypes = {
	btnText: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	postType: PropTypes.string,
	termFilters: PropTypes.object,
}

export default PostSelectButton;
