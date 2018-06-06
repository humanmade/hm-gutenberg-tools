import React from 'react';
import wp from 'wp';
import _get from 'lodash/get';

const { withAPIData } = wp.components;

const PostListItemAuthor = ( { user } ) => {
	return <span><b>Author:</b> { user.isLoading ? ' loading...' : _get( user, 'data.name', '' ) }</span>;
}

export default withAPIData( ( { id } ) => ( { user: `/wp/v2/users/${ id }` } ) )( PostListItemAuthor );
