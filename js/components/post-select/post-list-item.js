import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import classNames from 'classnames';
import getPostTypeLabel from '../../utils/get-post-type-label';
import PostListItemActions from './post-list-item-actions';

const { Button } = wp.components;

const PostListItem = ( { post, onClick, isSelected, onSelectItem, actions } ) => {
	const meta =[
		getPostTypeLabel( post.type ),
		'Date',
		'author',
	];

	return (
		<li
			className={ classNames( 'post-list-item', { 'post-list-item--selected': isSelected } ) }
			onClick={ () => onSelectItem() }
		>
			<h2 dangerouslySetInnerHTML={ { __html: post.title.rendered }} />
			<div className="post-select-result-meta">Type, Date, author</div>
			<PostListItemActions actions={ actions }/>
		</li>
	);
}

PostListItem.propTypes = {
	post:         PropTypes.object.isRequired,
	onClick:      PropTypes.func.isRequired,
	isSelected:   PropTypes.bool,
	actions:      PropTypes.array,
	onSelectItem: PropTypes.func,
}

PostListItem.defaultProps = {
	actions: [],
	actions: [],
	onSelectItem: () => {},
}

export default PostListItem;
