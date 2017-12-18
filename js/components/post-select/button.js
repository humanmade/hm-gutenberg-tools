import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

import PostSelectModal from './modal';

const {
	Button,
} = wp.components;

const { __ } = wp.i18n;

class PostSelectButton extends React.Component {
	state = {
		modalVisible: false,
		posts: [],
	}

	render(){
		const {
			btnText,
			onSelect,
		} = this.props;

		const { modalVisible } = this.state;

		const onClose = () => this.setState( { modalVisible: false } );

		return <div className="post-select">
			<Button
				isLarge={true}
				onClick={ () => this.setState( { modalVisible: true } ) }
			>{ btnText }</Button>
			{ modalVisible && (
				ReactDOM.createPortal(
					<PostSelectModal
						{ ...this.props }
						onSelect={ posts => {
							onSelect( posts );
							onClose();
						} }
						onClose={ onClose }
					/>,
					document.getElementById('wpbody')
				)
			) }
		</div>
	}
}

PostSelectButton.defaultProps = {
	minPosts: 1,
	maxPosts: 1,
	btnText: __( 'Select post' ),
}

PostSelectButton.propTypes = {
	minPosts: PropTypes.number,
	maxPosts: PropTypes.number,
	btnText: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
}

export default PostSelectButton;
