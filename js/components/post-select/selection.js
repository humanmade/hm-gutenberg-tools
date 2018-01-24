import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _uniqueId from 'lodash/uniqueId';
import classNames from 'classnames';

import SortablePostList from './sortable-post-list';

class PostSelectSelection extends React.Component {
	render() {
		const { selectedPosts } = this.props;

		return <SortablePostList id={ _uniqueId() } posts={ selectedPosts.toJSON() }/>
	}
}

PostSelectSelection.propTypes = {
	selectedPosts: PropTypes.object.isRequired,
	// onUpdateSelection: PropTypes.object.isRequired,
}

export default PostSelectSelection;
