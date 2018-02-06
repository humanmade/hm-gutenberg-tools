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

You will need to run `yarn && yarn build` in in the hm-gutenberg-tools directory to ensure all the built files are available (In the future I hope to make this step redundant and provide built release versions).

Note that if you are including in a theme (or anywhere outside of plugins/mu-plugins directories) you must define `HM_GB_TOOLS_DIR` and `HM_GB_TOOLS_URL`. For example

```
	define( 'HM_GB_TOOLS_DIR', get_stylesheet_directory() . '/lib/hm-gutenberg-tools' );
	define( 'HM_GB_TOOLS_URL', get_stylesheet_directory_uri() . '/lib/hm-gutenberg-tools' );
```

Then you should specify the script `hm-gb-tools-editor` as a dependency of the script in which you are using it.

HM Gutenberg Tools then exposes all functionality globally as `window.hm`. You can then use reference this in your project in much the the same way that you would use any other components from Gutenberg.

[Refer to the Wiki for usage instructions on individual components](https://github.com/humanmade/hm-gutenberg-tools/wiki)

## Post Select UI

![image](https://user-images.githubusercontent.com/494927/35505702-d334667e-04de-11e8-8afc-4e21b1f83138.png)

[Refer to the wiki for more information on how to use this component.](https://github.com/humanmade/hm-gutenberg-tools/wiki/Post-Select-Button)

## Development

* `yarn build` Builds a production version of the code.
* `yarn watch` Watches for changes and builds development versions of the code.
* `yarn lint` Lints your JS and fixes your code.
