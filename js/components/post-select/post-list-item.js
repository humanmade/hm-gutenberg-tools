import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import getPostTypeLabel from '../../utils/get-post-type-label';
import PostListItemAuthor from './../../containers/post-select/post-list-item-author';

const PostListItem = ( { post, isSelected, onToggleSelected } ) => {
	const meta =[
		<span><b>Type:</b> { getPostTypeLabel( post.type ) }</span>,
		<span><b>Published:</b> { moment( post.date_gmt ).format( 'Do MMM, YYYY' ) }</span>,
	];

	if ( post.author ) {
		meta.push( <PostListItemAuthor id={ post.author }/> );
	}

	return (
		<li className={ classNames( 'post-list-item', { 'post-list-item--selected': isSelected } ) }>
			<label htmlFor={ `select-post-${post.id}` }>
				<input
					className="screen-reader-text"
					type="checkbox"
					checked={ isSelected }
					id={ `select-post-${post.id}` }
					onChange={ e => {
						onToggleSelected();
						console.log( e );
					} }
				/>
				<h2 dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
				<div className="post-list-item--meta">
					{ meta.map( ( metaItem, i ) => <Fragment key={ i }>{ metaItem } </Fragment> ) }
				</div>
			</label>
		</li>
	);
}

PostListItem.propTypes = {
	post: PropTypes.object.isRequired,
	isSelected: PropTypes.bool,
	onToggleSelected: PropTypes.func.isRequired,
}

PostListItem.defaultProps = {
	actions: [],
	onSelectItem: () => {},
}

export default PostListItem;
