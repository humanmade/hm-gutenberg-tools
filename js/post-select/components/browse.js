import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import wp from 'wp';

import PostSelectBrowseFilters from './../containers/browse-filters';
import PostListItem from './../containers/post-list-item';

const { __ } = wp.i18n;
const { Button } = wp.components;
const { Spinner } = wp.components;

const PostSelectBrowse = props => {
	const {
		filters,
		posts,
		isLoading,
		selection,
		onToggleSelected,
		termFilters,
		hasPrev,
		hasMore,
		onPrevPostsPage,
		onNextPostsPage,
		onApplyFilters,
		postTypes,
		showDateFilters,
	} = props;

	return (
		<div className="menu-container">
			<div className="menu">
				<PostSelectBrowseFilters
					filters={ filters }
					postTypes={ postTypes }
					showDateFilters={ showDateFilters }
					termFilters={ termFilters }
					onApplyFilters={ filters => onApplyFilters( filters ) }
				/>
			</div>
			<div>
				{ isLoading ? (
					<Spinner />
				) : (
					<Fragment>
						{ hasPrev && (
							<Button
								className="prev-page"
								disabled={ isLoading }
								onClick={ () => onPrevPostsPage() }
							>
								Previous page
							</Button>
						 ) }

						{ posts.length > 0 ? (
							<ol className="post-list">
								{ posts.map( post => (
									<PostListItem
										key={ post.id }
										isSelected={ selection.findIndex( p => p.id === post.id ) >= 0 }
										post={ post }
										postType={ post.type }
										onToggleSelected={ () => onToggleSelected( post ) }
									/>
								) ) }
							</ol>
						) : (
							<p className="no-results">{ __( 'No results found.' ) }</p>
						) }

						{ hasMore && <Button
							className="next-page"
							onClick={ () => onNextPostsPage() }
						>Next page</Button> }
					</Fragment>
				) }
			</div>
		</div>
	);
};

PostSelectBrowse.propTypes = {
	filters: PropTypes.objectOf( PropTypes.arrayOf( PropTypes.number ) ),
	postTypes: PropTypes.arrayOf( PropTypes.string ).isRequired,
	selection: PropTypes.array,
	onToggleSelected: PropTypes.func.isRequired,
	termFilters: PropTypes.arrayOf( PropTypes.string ),
	hasPrev: PropTypes.bool.isRequired,
	hasMore: PropTypes.bool.isRequired,
	onPrevPostsPage: PropTypes.func.isRequired,
	onNextPostsPage: PropTypes.func.isRequired,
	onApplyFilters: PropTypes.func.isRequired,
};

export default PostSelectBrowse;
