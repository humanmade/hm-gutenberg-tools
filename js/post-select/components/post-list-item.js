import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import wp from 'wp';

const { __ }  = wp.i18n;

const PostListItem = ( { post, author, thumbnail, postTypeObject, isSelected, onToggleSelected } ) => (
	<li className={ classNames( 'post-list-item', {
		'post-list-item--selected': isSelected,
		'post-list-item--has-thumbnail': thumbnail,
	} ) }>
		<label htmlFor={ `select-post-${post.id}` }>
			{ thumbnail
				? <img
					alt={ post.title.rendered }
					className="post-list-item--image"
					src={ thumbnail.media_details.sizes.thumbnail.source_url }
				/>
				: '' }
			<div className="post-list-item--inner">
				<input
					checked={ isSelected }
					className="screen-reader-text"
					id={ `select-post-${post.id}` }
					type="checkbox"
					onChange={ () => onToggleSelected() }
				/>
				<h2 dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
				<div className="post-list-item--meta">
					{ postTypeObject && ( <span><b>{ __( 'Type:', 'hm-gb-tools' ) }</b> { postTypeObject.labels.singular_name }</span> ) }
					<span><b>{ __( 'Published:', 'hm-gb-tools' ) }</b> { moment( post.date_gmt ).format( 'Do MMM, YYYY' ) }</span>
					{ author && ( <span><b>Author:</b> { author.name }</span> ) }
				</div>
			</div>
		</label>
	</li>
);

PostListItem.propTypes = {
	post: PropTypes.object.isRequired,
	postTypeObject: PropTypes.object,
	thumbnail: PropTypes.object,
	isSelected: PropTypes.bool,
	onToggleSelected: PropTypes.func.isRequired,
};

PostListItem.defaultProps = {
	actions: [],
	onSelectItem: () => {},
};

export default PostListItem;
