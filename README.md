Human Made Gutenberg Tools
==========================

A place to bundle useful reusable Gutenberg components and other tools.

## What does this include?

* Post Select button provides a media modal like user experience for selecting single or multiple posts. It supports searching, filtering, sorting and custom post types (and taxonomies).
  * Post Select Button is a simple button that triggers the modal. `window.hm.components.PostSelectButton`
  * Post Control is a sidebar control for managing posts. Its basically just a wrapper for the button, but with some extra stying to work better in the sidebar.
* Image upload control for sidebar (InspectorControls). `window.hm.controls.ImageControl`.
* Sidebar controls for URL and Image. These are just wrappers for the core gutenberg controls that make them work/appear a bit nicer in the sidebar.

## Instructions

Install as a plugin, mu-plugin, or you can include it in your theme/plugin. 

Note that if you are including in a theme you must define `HM_GB_TOOLS_DIR` and `HM_GB_TOOLS_URL`. For example

```
	define( 'HM_GB_TOOLS_DIR', get_stylesheet_directory() . '/lib/hm-gutenberg-tools' );
	define( 'HM_GB_TOOLS_URL', get_stylesheet_directory_uri() . '/lib/hm-gutenberg-tools' );
```

HM Gutenberg Tools automatically loads its JS when the Gutenberg editor loads, and then exposes the components globally as `window.hm`. You can then use these in your project in much the the same way that you would use any other components from Gutenberg.

## Post Select UI

![image](https://user-images.githubusercontent.com/494927/35505702-d334667e-04de-11e8-8afc-4e21b1f83138.png)

**Usage**

There are 2 components you can use for this. The first is a simple button, the second is a block sidebar control.

To use the simple button, use the react component `hm.components.PostSelectButton`. Its probably worth creating a reference to make this easier to use.

```
// ES6
const { PostSelectButton } = hm.components;
// ES5
var PostSelectButton = hm.components.PostSelectButton;
```

Then you can just use this component in your code. You need to provide the following props.

```js
// ES6/JSX
<PostSelectButton 
    onSelect={ value => this.setAttributes( { value }) }
    postType="page" 
    btnProps={ { isLarge: true } }
/>

// ES5
React.createElement( PostSelectButton, {
    onSelect: function( value ) { this.setAttributes( { value }) }.bind( this ), 
    postType: 'page', Default is post.
    btnProps: { isLarge: true }, 
);

// Information on props.
// onSelect. Function. Required. Called when the 'select' button is clicked and posts are selected.
// postType String. Post type. Supports custom post types as long as they are configured to show in the REST API. 
// btnProps. Object. Optional. Props passed to the Gutenberg Button component. Refer to this for more info on what is supported. If you don't pass anything here, your button will have no visual appearance - which is useful if you want to make part of your UI clickable and trigger the modal. 
// termFilters. Array. What filters are supported. By default this is all public taxonomies for this post type, so you probably don't need this. If you do, each item in the filters array needs the following data { slug: 'publisher', 'label': 'Publishers', rest: 'publisher'  }
```

Optionsl 

## Development

* `yarn build` Builds a production version of the code.
* `yarn watch` Watches for changes and builds development versions of the code.
* `yarn lint` Lints your JS and fixes your code.
