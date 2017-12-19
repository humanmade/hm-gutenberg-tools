Human Made Gutenberg Tools
==========================

A place to bundle useful reusable Gutenberg components and other tools.

## What does this include?

* Better Post Select interface provides a media modal like UI for selecting single or multiple posts that supports searching, filtering and pagination.
  * Post Select Button is a simple button that triggers the modal. `window.hm.components.PostSelectButton`
  * Post Control is a sidebar control for managing posts. Its basically just a wrapper for the button, intended for use in the InspectorControls.  `window.hm.controls.PostControl`  
* Image upload control for sidebar (InspectorControls). `window.hm.controls.ImageControl`.

## Development

* `yarn build` Builds a production version of the code.
* `yarn watch` Watches for changes and builds development versions of the code.
* `yarn lint` Lints your JS and fixes your code.
