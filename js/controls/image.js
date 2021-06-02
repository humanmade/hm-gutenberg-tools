import PropTypes from 'prop-types';
import React from 'react';
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
	<BaseControl className="hm-image-control" help={ help } id={ id } label={ label }>
		{ isLoading && <Spinner /> }

		{ image && ( <div className="hm-image-control__img-container">
			<img
				alt={ __( 'Thumbnail of the selected image.', 'hm-gb-tools' ) }
				height={ image.media_details.sizes.thumbnail.height }
				src={ image.media_details.sizes.thumbnail.source_url }
				style={ {
					display: 'block',
					marginBottom: '8px',
				} }
				width={ image.media_details.sizes.thumbnail.width }
			/>
		</div> ) }

		<div className="hm-image-control__actions">
			<MediaUpload
				render={ ( { open } ) => (
					<Button isSecondary onClick={ open }>
						{ value ? __( 'Change' ) : __( 'Select' ) }
					</Button>
				) }
				type="image"
				value={ value }
				onSelect={ onChange }
			/>

			{ !! value && (
				<Button
					isSecondary
					style={ { marginLeft: '8px' } }
					onClick={ () => onChange( null ) }
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
};

ImageControl.propTypes = {
	image: PropTypes.object,
	value: PropTypes.number,
	label: PropTypes.string,
	id: PropTypes.string,
	help: PropTypes.string,
	isLoading: PropTypes.bool,
};

export default withSelect( ( select, ownProps ) => {
	const { getMedia } = select( 'core' );
	const { value } = ownProps;
	const image = value ? getMedia( value ) : null;

	return {
		image,
		isLoading: !! value && ! image,
	};
} )( ImageControl );
