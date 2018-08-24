import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';

import PostSelectBrowseFilters from './../../containers/post-select/browse-filters';
import PostListItem from './post-list-item';

const { Button } = wp.components;
const { Spinner } = wp.components;

const PostSelectBrowse = props => {
	const {
		posts,
		isLoading,
		selection,
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
					onChangeFilters={ filters => onUpdateFilters( filters ) }
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
				{ ! isLoading && (
					<ol className="post-list">
						{ posts.map( post => (
							<PostListItem
								key={ post.id }
								post={ post }
								onToggleSelected={ () => onToggleSelected( post.id ) }
								isSelected={ selection.length ? selection.indexOf( post.id ) >= 0 : false }
							/>
						) ) }
					</ol>
				) }
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
	postType: PropTypes.string,
	selection: PropTypes.array,
	onToggleSelected: PropTypes.func.isRequired,
	termFilters: PropTypes.arrayOf( PropTypes.shape( {
		slug: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		restBase: PropTypes.string.isRequired,
	} ) ).isRequired,
	hasPrev: PropTypes.bool.isRequired,
	hasMore: PropTypes.bool.isRequired,
	onPrevPostsPage: PropTypes.func.isRequired,
	onNextPostsPage: PropTypes.func.isRequired,
	onUpdateFilters: PropTypes.func.isRequired,
}

export default PostSelectBrowse;
