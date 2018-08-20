import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

const { withSelect } = wp.data;

const PostListItemAuthor = ( { author } ) => (
	<span><b>Author:</b> { author ? _get( author, 'name', '' ) : ' loading...' }</span>
);

PostListItemAuthor.propTypes = {
	id: PropTypes.number.isRequired,
	author: PropTypes.object,
}

/**
 * Core seems to only support fetching all users at once.
 * But since this data is probably available already, lets use it.
 */
export default withSelect( ( select, ownProps ) => ( {
	...ownProps,
	author: select( 'core' ).getAuthors().find( a => ownProps.id === a.id ),
} ) )( PostListItemAuthor );
