import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

import PostSelectBrowseFilters from './browse-filters';
import PostList from './post-list';

const { Button } = wp.components;
const { __ } = wp.i18n;
const { Spinner } = wp.components;

const PostSelectBrowse = props => {
	const {
		posts,
		isLoading,
		selectedPosts,
		onToggleSelected,
		termFilters,
		hasPrev,
		hasMore,
		onPrevPostsPage,
		onNextPostsPage,
		onUpdateFilters,
	} = props;

	return (
		<div className="menu-container">
			<div className="menu">
				<PostSelectBrowseFilters
					termFilters={ termFilters }
					onUpdate={ filters => onUpdateFilters( { filters } ) }
				/>
			</div>
			<div>
				{ isLoading && <Spinner /> }
				{ ! isLoading && hasPrev && <Button
					className="prev-page"
					isLarge
					onClick={ () => onPrevPostsPage() }
					disabled={ isLoading }
				>Previous page</Button> }
				{ ! isLoading && <PostList
					posts={ posts }
					selectedPosts={ selectedPosts }
					onToggleSelected={ onToggleSelected }
				/> }
				{ ! isLoading && hasMore && <Button
					className="next-page"
					onClick={ () => onNextPostsPage() }
					isLarge
				>Next page</Button> }
			</div>
		</div>
	);
}

PostSelectBrowse.propTypes = {
	postType:           PropTypes.string,
	selectedPosts:      PropTypes.array,
	onToggleSelected: PropTypes.func.isRequired,
	termFilters:        PropTypes.arrayOf( PropTypes.shape( {
		slug:  PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		rest:  PropTypes.string.isRequired,
	} ) ).isRequired,
	hasPrev: PropTypes.bool.isRequired,
	hasMore: PropTypes.bool.isRequired,
	onPrevPostsPage: PropTypes.func.isRequired,
	onNextPostsPage: PropTypes.func.isRequired,
	onUpdateFilters: PropTypes.func.isRequired,
}

export default PostSelectBrowse;
