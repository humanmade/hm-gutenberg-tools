import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _get from 'lodash/get';

import PostSelectButton from '../components/post-select/button';

const {
	InspectorControls,
	MediaUploadButton,
} = wp.blocks;

const { Spinner } = wp.components;

const { __ } = wp.i18n;

/**
 * InspectorControl for image upload.
 */
class PostControl extends React.Component {
	state = {
		isLoading: false,
		posts: [],
	}

	componentWillMount() {
		const { value = [], postSelectProps = {} } = this.props;

		// Load current state.
		if ( value.length > 1 && this.state.posts.length < 1 ) {
			const Collection = _get( postSelectProps, 'collectionType', 'Posts' );
			const collection = new wp.api.collections[ Collection ]();

			this.setState({ isLoading: true });
			collection.fetch( { data: { per_page: value.length, filter: { include: value } } } )
				.then( () => this.setState( { posts: collection.toJSON(), isLoading: false } ) );
		}
	}

	render() {
		const {
			posts,
			isLoading
		} = this.state;

		const {
			label,
			id,
			help,
			onChange,
			value = [],
			postSelectProps = {},
			btnText = __( 'Select post' ),
		} = this.props;

		return <InspectorControls.BaseControl label={ label } id={ id } help={ help }>
			{ isLoading && <Spinner /> }
			{ ( ! isLoading && posts.length > 0 ) && (
				<ul>
					{ this.state.posts.map( post => {
						return <li key={ post.id }>{ post.title.rendered }</li>
					} ) }
				</ul>
			) }
			<PostSelectButton
				{ ...postSelectProps }
				value={ value }
				onSelect={ posts => {
					this.setState( { posts } );
					onChange( posts );
				} }
			>{ btnText }</PostSelectButton>
		</InspectorControls.BaseControl>
	}
}

PostControl.propTypes = {
	label: PropTypes.string.isRequired,
	help: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.arrayOf( PropTypes.number ).isRequired,
}

export default PostControl;

