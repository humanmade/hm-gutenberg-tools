import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Item from './sortable-post-list-item';
import _isEqual from 'lodash/isEqual';

class SortablePostList extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
		posts: PropTypes.array.isRequired,
		onSort: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);

		this.state = {
			posts: props.posts
		};
	}

	componentDidUpdate( prevProps, prevState ) {
		const oldOrder = prevState.posts.map( p => p.id );
		const newOrder = this.state.posts.map( p => p.id );

		if ( ! _isEqual( oldOrder, newOrder ) ) {
			this.props.onSort( newOrder );
		}
	}

	moveItem(dragIndex, hoverIndex) {
		const { posts } = this.state;
		const dragItem = posts[dragIndex];

		this.setState( update( this.state, {
			posts: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragItem]
				]
			}
		} ) );
	}

	render() {
		const { posts } = this.state;

		return <ol className="post-list sortable-post-list">
			{ posts.map( ( post, i ) => <Item
				id={ post.id }
				key={ post.id }
				index={ i }
				post={ post }
				moveItem={ this.moveItem.bind( this ) }
			/> ) }
		</ol>
  }
}

export default DragDropContext( HTML5Backend )( SortablePostList );

