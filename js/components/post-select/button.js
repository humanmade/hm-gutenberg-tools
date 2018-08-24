import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import wp from 'wp';

import PostSelectModal from './../../containers/post-select/modal';

const { Button } = wp.components;

const { __ } = wp.i18n;

class PostSelectButton extends React.Component {
	state = { modalVisible: false };

	render(){
		const {
			children,
			onSelect,
			value = [],
			btnProps = {},
		} = this.props;

		const { modalVisible } = this.state;
		const onClose = () => this.setState( { modalVisible: false } );
		btnProps.onClick = () => this.setState( { modalVisible: true } );

		return ( <div className="post-select">
			<Button { ...btnProps }>{ children }</Button>
			{ modalVisible && (
				ReactDOM.createPortal(
					<PostSelectModal
						{ ...this.props.postSelectProps }
						onSelect={ posts => {
							onSelect( posts );
							onClose();
						} }
						onClose={ onClose }
						value={ value }
					/>,
					document.getElementById( 'wpbody' )
				)
			) }
		</div> )
	}
}

PostSelectButton.propTypes = {
	onSelect: PropTypes.func.isRequired,
	value: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.array,
	] ),
	btnProps: PropTypes.object,
}

export default PostSelectButton;
