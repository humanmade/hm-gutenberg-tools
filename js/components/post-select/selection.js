import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _get from 'lodash/get';
import _uniqueId from 'lodash/uniqueId';
import _pull from 'lodash/pull';
import classNames from 'classnames';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SortableContainer from './sortable-container';

class PostSelectSelection extends React.Component {
	render() {
		const { selectedPosts } = this.props;

		const selection = selectedPosts.toJSON().map( post => { return {
			id: post.id,
			title: post.title.rendered,
		} } );

		return <SortableContainer list={ selection }/>
	}
}

PostSelectSelection.propTypes = {
	selectedPosts: PropTypes.object.isRequired,
	// onUpdateSelection: PropTypes.object.isRequired,
}

export default DragDropContext(HTML5Backend)(PostSelectSelection);
// export default PostSelectSelection;
