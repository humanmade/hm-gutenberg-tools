import React from 'react';
import wp from 'wp';
import _get from 'lodash/get';

const { withSelect } = wp.data;

const PostListItemAuthor = ( { user, isLoading = true } ) => {
	return <span><b>Author:</b> { isLoading ? ' loading...' : user && user.name }</span>;
}

export default withSelect( ( select, { id } ) => ( { isLoading: false, user: select( 'core' ).getAuthors().filter( user => user.id === id )[0] } ) )( PostListItemAuthor );
