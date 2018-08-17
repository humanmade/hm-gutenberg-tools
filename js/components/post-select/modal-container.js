import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _get from 'lodash/get';
import _uniqueId from 'lodash/uniqueId';
import _indexOf from 'lodash/indexOf';
import _isEqual from 'lodash/isEqual';

import getPostTypeCollection from '../../utils/get-post-type-collection';
import getPostTypeTaxFilters from '../../utils/get-post-type-tax-filters';
import Modal from './modal';

const { __ } = wp.i18n;
const { withSelect } = wp.data;

class PostSelectModal extends React.Component {
	static defaultProps = {
		minPosts: 1,
		maxPosts: 1,
		postType: 'post',
		selectedPosts: [],
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

		this.state = {
			contentState: 'browse',
			selectedPosts: this.props.selectedPosts,
		};
	}

	componentDidUpdate() {
		if ( ! _isEqual( this.props.selectedPosts, this.state.selectedPosts ) ) {
			console.log( 'Updating selected posts' );
			this.setState({ selectedPosts: this.props.selectedPosts });
		}
	}

	render() {
		const {
			onClose,
			modalTitle = __( 'Select a post' ),
			onSelect,
			postType,
			termFilters = getPostTypeTaxFilters( this.props.postType ),
		} = this.props;

		const {
			selectedPosts,
			contentState,
		} = this.state;

		return <Modal
			modalTitle={ modalTitle }
			postType={ postType }
			onSelect={ onSelect }
			onClose={ onClose }
			onUpdateSelectionOrder={ newSelection => this.updateSelection( newSelection ) }
			onToggleSelected={ id => this.toggleSelected( id ) }
			onMoveItemDown={ id => this.moveItemDown(id) }
			onMoveItemUp={ id => this.moveItemUp(id) }
			onChangeContentState={ contentState => this.setState( { contentState } ) }
			termFilters={ termFilters }
			contentState={ contentState }
			selectedPosts={ selectedPosts }

		/>
	}

	toggleSelected( id ) {
		console.log( 'toggleSelected', id );
		// const { selectedPosts } = this.state;
		// const { maxPosts } = this.props;
		// const newSelectedPosts = selectedPosts.clone();

		// if ( selectedPosts.findWhere( { id: post.id } ) ) {
		// 	newSelectedPosts.remove( post.id );
		// } else if ( selectedPosts.length < maxPosts ) {
		// 	newSelectedPosts.push( post );
		// }

		// this.setState( { selectedPosts: newSelectedPosts } );
	}

	moveItemUp( id ) {
		console.log( 'moveItemUp', id );
		// const { selectedPosts } = this.state;
		// const newSelectedPosts = selectedPosts.clone();
		// const item = selectedPosts.find( _post => post.id === _post.id );
		// const index = selectedPosts.findIndex( _post => post.id === _post.id );

		// if ( ! item || index < 1 ) {
		// 	return;
		// }

		// const insertAfterItem = selectedPosts.at( index - 1 );

		// newSelectedPosts.remove( item );
		// newSelectedPosts.add( item, { at: newSelectedPosts.indexOf( insertAfterItem ) } );

		// this.setState( { selectedPosts: newSelectedPosts } );
	}

	moveItemDown( id ) {
		console.log( 'moveItemDown', id );
		// const { selectedPosts } = this.state;
		// const newSelectedPosts = selectedPosts.clone();
		// const item = selectedPosts.find( _post => post.id === _post.id );
		// const index = selectedPosts.indexOf( item );

		// if ( ! item || index > selectedPosts.length - 1 ) {
		// 	return;
		// }

		// const insertAfterItem = selectedPosts.at( index + 1 );

		// newSelectedPosts.remove( item );
		// newSelectedPosts.add( item, { at: newSelectedPosts.indexOf( insertAfterItem ) + 1 } );

		// this.setState( { selectedPosts: newSelectedPosts } );
	}

	updateSelection( newSelection ) {
		console.log( 'updateSelection', newSelection );
		// const newSelectedPosts = this.state.selectedPosts.clone();

		// newSelectedPosts.comparator = post => _indexOf( newSelectionOrder, post.id );
		// newSelectedPosts.sort();

		// this.setState( { selectedPosts: newSelectedPosts } );
	}
}


const applyWithSelect = withSelect( ( select, ownProps ) => {
	const { getEntityRecords } = select( 'core' );

	const {
		postType = 'post',
		selectedPostIds = [],
	} = ownProps;

	const selectedPosts = getEntityRecords( 'postType', postType, { include: selectedPostIds } )

	return {
		...ownProps,
		selectedPosts: selectedPosts || [],
	}
})


export default applyWithSelect( PostSelectModal );
