# InnerBlockSlider. A component to help build the interface for managing sliders and carousels within the block editor.

This component creates a UI for managing a horizontal slider within the block editor. This is useful if you want to avoid loading your front end carousel or slider implementation and making it work nicely within the editor.

Slides are saved as inner blocks.

It is up to you to provide your own front end slider interface, using your library of choice.

The slider allows you to configure allowed slides that can be added. In the example, core/image blocks are used. However in typical use, it is common to create a `slide` block that can *only* be used as a child of your `slider` block.

InnerBlockSlider does not provide a fully functional slider on the front end, however we [recommend Splide which is a lightweight and accessible slider library](https://splidejs.com/).

This component was adapted from the [InnerBlockSlider component by 10up](https://github.com/10up/block-components/blob/develop/components/inner-block-slider/index.js).

## Usage

```js
// Edit Component
const { useBlockProps } = wp.blockEditor;
const { InnerBlockSlider } = window.hm.components;
const MyCarouselEdit = ({clientId}) => {
  return (
    <div { ...useBlockProps() }>
      <InnerBlockSlider
        allowedBlock="core/cover"
        slideLimit={2}
        parentBlockId={ clientId }
      />
    </div>
  )
}
```

```js
// Save Component
const { useBlockProps, useInnerBlockProps } = wp.blockEditor;
const MyCarouselSave = ({clientId}) => {
  return (
    <div { ...useBlockProps() }>
      <div { ...useInnerBlockProps.save() } />
    </div>
  )
}
```

## Props

| Name            | Type        | Default |  Description                                                                                                     |
| --------------- | ----------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `allowedBlock`  | `string`    | `''`    | Block types to be allowed inside the slider                                                                      |
| `parentBlockId` | `string`    | -       | **Required.** The ID of parent block.                                                                            |
| `template`      | `string`    | `''`    | Template for new slide. By default it is just once instance of the allowedBlock, so is typically not required.   |
