import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Item from './sortable-post-list-item';
import _isEqual from 'lodash/isEqual';

class SortablePostList extends Component {

	static propTypes = {
		id:           PropTypes.string.isRequired,
		posts:        PropTypes.array.isRequired,
		onSort:       PropTypes.func.isRequired,
		onRemoveItem: PropTypes.func.isRequired,
	};

	moveItem( dragIndex, hoverIndex ) {
		const { posts, onSort } = this.props;
		const dragItem = posts[dragIndex];

		const newOrder = update( posts, {
			$splice: [
				[ dragIndex, 1 ],
				[ hoverIndex, 0, dragItem ],
			],
		}
		);

		onSort( newOrder.map( p => p.id ) );
	}

	render() {
		const { posts, onRemoveItem } = this.props;

		return <ol className="post-list sortable-post-list">
			{ posts.map( ( post, i ) => <Item
				id={ post.id }
				key={ post.id }
				index={ i }
				post={ post }
				moveItem={ this.moveItem.bind( this ) }
				removeItem={ () => onRemoveItem( post ) }
			/> ) }
		</ol>
	}
}

export default DragDropContext( HTML5Backend )( SortablePostList );

