import React from 'react';

global.wp = {
	// The plugin @babel/plugin-transform-react-jsx is configured to use wp.element.createElement as pragma.
	element: { createElement: React.createElement },
};

global.hmGbToolsData = {
	'postTypes': {
		'post': {
			'name': 'Posts',
			'singular_name': 'Post',
			'rest_base': 'posts',
		},
		'page': {
			'name': 'Pages',
			'singular_name': 'Page',
			'rest_base': 'pages',
		},
	},
	'postTypeTaxonomies': {
		'post': [
			{
				'slug': 'category',
				'label': 'Categories',
				'restBase': 'categories',
			},
			{
				'slug': 'post_tag',
				'label': 'Tags',
				'restBase': 'tags',
			},
		],
		'page': [],
	},
};
