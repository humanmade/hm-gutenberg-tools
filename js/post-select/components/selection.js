import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SelectionListItem from '../containers/selection-item';

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
								text: 'Move post up',
								icon: 'arrow-up-alt2',
								disabled: post.id === selection[0].id,
								onClick: () => onMoveItemUp( post ),
							},
							{
								id: 'move-post-down',
								text: 'Move post down',
								icon: 'arrow-down-alt2',
								disabled: post.id === selection[ selection.length - 1 ].id,
								onClick: () => onMoveItemDown( post ),
							},
							{
								id: 'remove-post',
								text: 'Remove post from selections',
								icon: 'dismiss',
								onClick: () => onRemoveItem( post ),
							},
						] }
					/>
				) ) }
			</ol>
		) : (
			<p className="no-selection">Nothing selected</p>
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
