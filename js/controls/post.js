import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _get from 'lodash/get';

import PostSelectButton from '../components/post-select/button';
import getPostTypeCollection from '../utils/get-post-type-collection';

const {
	Spinner,
	BaseControl,
} = wp.components;

const { __ } = wp.i18n;

/**
 * InspectorControl for image upload.
 */
class PostControl extends React.Component {
	state = {
		isLoading: false,
		posts:     [],
	};

	componentDidMount() {
		const { value = [], postSelectProps = {} } = this.props;

		// Load current state.
		if ( value.length > 1 && this.state.posts.length < 1 ) {
			const postType   = _get( postSelectProps, 'postType', 'post' );
			const Collection = getPostTypeCollection( postType );
			const collection = new Collection();

			this.setState( { isLoading: true } );
			collection.fetch( { hmCache: 120, data: { per_page: value.length, include: value } } )
				.then( () => this.setState( { posts: collection.toJSON(), isLoading: false } ) );
		}
	}

	render() {
		const {
			posts,
			isLoading,
		} = this.state;

		const {
			label,
			id,
			help,
			onChange,
			value = [],
			postSelectProps = { btnProps: {} },
			btnText = __( 'Select post' ),
		} = this.props;

		postSelectProps.btnProps = postSelectProps.btnProps || {};
		postSelectProps.btnProps.isLarge = true;

		return <BaseControl label={ label } id={ id } help={ help } className="hm-post-control">
			<PostSelectButton
				{ ...postSelectProps }
				value={ value }
				onSelect={ posts => {
					this.setState( { posts } );
					onChange( posts );
				} }
			>{ btnText }</PostSelectButton>
			{ ( value.length > 0 ) && <div className="hm-post-control-current-selection">
				<p>{ __( 'Current Selection' ) }</p>
				{ isLoading && <Spinner style={ { float: 'none' } } /> }
				{ ( ! isLoading && posts.length > 0 ) && (
					<ul className="hm-post-select-control-list">
						{ posts.map( post => {
							return <li key={ post.id }>{ post.title.rendered }</li>
						} ) }
					</ul>
				) }
			</div> }
		</BaseControl>
	}
}

PostControl.propTypes = {
	label:    PropTypes.string.isRequired,
	help:     PropTypes.string,
	id:       PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value:    PropTypes.arrayOf( PropTypes.number ).isRequired,
}

export default PostControl;

