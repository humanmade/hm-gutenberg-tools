import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _get from 'lodash/get';
import _uniqueId from 'lodash/uniqueId';
import _indexOf from 'lodash/indexOf';

import getPostTypeCollection from '../../utils/get-post-type-collection';
import getPostTypeTaxFilters from '../../utils/get-post-type-tax-filters';
import PostSelectBrowse from './browse';
import PostSelectSelection from './selection';

const { Button } = wp.components;
const { __ } = wp.i18n;

class PostSelectModal extends React.Component {
	static defaultProps = {
		minPosts: 1,
		maxPosts: 1,
		postType: 'post',
	};

	static propTypes = {
		postType: PropTypes.string,
		minPosts: PropTypes.number,
		maxPosts: PropTypes.number,
		onSelect: PropTypes.func.isRequired,
		onClose:  PropTypes.func.isRequired,
	};

	constructor( props ) {
		super( props );
		this.id = _uniqueId( 'post-select-modal' );

		const Collection = getPostTypeCollection( this.props.postType ) || wp.api.collections.Posts;
		const selectedPosts = new Collection();

		if ( props.value && props.value.length > 0 ) {
			selectedPosts.comparator = post => _indexOf( props.value, post.id );

			selectedPosts.fetch( {
				hmCache: 120,
				data:    { per_page: props.value.length, include: props.value },
			} ).then( () => {
				this.mounted && this.forceUpdate()
			} );
		}

		this.state = {
			contentState: 'browse',
			selectedPosts,
		};
	}

	componentDidMount() {
		this.mounted = true;
		this.modalEl.focus();
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		const {
			onClose,
			modalTitle = __( 'Select a post' ),
			onSelect,
			postType,
			termFilters = getPostTypeTaxFilters( this.props.postType ),
		} = this.props;

		return <div className="post-select post-select-modal">
			<div className="media-modal-backdrop"></div>
			<div
				className="modal media-modal wp-core-ui"
				ref={ el => {
					this.modalEl = el
				} }
				tabIndex="0"
			>
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
						selectedPosts={ this.state.selectedPosts.toJSON() }
						postType={ postType }
						togglePostSelected={ post => this.togglePostSelected( post ) }
						termFilters={ termFilters }
					/> }
					{ ( this.state.contentState === 'selection' ) && <PostSelectSelection
						selectedPosts={ this.state.selectedPosts.toJSON() }
						onUpdateSelection={ newSelectionOrder => this.updateSelectionOrder( newSelectionOrder ) }
						onRemoveItem={ post => this.togglePostSelected( post ) }
					/> }
				</div>
				<div className="media-frame-toolbar">
					<div className="media-toolbar">
						<Button
							isPrimary={true}
							isLarge={true}
							onClick={ () => onSelect( this.state.selectedPosts.toJSON() ) }
						>Select</Button>
						{ ( this.state.contentState !== 'selection' ) && <Button
							isPrimary={false}
							isLarge={true}
							onClick={ () => this.setState( { contentState: 'selection' } ) }
						>View / Edit Selected Posts</Button> }
						{ ( this.state.contentState !== 'browse' ) && <Button
							isPrimary={false}
							isLarge={true}
							onClick={ () => this.setState( { contentState: 'browse' } ) }
						>Browse posts</Button> }
					</div>
				</div>
			</div>
		</div>
	}

	togglePostSelected( post ) {
		const { selectedPosts } = this.state;
		const { maxPosts } = this.props;
		const newSelectedPosts = selectedPosts.clone();

		if ( selectedPosts.findWhere( { id: post.id } ) ) {
			newSelectedPosts.remove( post.id );
		} else if ( selectedPosts.length < maxPosts ) {
			newSelectedPosts.push( post );
		}

		this.setState( { selectedPosts: newSelectedPosts } );
	}

	updateSelectionOrder( newSelectionOrder ) {
		const newSelectedPosts = this.state.selectedPosts.clone();

		newSelectedPosts.comparator = post => _indexOf( newSelectionOrder, post.id );
		newSelectedPosts.sort();

		this.setState( { selectedPosts: newSelectedPosts } );
	}
}

export default PostSelectModal;
