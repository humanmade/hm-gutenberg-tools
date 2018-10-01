import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

const PostListItemAuthor = ( { author } ) => (
	<span><b>Author:</b> { author ? _get( author, 'name', '' ) : ' loading…' }</span>
);

PostListItemAuthor.propTypes = {
	id: PropTypes.number.isRequired,
	author: PropTypes.object,
}

export default PostListItemAuthor;
