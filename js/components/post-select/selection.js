import React from 'react';
import PropTypes from 'prop-types';

import SelectionListItem from './../../containers/post-select/selection-post-list-item';

const Selection = ( {
	selection,
	onRemoveItem,
	onMoveItemUp,
	onMoveItemDown,
	postType,
} ) => (
	<React.Fragment>
		{ ! selection.length && (
			<p className="no-selection">Nothing selected</p>
		) }
		{ selection.length > 0 && (
			<ol className="post-list">
				{ selection.map( postId => (
					<SelectionListItem
						key={ postId }
						postType={ postType }
						postId={ postId }
						actions={ [
							{
								id: 'move-post-up',
								text: 'Move post up',
								icon: 'arrow-up-alt2',
								disabled: postId === selection[0],
								onClick: () => onMoveItemUp( postId ),
							},
							{
								id: 'move-post-down',
								text: 'Move post down',
								icon: 'arrow-down-alt2',
								disabled: postId === selection[ selection.length - 1 ],
								onClick: () => onMoveItemDown( postId ),
							},
							{
								id: 'remove-post',
								text: 'Remove post from selections',
								icon: 'dismiss',
								onClick: () => onRemoveItem( postId ),
							},
						] }
					/>
				) ) }
			</ol>
		) }
	</React.Fragment>
);

Selection.propTypes = {
	postType: PropTypes.string.isRequired,
	selection: PropTypes.array.isRequired,
	onRemoveItem: PropTypes.func.isRequired,
	onMoveItemUp: PropTypes.func.isRequired,
	onMoveItemDown: PropTypes.func.isRequired,
};

export default Selection;
