import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import wp from 'wp';

import SelectionListItemAction from './selection-item-action';

const { Spinner } = wp.components;

const SelectionListItem = ( { post, thumbnail, author, postTypeObject, isSelected, actions } ) => (
	<li className={ classNames( 'post-list-item post-list-item--selection', {
		'post-list-item--selected': isSelected,
		'post-list-item--has-thumbnail': thumbnail,
	} ) }>
		{ post ? (
			<Fragment>
				{ thumbnail
					? <img
						alt={ post.title.rendered }
						className="post-list-item--image"
						src={ thumbnail.media_details.sizes.thumbnail.source_url }
					/>
					: '' }
				<div className="post-list-item--inner">
					<h2 dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
					<div className="post-list-item--meta">
						{ postTypeObject && <span key="meta-type"><b>Type:</b> { postTypeObject.labels.name }</span> }
						<span key="meta-published"><b>Published:</b> { moment( post.date_gmt ).format( 'Do MMM, YYYY' ) }</span>
						{ author && ( <span><b>Author:</b> { author.name }</span> ) }
					</div>
					<div className="post-list-item-actions">
						{ actions.map( action => (
							<SelectionListItemAction key={ action.id } { ...action } />
						) ) }
					</div>
				</div>
			</Fragment>
		) : (
			<Spinner />
		) }
	</li>
);

SelectionListItem.propTypes = {
	post: PropTypes.object,
	thumbnail: PropTypes.object,
	isSelected: PropTypes.bool,
	actions: PropTypes.array,
};

SelectionListItem.defaultProps = {
	actions: [],
	onSelectItem: () => {},
};

export default SelectionListItem;
