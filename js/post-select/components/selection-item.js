import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import moment from 'moment';
import classNames from 'classnames';

import PostListItemAuthor from './post-list-item-author';
import SelectionListItemAction from './selection-item-action';

const { Spinner } = wp.components;

const SelectionListItem = ( { post, postTypeObject, isSelected, actions } ) => (
	<li className={ classNames( 'post-list-item', { 'post-list-item--selected': isSelected } ) }>
		{ post ? <Fragment>
			<h2 dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
			<div className="post-list-item--meta">
				{ postTypeObject && <span key="meta-type"><b>Type:</b> { postTypeObject.labels.name }</span> }
				<span key="meta-published"><b>Published:</b> { moment( post.date_gmt ).format( 'Do MMM, YYYY' ) }</span>
				{ post.author && <PostListItemAuthor key="meta-author" id={ post.author }/> }
			</div>
			<div className="post-list-item-actions">
				{ actions.map( action => (
					<SelectionListItemAction key={ action.id } { ...action } />
				) ) }
			</div>
		</Fragment> : (
			<Spinner />
		) }
	</li>
);

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
