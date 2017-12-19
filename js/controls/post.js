import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

import PostSelectButton from '../components/post-select/button';

const {
	InspectorControls,
	MediaUploadButton,
} = wp.blocks;

const { __ } = wp.i18n;

/**
 * InspectorControl for image upload.
 */
class PostControl extends React.Component {
	state = {
		posts: [],
	}

	render() {
		const { posts } = this.state;

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
			{ posts.length > 0 && (
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

