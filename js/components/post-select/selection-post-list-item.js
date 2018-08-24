import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import moment from 'moment';
import classNames from 'classnames';
import getPostTypeLabel from '../../utils/get-post-type-label';
import PostListItemAuthor from './post-list-item-author';
import SelectionListItemAction from './selection-post-list-item-action';

const { Spinner } = wp.components;

const SelectionListItem = ( { post, isSelected, actions } ) => {
	if ( ! post ) {
		return <li className="post-list-item"><Spinner /></li>
	}

	const meta =[
		<span><b>Type:</b> { getPostTypeLabel( post.type ) }</span>,
		<span><b>Published:</b> { moment( post.date_gmt ).format( 'Do MMM, YYYY' ) }</span>,
	];

	if ( post.author ) {
		meta.push( <PostListItemAuthor id={ post.author }/> );
	}

	return (
		<li className={ classNames( 'post-list-item', { 'post-list-item--selected': isSelected } ) }>
			<h2 dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
			<div className="post-list-item--meta">
				{ meta.map( ( metaItem, i ) => (
					<Fragment key={ i }>{ metaItem }</Fragment>
				) ) }
			</div>
			<div className="post-list-item-actions">
				{ actions.map( action => (
					<SelectionListItemAction key={ action.id } { ...action } />
				) ) }
			</div>
		</li>
	);
}

SelectionListItem.propTypes = {
	post: PropTypes.object,
	isSelected: PropTypes.bool,
	actions: PropTypes.array,
}

SelectionListItem.defaultProps = {
	actions: [],
	onSelectItem: () => {},
}

export default SelectionListItem;
