import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

const {
	MediaUpload,
} = wp.editor;

const {
	Button,
	BaseControl,
	Spinner,
} = wp.components;

const { __ } = wp.i18n;
const { withSelect } = wp.data;

/**
 * InspectorControl for image upload.
 */
const ImageControl = ( {
	label,
	id,
	help,
	onChange,
	value,
	image,
	isLoading = false,
} ) => (
	<BaseControl label={ label } id={ id } help={ help } className="hm-image-control">
		{ isLoading && <Spinner /> }

		{ image && ( <div className="hm-image-control__img-container">
			<img
				src={ image.media_details.sizes.thumbnail.source_url }
				width={ image.media_details.sizes.thumbnail.width }
				height={ image.media_details.sizes.thumbnail.height }
				alt={ __( 'Thumbnail of the selected image.' ) }
				style={ {
					display: 'block',
					marginBottom: '8px',
				} }
			/>
		</div> ) }

		<div className="hm-image-control__actions">
			<MediaUpload
				onSelect={ onChange }
				type="image"
				value={ value }
				render={ ( { open } ) => (
					<Button isLarge onClick={ open }>
						{ value ? __( 'Change' ) : __( 'Select' ) }
					</Button>
				) }
			/>

			{ !! value && (
				<Button
					isLarge
					style={ { marginLeft: '8px' } }
					onClick={ () => onChange() }
				>{ __( 'Remove' ) }</Button>
			) }
		</div>
	</BaseControl>
);

ImageControl.defaultProps = {
	image: null,
	value: 0,
	label: '',
	id: '',
	help: '',
	isLoading: false,
}

ImageControl.propTypes = {
	image: PropTypes.object,
	value: PropTypes.number,
	label: PropTypes.string,
	id: PropTypes.string,
	help: PropTypes.string,
	isLoading: PropTypes.bool,
}

export default withSelect( ( select, ownProps ) => {
	const { getEntityRecord } = select( 'core' );
	const { value } = ownProps;
	const image = value ? getEntityRecord( 'root', 'media', value ) : null;

	return {
		image,
		isLoading: !! value && ! image,
	};
} )( ImageControl );

