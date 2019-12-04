import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import wp from 'wp';

import PostSelectModal from './modal';

const { Button } = wp.components;

const { __ } = wp.i18n;

class PostSelectButton extends React.Component {
	state = { modalVisible: false };

	showPromptToDisableAutoLeadMedia() {
		const userActionTaken = confirm(`New Post cannot be pinned here when Auto Lead Media option is enabled. Do you want to disable Auto Lead Media option?`);
		console.log( 'userActionTaken', userActionTaken );
		if( userActionTaken ) {
			const { onDisableAutoLeadMedia } = this.props;
			onDisableAutoLeadMedia();
		}
	}
	checkForAutoLeadMediaOption( enableAutoLeadMedia ) {
		enableAutoLeadMedia ? 
			this.showPromptToDisableAutoLeadMedia() : 
			this.toggleModal( true );
	}

	toggleModal( modalState ) { 
		this.setState( { modalVisible: modalState } );
	}

	render(){
		const {
			children,
			onSelect,
			value = [],
			btnProps = {},
			enableAutoLeadMedia
		} = this.props;

		const { modalVisible } = this.state;

		const onClose = () => this.toggleModal( false );

		btnProps.onClick = () => this.checkForAutoLeadMediaOption( enableAutoLeadMedia );

		return <div className="post-select">
			<Button { ...btnProps }>{ children }</Button>
			{ modalVisible && (
				ReactDOM.createPortal(
					<PostSelectModal
						{ ...this.props }
						onSelect={ posts => {
							onSelect( posts );
							onClose();
						} }
						onClose={ onClose }
						selectedPosts={ value }
					/>,
					document.getElementById( 'wpbody' )
				)
			) }
		</div>
	}
}

PostSelectButton.propTypes = {
	btnText:     PropTypes.string,
	onSelect:    PropTypes.func.isRequired,
	postType:    PropTypes.string,
	termFilters: PropTypes.object,
}

export default PostSelectButton;
