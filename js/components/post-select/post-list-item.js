import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import moment from 'moment';
import classNames from 'classnames';
import getPostTypeLabel from '../../utils/get-post-type-label';
import PostListItemAuthor from './post-list-item-author';

const PostListItem = ( { post, isSelected, onToggleSelected, actions } ) => {
	const meta =[
		<span><b>Type:</b> { getPostTypeLabel( post.type ) }</span>,
		<span><b>Published:</b> { moment( post.date_gmt ).format( 'Do MMM, YYYY' ) }</span>,
	];

	if ( post.author ) {
		meta.push( <PostListItemAuthor id={ post.author }/> );
	}

	return (
		<li
			className={ classNames( 'post-list-item', { 'post-list-item--selected': isSelected } ) }
			onClick={ () => onToggleSelected ? onToggleSelected() : null }
		>
			<h2 dangerouslySetInnerHTML={ { __html: post.title.rendered }} />
			<div className="post-list-item--meta">
				{ meta.map( ( metaItem, i ) => <Fragment key={ i }>{ metaItem } </Fragment> ) }
			</div>
		</li>
	);
}

PostListItem.propTypes = {
	post:         PropTypes.object.isRequired,
	isSelected:   PropTypes.bool,
	actions:      PropTypes.array,
	onToggleSelected: PropTypes.func,
}

PostListItem.defaultProps = {
	actions: [],
	actions: [],
	onSelectItem: () => {},
}

export default PostListItem;
