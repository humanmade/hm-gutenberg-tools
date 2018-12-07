import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

const PostListItem = ( { post, author, postTypeObject, isSelected, onToggleSelected } ) => (
	<li className={ classNames( 'post-list-item', { 'post-list-item--selected': isSelected } ) }>
		<label htmlFor={ `select-post-${post.id}` }>
			<input
				className="screen-reader-text"
				type="checkbox"
				checked={ isSelected }
				id={ `select-post-${post.id}` }
				onChange={ () => onToggleSelected() }
			/>
			<h2 dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
			<div className="post-list-item--meta">
				{ postTypeObject && ( <span><b>Type:</b> { postTypeObject.labels.singular_name }</span> ) }
				<span><b>Published:</b> { moment( post.date_gmt ).format( 'Do MMM, YYYY' ) }</span>
				{ author && ( <span><b>Author:</b> { author.name }</span> ) }
			</div>
		</label>
	</li>
);

PostListItem.propTypes = {
	post: PropTypes.object.isRequired,
	postTypeObject: PropTypes.object,
	isSelected: PropTypes.bool,
	onToggleSelected: PropTypes.func.isRequired,
}

PostListItem.defaultProps = {
	actions: [],
	onSelectItem: () => {},
}

export default PostListItem;
