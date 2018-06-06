import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import moment from 'moment';
import _get from 'lodash/get';
import getPostTypeLabel from '../../utils/get-post-type-label';
import PostListItemAuthor from './post-list-item-author';

const { Button } = wp.components;

const PostListItem = ( { post, onClick, className } ) => {
	const meta =[
		<span><b>Type:</b> { getPostTypeLabel( post.type ) }</span>,
		<span><b>Published:</b> { moment( post.date_gmt ).format( 'Do MMM, YYYY' ) }</span>,
	];

	if ( post.author ) {
		meta.push( <PostListItemAuthor id={ post.author }/> );
	}

	return <Button id={ `post-list-item-button-${post.id}` } className={ className } onClick={ onClick }>
		<h2 className="post-list-item--title" dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
		<div className="post-list-item--meta">
			{ meta.map( ( metaItem, i ) => <Fragment key={ i }>{ metaItem } </Fragment> ) }
		</div>
	</Button>
}

PostListItem.propTypes = {
	post:      PropTypes.object.isRequired,
	onClick:   PropTypes.func.isRequired,
	className: PropTypes.string,
}

export default PostListItem;
