import React from 'react';
import PropTypes from 'prop-types';
import _uniqueId from 'lodash/uniqueId';

import PostListItem from './post-list-item';


const PostSelectSelection = ( { selectedPosts, onRemoveItem, onMoveItemUp, onMoveItemDown } ) => (
	<React.Fragment>
		{ ! selectedPosts.length && <p>Nothing selected</p> }
		{ selectedPosts.length > 0 && <ol className="post-list">
			{ selectedPosts.map( ( post, i ) => (
				<PostListItem
					key={ i }
					post={ post }
					actions={ [
						{
							text: 'Move post up',
							icon: 'arrow-up-alt2',
							disabled: i === 0,
							onClick: () => onMoveItemUp( post ),
						},
						{
							text: 'Move post down',
							icon: 'arrow-down-alt2',
							disabled: i >= selectedPosts.length - 1,
							onClick: () => onMoveItemDown( post ),
						},
						{
							text: 'Remove post from selections',
							icon: 'dismiss',
							onClick: () => onRemoveItem( post ),
						},
					] }
				/>
			) ) }
		</ol> }
	</React.Fragment>
);

PostSelectSelection.propTypes = {
	selectedPosts:  PropTypes.array.isRequired,
	onRemoveItem:   PropTypes.func.isRequired,
	onMoveItemUp:   PropTypes.func.isRequired,
	onMoveItemDown: PropTypes.func.isRequired,
};

export default PostSelectSelection;
