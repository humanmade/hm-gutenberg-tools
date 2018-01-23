import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _get from 'lodash/get';
import _uniqueId from 'lodash/uniqueId';
import _pull from 'lodash/pull';
import classNames from 'classnames';

import PostSelectBrowse from './browse';
import PostSelectSelection from './selection';

const { Button } = wp.components;
const { __ } = wp.i18n;

class PostSelectModal extends React.Component {
	state = {
		selectedPosts: [],
		contentState: 'browse',
	}

	constructor( props ) {
		super( props );
		this.id = _uniqueId( 'post-select-modal' );

		const Collection = _get(
			wp.api.collections,
			this.props.collectionType,
			wp.api.collections.Posts
		);

		this.state.selectedPosts = new Collection();

		if ( props.value && props.value.length > 0 ) {
			this.state.selectedPosts.fetch( {
				hmCache: 30,
				data: { per_page: props.value.length, filter: { include: props.value } }
			} );
		}
	}

	render() {
		const { isLoading, selectedPosts } = this.state;

		const {
			onClose,
			modalTitle = __( 'Select a post' ),
			onSelect,
			collectionType,
		} = this.props;

		return <div className="post-select post-select-modal">
			<div className="media-modal-backdrop"></div>
			<div className="modal media-modal wp-core-ui">
				<Button
					className="media-modal-close"
					onClick={ () => onClose() }
				>
					<span className="media-modal-icon"><span className="screen-reader-text">{ __( 'Close media panel' ) }</span></span>
				</Button>
				<div className="media-frame-title">
					<h1>{ modalTitle }</h1>
				</div>
				<div className="media-modal-content">
					{ ( this.state.contentState === 'browse' ) && <PostSelectBrowse
						{ ...this.state }
						collectionType={ collectionType }
						togglePostSelected={ post => this.togglePostSelected( post ) }
					/> }
					{ ( this.state.contentState === 'selection' ) && <PostSelectSelection
						selectedPosts={ selectedPosts }
					/> }
				</div>
				<div className="media-frame-toolbar">
					<div className="media-toolbar">
						{ ( this.state.contentState !== 'selection' ) && <Button
							isPrimary={false}
							isLarge={true}
							style={{ marginRight: '15px' }}
							onClick={ () => this.setState( { contentState: 'selection' }) }
						>View selection</Button> }
						{ ( this.state.contentState !== 'browse' ) && <Button
							isPrimary={false}
							isLarge={true}
							style={{ marginRight: '15px' }}
							onClick={ () => this.setState( { contentState: 'browse' }) }
						>Browse posts</Button> }
						<Button
							isPrimary={true}
							isLarge={true}
							onClick={ () => onSelect( selectedPosts.toJSON() ) }
						>Select</Button>
					</div>
				</div>
			</div>
		</div>
	}

	togglePostSelected( post ) {
		const { selectedPosts } = this.state;
		const { maxPosts } = this.props;

		const newSelectedPosts = selectedPosts.clone();

		if ( selectedPosts.findWhere({ id: post.id  }) ) {
			newSelectedPosts.remove( post.id );
		} else if ( selectedPosts.length < maxPosts ) {
			newSelectedPosts.push( post );
		}

		this.setState( { selectedPosts: newSelectedPosts } );
	}
}

PostSelectModal.defaultProps = {
	minPosts: 1,
	maxPosts: 1,
	collectionType: 'Posts',
}

PostSelectModal.propTypes = {
	minPosts: PropTypes.number.isRequired,
	maxPosts: PropTypes.number.isRequired,
	onSelect: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
}

export default PostSelectModal;
