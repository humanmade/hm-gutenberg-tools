import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import classNames from 'classnames';
import wp from 'wp';

const { Button, Dashicon } = wp.components;

class Item extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index:             PropTypes.number.isRequired,
		isDragging:        PropTypes.bool.isRequired,
		id:                PropTypes.any.isRequired,
		post:              PropTypes.object.isRequired,
		moveItem:          PropTypes.func.isRequired,
		removeItem:        PropTypes.func.isRequired,
	};

	render() {
		const { post, isDragging, connectDragSource, connectDropTarget, removeItem } = this.props;

		const cssClass = classNames( 'post-list-item', { 'is-dragging': isDragging } );

		return connectDragSource( connectDropTarget(
			<li className={ cssClass }>
				<h2 dangerouslySetInnerHTML={ { __html: post.title.rendered }} />
				<div className="post-select-result-meta">Type, Date, author</div>
				<Button className="post-list-item-remove" onClick={ () => removeItem() } isSmall={ true }>
					<Dashicon icon="dismiss" />
					<span className="screen-reader-text">Remove</span>
				</Button>
			</li>
		) );
	}
}

const itemSource = {
	beginDrag( props ) {
		return {
			index: props.index,
			id:    props.id,
		};
	},
};

const itemTarget = {
	/**
	 * This is just copy/paste from the React-DND examples.
	 */
	hover( props, monitor, component ) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		if ( dragIndex === hoverIndex ) {
			return
		}

		const hoverBoundingRect = findDOMNode( component ).getBoundingClientRect()
		const hoverMiddleY = ( hoverBoundingRect.bottom - hoverBoundingRect.top ) / 2
		const clientOffset = monitor.getClientOffset()
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Dragging downwards
		if ( dragIndex < hoverIndex && hoverClientY < hoverMiddleY ) {
			return
		}

		// Dragging upwards
		if ( dragIndex > hoverIndex && hoverClientY > hoverMiddleY ) {
			return
		}

		// Time to actually perform the action
		props.moveItem( dragIndex, hoverIndex )

		monitor.getItem().index = hoverIndex
	},
};

export default flow(
	DropTarget( 'ITEM', itemTarget, connect => ( { connectDropTarget: connect.dropTarget() } ) ),
	DragSource( 'ITEM', itemSource, ( connect, monitor ) => ( {
		connectDragSource: connect.dragSource(),
		isDragging:        monitor.isDragging(),
	} ) )
)( Item );
