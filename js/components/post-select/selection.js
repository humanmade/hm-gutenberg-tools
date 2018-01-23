import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _get from 'lodash/get';
import _uniqueId from 'lodash/uniqueId';
import _pull from 'lodash/pull';
import classNames from 'classnames';

import SortablePostList from './sortable-post-list';

class PostSelectSelection extends React.Component {
	render() {
		const { selectedPosts } = this.props;

		return <SortablePostList posts={ selectedPosts.toJSON() }/>
	}
}

PostSelectSelection.propTypes = {
	selectedPosts: PropTypes.object.isRequired,
	// onUpdateSelection: PropTypes.object.isRequired,
}

export default PostSelectSelection;
