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

![image](https://user-images.githubusercontent.com/494927/35505702-d334667e-04de-11e8-8afc-4e21b1f83138.png)

## Installation Instructions

It is reccomended to install as a plugin or mu-plugin using composer.

```
composer require humanmade/hm-gutenberg-tools
```

If you install using another method (e.g. git submodule), note that the `main` branch does not include built assets, but tagged releases and the `build` branch do include them. You should not need to build the assets for this plugin as part of your project build process.

### Bundling in a theme

You can bundle the plugin in a theme (or anywhere outside of plugins/mu-plugins directories). In order to do this you need to define `HM_GB_TOOLS_DIR` and `HM_GB_TOOLS_URL`. For example

```
define( 'HM_GB_TOOLS_DIR', get_stylesheet_directory() . '/lib/hm-gutenberg-tools' );
define( 'HM_GB_TOOLS_URL', get_stylesheet_directory_uri() . '/lib/hm-gutenberg-tools' );
```

## Using components from HM Gutenberg Tools

You should specify the script `hm-gb-tools-editor` as a dependency of the script in which you are using it.

```php
wp_enqueue_script( 'my-custom-block', plugins_url( 'my-custom-block.js', dirname(__FILE__) ), [ 'hm-gb-tools-editor' ], '1.0' );
```

HM Gutenberg Tools then exposes all functionality globally as `window.hm`. You can then use reference this in your project in much the the same way that you would use any other components from Gutenberg.

```js
const { PostSelectButton } = window.hm.components;

function Edit( { attributes, setAttributes } ) {
    return (
        <PostSelectButton
            value={ attributes.postIds }
            onSelect={ posts => setAttributes( { postIds: posts.map( p => p.id ) } ) }
            postType="page"
            btnProps={ { isLarge: true } }
        >
    );
}
```

[**Refer to the Wiki for usage instructions on individual components**](https://github.com/humanmade/hm-gutenberg-tools/wiki)

## Development

* `npm run build` Builds a production version of the code.
* `npm run watch` Watches for changes and builds development versions of the code.
* `npm run lint` Lints your JS. Run `npm run lint -- --fix` to fix it too.
* `composer run lint` Lints your PHP code.

To assist with local development, you can define `define( 'HM_GB_TOOLS_DEV', true );` to enable the "HM Gutenberg Tools Dev" block, which includes examples of many of features offered by this plugin.

## Releasing a new version.

1. Update the version numbers in `plugin.php` and `package.json`.
2. Add the changelog to the readme for the new version.
3. Commit your changes to `main` and push.
4. Run the bash script: `./release.sh v1.2.3`

The script will sync the the build branch with main, build assets and commit the changes, and publish a new tagged version.

## Changelog

### v1.7.1

* Add filter for minimum search length for term select.
* Add filter for term select query.

### v1.7.0

* Add post status field select.
* Allow to accept status from the Rest API endpoint.
* Add status field in the post list item.
* Update deprecated mediaUpload function.

### v1.6.3

* Ignore sticky posts by default.

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
