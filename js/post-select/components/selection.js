import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

import SelectionListItem from '../containers/selection-item';

const { __ } = wp.i18n;

const Selection = ( {
	selection,
	onRemoveItem,
	onMoveItemUp,
	onMoveItemDown,
} ) => (
	<Fragment>
		{ selection.length > 0 ? (
			<ol className="post-list">
				{ selection.map( post => (
					<SelectionListItem
						key={ post.id }
						postType={ post.type }
						post={ post }
						actions={ [
							{
								id: 'move-post-up',
								text: __( 'Move post up', 'rbmh' ),
								icon: 'arrow-up-alt2',
								disabled: post.id === selection[0].id,
								onClick: () => onMoveItemUp( post ),
							},
							{
								id: 'move-post-down',
								text: __( 'Move post down', 'rbmh' ),
								icon: 'arrow-down-alt2',
								disabled: post.id === selection[ selection.length - 1 ].id,
								onClick: () => onMoveItemDown( post ),
							},
							{
								id: 'remove-post',
								text: __( 'Remove post from selections', 'rbmh' ),
								icon: 'dismiss',
								onClick: () => onRemoveItem( post ),
							},
						] }
					/>
				) ) }
			</ol>
		) : (
			<p className="no-selection">{ __( 'Nothing selected', 'rbmh' ) }</p>
		) }
	</Fragment>
);

Selection.propTypes = {
	selection: PropTypes.arrayOf( PropTypes.object ).isRequired,
	onRemoveItem: PropTypes.func.isRequired,
	onMoveItemUp: PropTypes.func.isRequired,
	onMoveItemDown: PropTypes.func.isRequired,
};

export default Selection;
