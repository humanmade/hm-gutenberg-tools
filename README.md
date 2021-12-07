Human Made Gutenberg Tools
==========================

A place to bundle useful reusable Gutenberg components and other tools.

## What does this include?

* [Post Select button.](https://github.com/humanmade/hm-gutenberg-tools/wiki/Post-Select-Button) Provides a media modal like user experience for selecting single or multiple posts. It supports searching, filtering, sorting and custom post types (and taxonomies).
stying to work better in the sidebar.
* More Sidebar controls. Other components wrapped up in as standardised sidebar control components.
    * [Link control.](https://github.com/humanmade/hm-gutenberg-tools/wiki/Link-Control) A wrapper for the core UrlInput, but with some style improvements.
    * [Image.](https://github.com/humanmade/hm-gutenberg-tools/wiki/Image-Control) Sidebar UI for selecting an image.
    * [Post.](https://github.com/humanmade/hm-gutenberg-tools/wiki/Post-Select-Button) A wrapper for the post select button component.

## Instructions

Install as a plugin, mu-plugin, or you can include it in your theme/plugin.

You will need to run `npm install && npm run build` in in the hm-gutenberg-tools directory to ensure all the built files are available (In the future I hope to make this step redundant and provide built release versions).

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

* `npm run build` Builds a production version of the code.
* `npm run watch` Watches for changes and builds development versions of the code.
* `npm run lint` Lints your JS and fixes your code.

## Releasing a new version.

1. Update the version numbers in `plugin.php` and `package.json`.
2. Add the changelog to the readme for the new version.
3. Commit your changes to `main` and push.
4. Run the bash script: `./release.sh v1.2.3`

The script will sync the the build branch with main, build assets and commit the changes, and publish a new tagged version.

## Changelog

### v1.6.2

* Fix date filter label not being cleared when both selected dates are unset.
* Switch from node-sass to sass and npm audit fix

### v1.6.1

* Reset PostSelect current page when filters are changed

### v1.6.0

* Adds date range filters for use when searching posts

### v1.5.0

* Handle current selections across multiple post types
* Correctly handle post type filters in post selection modal
* Preserbe specified Post Type list when clearing Types token list

### v1.4.1

* Adds a filter to allow the post select query to be modified

### v1.4.0

* Support thumbnails in post select components

### v1.3.1

* Switch selection when clicking off single-post selections

### v1.1.0

* Support for i18n.

### v1.0.0

* Refactor how it works for compatability with WordPress 5.0
    * Use core data store
    * Use custom endpoint to fetch content to handle multiple post types.

### v0.2.0

* Deprecate EditableHTML. You can now just use the Gutenberg component `wp.editor.RichText` and set the `format` prop to `string`.
* Updates to work with the latest version of Gutenberg (3.5).
