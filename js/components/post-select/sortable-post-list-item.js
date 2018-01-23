import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import classNames from 'classnames';

class Item extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		post: PropTypes.object.isRequired,
		moveItem: PropTypes.func.isRequired,
	}

	render() {
		const { post, isDragging, connectDragSource, connectDropTarget } = this.props;

		const cssClass = classNames( 'post-list-item', { 'is-dragging': isDragging } );

		return connectDragSource( connectDropTarget(
			<li className={ cssClass }>
				<h2 dangerouslySetInnerHTML={ { __html: post.title.rendered }} />
				<div className="post-select-result-meta">Type, Date, author</div>
			</li>
		) );
	}
}

const itemSource = {
	beginDrag(props) {
		return {
			index: props.index,
			id: props.id,
		};
	},
};

const itemTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveItem(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	},
};

export default flow(
	DropTarget("ITEM", itemTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("ITEM", itemSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Item);
