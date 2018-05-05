# ember-emojione

[![CircleCI build status](https://img.shields.io/circleci/project/github/Deveo/ember-emojione.svg)](https://circleci.com/gh/Deveo/ember-emojione)
[![Ember Observer Score](http://emberobserver.com/badges/ember-emojione.svg?cache_bust=1)](http://emberobserver.com/addons/ember-emojione)
[![npm package version](https://img.shields.io/npm/v/ember-emojione.svg)](https://www.npmjs.com/package/ember-emojione)
[![license MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/Deveo/ember-emojione/blob/gen-1/LICENSE.md)
![ember-versions 2.11+](https://img.shields.io/badge/ember--versions-2.4%2B-yellowgreen.svg?bump)
![node-versions 6+](https://img.shields.io/badge/node--versions-6%2B-yellowgreen.svg?bump)
![ember-cli 2.16.2](https://img.shields.io/badge/uses%20ember--cli-2.16.2-blue.svg?bump)

`ember-emojione` is your emoji solution for Ember, based on the [EmojiOne](http://emojione.com/) project.

EmojiOne version 2 is used, which is free to use for everyone (CC BY-SA 4.0), you're only required to give appropriate credit to EmojiOne authors somewhere in your app/website. Unfortunately, EmojiOne 3 is a paid product for commercial use.

Demo: https://deveo.github.io/ember-emojione/ :sparkles:



## Table of contents

* [Support](#support)
* [Requirements](#requirements)
* [Quick installation](#quick-installation)
* [Detailed Installation](#detailed-installation)
  * [1. Installing the addon itself](#1-installing-the-addon-itself)
  * [2. Installing the EmojiOne library](#2-installing-the-emojione-library)
    * [Option 1: including only the necessary assets (recommended)](#option-1-including-only-the-necessary-assets-recommended)
    * [Option 2: including the whole emojione package](#option-2-including-the-whole-emojione-package)
  * [3. Asset configuration in ember-cli-build.js to tell the addon about the choices you made above](#3-asset-configuration-in-ember-cli-buildjs-to-tell-the-addon-about-the-choices-you-made-above)
  * [Including component styles](#including-component-styles)
* [Runtime Configuration in config/environment.js](#runtime-configuration-in-configenvironmentjs)
* [Usage](#usage)
  * [inject-emoji helper](#inject-emoji-helper)
    * [Overriding options](#overriding-options)
    * [Customizing emoji size via CSS](#customizing-emoji-size-via-css)
    * [Using from JS](#using-from-js)
    * [Skipping code blocks](#skipping-code-blocks)
  * [emoji-picker-wrapper component](#emoji-picker-wrapper-component)
    * [emoji-picker-wrapper usage example](#emoji-picker-wrapper-usage-example)
    * [emoji-picker-wrapper usage example breakdown](#emoji-picker-wrapper-usage-example-breakdown)
    * [emoji-picker-wrapper options](#emoji-picker-wrapper-options)
    * [emoji-picker-wrapper yielded values](#emoji-picker-wrapper-yielded-values)
  * [emoji-picker component](#emoji-picker-component)
    * [emoji-picker options](#emoji-picker-options)
  * [emoji-picker-toggler component](#emoji-picker-toggler-component)
    * [emoji-picker-toggler options](#emoji-picker-toggler-options)
  * [emoji-typing-assistance component](#emoji-typing-assistance-component)
    * [emoji-typing-assistance options](#emoji-typing-assistance-options)
  * [Using the emojione JS library directly](#using-the-emojione-js-library-directly)
  * [I18n](#i18n)
* [Upgrading from older versions](#upgrading-from-older-versions)
  * [From 1.x](#from-1x)
* [Development](#development)
  * [Installation](#installation)
  * [Running](#running)
  * [Running Tests](#running-tests)
  * [Do not use npm or ember install, use yarn](#do-not-use-npm-or-ember-install-use-yarn)
  * [Branch names](#branch-names)
  * [Updating the table of contents](#updating-the-table-of-contents)
  * [Demo deployment](#demo-deployment)
* [Credits](#credits)
* [License](#license)



## Support

Bug reports and feature requests are very welcome. In case you have something to suggest or report, please file an issue to the [issue queue](https://github.com/Deveo/ember-emojione/issues). But first make sure there's no similar issue. ;)

If you're having trouble using this addon in your project, please file a properly structured question at [StackOverflow](http://stackoverflow.com/questions/ask?tags=ember.js,ember-emojione). It is important that you use `ember.js` and `ember-emojione` tags for your question to be seen.



## Requirements

* Ember 2.4+
* Node 6+



## Quick installation

If you don't want to go into the nuances of installation and configuration, use these short installation instructions. Then you can skip to the Usage section.

Quick installation will use these defaults:

* Emoji are rendered as PNG sprites.
* Sprite size is 64×64 px.
* The sprite sheet is included into your app's distro (it's not available on JSDelivr).
* This addon's components are available (picker, wrapper, typing assistance).

Run these console commands in your app:

    ember install ember-emojione
    bower install -S emojione-js=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/lib/js/emojione.js
    bower install -S emojione-css=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.css
    bower install -S emojione-png=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.png
    bower install -S emojione-defs=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/emoji.json

If your app uses `ember-cli-sass`, the addon will not import component CSS automatically, so that you have more control. Import manually what you need:

```scss
@import "node_modules/ember-emojione/app/styles/helpers/mixin";
@import "node_modules/ember-emojione/app/styles/components/emoji-assist";
@import "node_modules/ember-emojione/app/styles/components/emoji-picker";
```

Now you should be good to go. If your development server has been running, don't forget to restart it.



## Detailed Installation

The `emojione` Bower package, which this addon relies on, is over 90 MiB large. As EmojiOne assets can be served from the "free and super-fast" [JSDelivr](http://jsdelivr.com) CDN, many developers won't need any EmojiOne images locally.

This addon can be configured to include as few or as much assets and dependencies as you need.



### 1. Installing the addon itself

With npm:

    ember install ember-emojione
    
With Yarn:

    yarn add -D ember-emojione



### 2. Installing the EmojiOne library

If you choose to use individual images (i. e. no sprite sheet) AND you want to bundle individual emoji images into your app distro (i. e. no separate CDN), you'll need to install the full `emojione` package (option 2).

In any other case, it is recommended that you install only the files you need (option 1).



#### Option 1: including only the necessary assets (recommended)

The bare minimum you need to display emoji are just two files: JS and CSS. To use this addon's components, you'll also need the JSON file with emoji definitions.

Luckily, Bower allows downloading individual files as individual dependencies:

First, include the EmojiOne JS library (note that the package name is `emojione-js` and not simply `emojione`):

    bower install -S emojione-js=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/lib/js/emojione.js

Then include the CSS. Here you have two options.

Normal CSS, works with individual PNGs, individual SVGs and SVG sprite sheet:

    bower install -S emojione-css=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/css/emojione.css
 
 Or, if you want to use PNG sprite sheet, add this CSS instead:
 
    bower install -S emojione-css=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.css

If you're gonna use the components, you'll also need emoji definitions. Definitions add 438 KiB to your distro size (54 KiB gzipped).

    bower install -S emojione-defs=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/emoji.json

If you chose to use a sprite sheet, you must install it locally, because **EmojiOne sprite sheets aren't available on JSDelivr** (as of January 2017). Skip this step if you're gonna serve the sprite sheet from your own CDN, separate from you app distro.

PNG sprite sheet:

    bower install -S emojione-png=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.png

SVG sprite sheet:

    bower install -S emojione-svg=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.svg



#### Option 2: including the whole emojione package

Including the whole package, which is over 90 MiB large, is only reasonable if you want to use individual images rather than sprite sheets AND you want to serve them locally rather than via the free CDN.

Simply install it via:

    bower install -S emojione/emojione#v2.2.7

Note: your app's distro size will *not* grow by 90 MiB. In the next installation step, you'll decide which assets to include into the distro.

But every clean `bower install` will be substantially slower. This may include your CI builds.



### 3. Asset configuration in ember-cli-build.js to tell the addon about the choices you made above

Values shown below are the defaults. If you're happy with them, you don't need to edit `ember-cli-build.js` at all.

```js
  var app = new EmberApp(defaults, {
    'ember-emojione': {
      // Did you install individual files or the full package?
      separatePackages: true,
  
      // Do you want EmojiOne CSS to be included in your app?
      shouldImportCss: true,
      
      // Are you going to use components that insert emoji?
      shouldImportDefs: true,
      
      // Whether to use a sprite sheet or individual images
      spriteSheet: true,
  
      // Enable one of these options if you want to include
      // EmojiOne assets into your app's distro. 
      shouldIncludePngSprite: true,
      shouldIncludeSvgSprite: false,
      shouldIncludePngImages: false,
      shouldIncludeSvgImages: false,
  
      // If you chose individual images in the previous section,
      // you can customize their size and color here.
      // 'png' and 'png_bw' assets come in 64×64 px size.
      pngImagesKind: 'png', // png, png_128x128, png_512x512, png_bw
      svgImagesKind: 'svg', // svg, svg_bw
  
      // You can also customize package names to import.
      // You don't need to edit this if you carefully followed
      // previous installation steps
      packageNameMain:        'emojione',
      packageNameJs:          'emojione-js',
      packageNameCss:         'emojione-css',
      packageNameDefs:        'emojione-defs',
      packageNamePngSprite:   'emojione-png',
      packageNameSvgSprite:   'emojione-svg',
      
      // Whether to keep or remove `ember-emojione` components from build
      shouldIncludeComponents: true,
    },
  });
```

Note: if you set `shouldIncludeComponents` to `false`, you will not be able to define the following modules in your app:

* `app/components/emoji-picker`
* `app/components/emoji-picker/*`
* `app/components/emoji-picker-wrapper`
* `app/components/emoji-picker-toggler`
* `app/components/emoji-typing-assistance`
* `app/helpers/eeo-*`



### Including component styles

Skip this section if you're not using this addon's components.

If your app uses `ember-cli-sass`, add some of these to your Sass:

```scss
@import "node_modules/ember-emojione/app/styles/helpers/mixin";
@import "node_modules/ember-emojione/app/styles/components/emoji-assist";
@import "node_modules/ember-emojione/app/styles/components/emoji-picker";
```

If your app doesn't use `ember-cli-sass`, precompiled styles will be included automatically.



## Runtime Configuration in config/environment.js

Configuration is optional. If you're happy with defaults shown below, you don't need to edit `config/environment.js`.

`ember-emojione` relies on [emojione.js defaults](https://github.com/Ranks/emojione/blob/v2.2.7/lib/js/emojione.js#L150-L157).

To configure `ember-emojione` and override `emojione` options, add these options to your app's `config/environment.js`. Default values are shown:

```js
"ember-emojione": {

  // Used to skip certain portions of the input string.
  // Useful for Markdown code blocks. Apply after Markdown transformation.
  // Set to `false` to disable.
  regexToSkip: /<code[\s\S]*?>[\s\S]*?<\/code>/gm,
  
  // EmojiOne library options
  emojione: {
    imageType:     'png', // or svg
    imageTitleTag: true,  // set to false to remove title attribute from img tag
    unicodeAlt:    true,  // use the unicode char as the alt attribute (makes copy and pasting the resulting text better)
    ascii:         false, // change to true to convert ascii smileys
    
    // The following options are inferred from `ember-cli-build.js`.
    // You only need to override these options if you want to serve
    // assets from a custom CDN separate from you app's distro.
    imagePathPNG:        'https://cdn.jsdelivr.net/emojione/assets/png/',
    imagePathSVG:        'https://cdn.jsdelivr.net/emojione/assets/svg/',
    imagePathSVGSprites: './../assets/sprites/emojione.sprites.svg',
  }
}
```

Things to note:

* The `sprites` option can not be configured from here. To enable `sprites`, override the `spriteSheet` option in  `ember-cli-build.js`. It is also possible to override the `sprites` when invoking the `inject-emoji` helper.

* The path to PNG sprite sheet is configured via CSS. If you're serving it from a custom CDN, add this style into your app:

    ```css
    .emojione {
      background-image: url('path/to/your/emojione.sprites.png');
    }
    ```
    
* If you chose to include local SVG assets, default SVG paths will use root-relative urls, e. g. `/ember-emojione/svg/1f631.svg`. If you serve your app from a subdirectory, please override one of the SVG URL options to include the subdirectory. You don't need this if you serve SVG assets from a CDN (default).



## Usage

### inject-emoji helper

This helper is used to convert a string with emoji codes into a string of HTML with emoji images.

You must manually mark the input string as HTML-safe:

```js
Ember.String.htmlSafe("Hi! :sunglasses:")
```

By doing so you acknowledge responsibility that the input string never contains malicious code. Neglecting this responsibility will make your app/website prone to XSS attacks.

Use triple curlies to inject HTML into your template:

```handlebars
<div>
  {{{inject-emoji inputStr}}}
</div>
```

Result:

```handlebars
<div>
  Hi! <img class="emojione" alt="😎" title=":sunglasses:" src="https://cdn.jsdelivr.net/emojione/assets/png/1f60e.png?v=2.2.7"/>
</div>
```



#### Overriding options

You can override `ember-emojione` and `emojione.js` options for a single invocation of `inject-emoji`:

```hbs
<div>
  {{{inject-emoji inputStr (hash
    regexToSkip = false
    emojione = (hash
      imageType = 'svg'
      sprites   = true
    )
  )}}}
</div>
```



#### Customizing emoji size via CSS

If you use individual PNGs, individual SVGs or SVG sprites, customizing emoji size is quite easy: you simply apply `width` and `height` to the `.emojione` selector.

But for PNG sprites (default), that won't work.

The easiest solution for PNG sprites is to use the `zoom` CSS property, but it doesn't work in Firefox.

For a [cross-browser](http://caniuse.com/#feat=transforms2d) solution, use the code below. It is a Sass mixin; if you're not using Sass, you can compile it on [SassMeister](http://www.sassmeister.com/gist/693e21a1d198033836f64c3997b5c54e). The trick is to scale the emoji via CSS transform, then apply negative margins to remove extra whitespace.

```scss
@mixin emojione-size ($target-size, $original-size: 64px) {
  transform: scale(#{$target-size / $original-size});
  margin: ($target-size - $original-size) / 2;
}

.emojione {
  @include emojione-size(20px);
}
```

:warning: Warning: this trick may produce blurry sprites in certain situations. It also causes text selection to look taller than it should:

![tall text selection problem](https://i.stack.imgur.com/SyL0l.png)

If this is unacceptable for you, use custom-sized PNG spritesheets. Official EmojiOne spritesheets have an unfortunate 1px padding between sprites, making it impossible to resize it with `background-size`.

To resolve this problem, whe have prepared cusrom PNG spritesheets tailored to various sizes: [emojione-png-sprites](https://github.com/Deveo/emojione-png-sprites).

Here's a [StackOverflow post](http://stackoverflow.com/questions/42558306/how-do-i-use-ember-emojione-with-emojione-png-sprites) explaining in detail how to use `ember-emojione` with `emojione-png-sprites`.



#### Using from JS

You can inject emoji programmatically via the `injectEmoji` convenience function:

```js
import {injectEmoji} from 'ember-emojione/helpers/inject-emoji';

injectEmoji(inputString, options);
```

It returns an html-safe string if the input was html-safe. Otherwise, it returns a regular string.

```js
import {htmlSafe, isHTMLSafe} from '@ember/string';
import {injectEmoji} from 'ember-emojione/helpers/inject-emoji';

const options = {regexToSkip: false, emojiOne: {ascii: true}};



const inputUnsafeString  = ':D';
const resultUnsafeString = injectEmoji(inputUnsafeString, options);

isHTMLSafe(resultUnsafeString) // => false
typeof resultUnsafeString;     // => "string"



const inputSafeString  = htmlSafe(inputUnsafeString);
const resultSafeString = injectEmoji(inputSafeString, options);

isHTMLSafe(resultSafeString);       // => true
typeof resultSafeString;            // => "object"
typeof resultSafeString.toString(); // => "string"
```



#### Skipping code blocks

`inject-emoji` will ignore emoji located within portions of the input string that match given regular expression.

The regex can be configured via the `regexToSkip` option.

By default, the regex matches `<code>...</code>` elements.

To disable skipping, set `regexToSkip` to `false`.



### emoji-picker-wrapper component

`emoji-picker-wrapper` abstracts the logic of:

* showing/hiding the `emoji-picker` and `emoji-typing-assistance` popups;
* positioning the `emoji-typing-assistance` popup next to the caret;
* inserting emoji into the text field, taking into consideration caret position;
* navigating the `emoji-typing-assistance` popup with the keyboard while staying focused on the text field...

...**while making no assumptions about page layout and looks, giving you full control**.



#### emoji-picker-wrapper usage example

The price of giving you full control of layout and looks is pretty elaborate usage.

Here's the full example. Below it's broken down into steps.

```js
{
  wikiPageText: 'This is a sample wiki page',
}
```

```handlebars
{{#emoji-picker-wrapper
  text                = wikiPageText
  inputSelector       = ".my-input"
  emojiInsertedAction = (action (mut wikiPageText))
  as |h|
}}
  
  <span style="position: relative; display: inline-block;">
    {{textarea class="my-input" value=wikiPageText}}
    {{component h.emojiAssist}}
  </span>
  
  {{component h.emojiPickerToggler}}
  
  {{component h.emojiPicker}}
  
{{/emoji-picker-wrapper}}
```


#### emoji-picker-wrapper usage example breakdown

To understand the example, let's assemble it step by step.

1. We start with a text field, either an `input` or `textarea`. This text field accepts a value with a text from the `wikiPageText` property:

    ```js
    {
      wikiPageText: 'This is a sample wiki page',
    }
    ```

    ```handlebars
    {{textarea class="my-input" value=wikiPageText}}
    ```

2. In your HTML structure, decide where you're gonna put the emoji picker popup and the button that toggles the emoji picker.

    The locations depend on your HTML layout and page design. In this example, we're gonna keep it simple:

    ```handlebars
    {{textarea class="my-input" value=wikiPageText}}
    
    <!-- emoji picker popup is gonna be located here -->
    
    <!-- the button-that-toggles-the-popup is gonna be located here -->
    ```

3. Wrap the text field with an HTML element that has `position: relative` and `display` of either `block` or `inline-block`:

    ```handlebars
    <span style="position: relative; display: inline-block;">
      {{textarea class="my-input" value=wikiPageText}}
    </span>
    
    <!-- emoji picker popup is gonna be located here -->
    
    <!-- the button-that-toggles-the-popup is gonna be located here -->
    ```
    
    In this example the HTML element uses inline styles for simplicity, but that's not a requirement.

4. The emoji typing assistance popup should be located next to the textarea, within that element with `position: relative`: 

    ```handlebars
    <span style="position: relative; display: inline-block;">
      {{textarea class="my-input" value=wikiPageText}}
      <!-- emoji typing assistance popup is gonna be located here -->
    </span>
    
    <!-- emoji picker popup is gonna be located here -->
    
    <!-- the button-that-toggles-the-popup is gonna be located here -->
    ```

5. Wrap the three items with the `emoji-picker-wrapper` component:

    ```handlebars
    {{#emoji-picker-wrapper}}
      <span style="position: relative; display: inline-block;">
        {{textarea class="my-input" value=wikiPageText}}
        <!-- emoji typing assistance popup is gonna be located here -->
      </span>
      
      <!-- emoji picker popup is gonna be located here -->
      
      <!-- the button-that-toggles-the-popup is gonna be located here -->
    {{/emoji-picker-wrapper}}
    ```
    
    It should serve as a common parent for everything that we set up earlier.

6. Pass the following arguments into the wrapper component:

    * `text`: the same bound property as you pass into the text field;
    * `inputSelector`: a CSS selector that uniquely identifies the text field within the wrapper;

    ```handlebars
    {{#emoji-picker-wrapper
      text                = wikiPageText
      inputSelector       = ".my-input"
    }}
      <span style="position: relative; display: inline-block;">
        {{textarea class="my-input" value=wikiPageText}}
        <!-- emoji typing assistance popup is gonna be located here -->
      </span>
      
      <!-- emoji picker popup is gonna be located here -->
      
      <!-- the button-that-toggles-the-popup is gonna be located here -->
    {{/emoji-picker-wrapper}}
    ```

7. Implement the `emojiInsertedAction` action and pass it into the wrapper component.
    
    The action receives the text updated with emoji inserted. It must update the value that you pass into both the text field and the wrapper.
    
    The action could look like this:
    
    ```js
    actions: {
      emojiInserted(text) {
        this.setProperties({text});
      }
    }
    ```

    But the simplest way of implementing the action is the `mut` helper, which lets you avoid adding the above action code to your controller/component.

    ```handlebars
    {{#emoji-picker-wrapper
      text                = wikiPageText
      inputSelector       = ".my-input"
      emojiInsertedAction = (action (mut wikiPageText))
    }}
      <span style="position: relative; display: inline-block;">
        {{textarea class="my-input" value=wikiPageText}}
        <!-- emoji typing assistance popup is gonna be located here -->
      </span>
      
      <!-- emoji picker popup is gonna be located here -->
      
      <!-- the button-that-toggles-the-popup is gonna be located here -->
    {{/emoji-picker-wrapper}}
    ```
    
8. The wrapper component will create instances of the three child components: `emojiPicker`, `emojiPickerToggler` and `emojiAssist`.

    These instances come preconfigured to work together, saving you a ton of boilerplate code.
    
    Receive them from the wrapper component and insert into dedicated places:
    
    ```handlebars
    {{#emoji-picker-wrapper
      text                = wikiPageText
      inputSelector       = ".my-input"
      emojiInsertedAction = (action (mut wikiPageText))
      as |h|
    }}
      <span style="position: relative; display: inline-block;">
        {{textarea class="my-input" value=wikiPageText}}
        {{component h.emojiAssist}}
      </span>
      
      {{component h.emojiPicker}}
      
      {{component h.emojiPickerToggler}}
    {{/emoji-picker-wrapper}}
    ```
    
    You can customize them if you want. Read each component's documentation below to see how you can customize them.
    
That's it!

Here's a list of options that are preconfigured for the components. Make sure not to override them:

* `emoji-picker`
    * `selectAction`
    * `closeAction`
    * `isVisible`

* `emoji-picker-toggler`
    * `toggleAction`
    * `isEmojiPickerVisible`

* `emoji-typing-assistance`
    * `filterInput`
    * `$input`
    * `keyPressNotifier`
    * `selectAction`



#### emoji-picker-wrapper options

| Option                  | Type    | Default value            | Description                                                                                                                      |
|:------------------------|:--------|:-------------------------|:---------------------------------------------------------------------------------------------------------------------------------|
| `inputSelector`         | String  | required                 | Unique selector of a text field where emoji will be inserted.                                                                    |
| `text`                  | String  | required                 | Content of the text field. Emoji code will be inserted into this text.                                                           |
| `emojiInsertedAction`   | Action  | required                 | Action to execute when emoji is inserted. Will be called with new text already containing an emoji code.                         |
| `shouldSetFocusToInput` | Boolean | `true`                   | Whether to focus on the input field after emoji insertion or closing the picker with Esc.                                        |
| `isEmojiPickerVisible`  | Boolean | `false`                  | Lets you control picker visibility manually. Don't override this if you're using `emojiPickerToggler` which controls it for you. |
| `emojiTypingRegex`      | RegExp  | `/(?:^|\s)(:[\w_+-]+)$/` | Regular expression to detect a fragment of emoji code typed into a text field. Must end with `$`. Must not be `g`lobal. The `(?:^|\s)` fragment of the regex requires the emoji code to either be prepended by whitespace or appear in the start of the line. Remove this fragment if you want the typing assistance popup to appear when the user types `foo:ba`, for example. |



#### emoji-picker-wrapper yielded values

`emoji-picker-wrapper` yields a hash that contains the following properties:

| Option                 | Type      | Description                                        |
|:-----------------------|:----------|:---------------------------------------------------|
| `emojiPicker`          | Component | Preconfigured `emoji-picker` component.            |
| `emojiPickerToggler`   | Component | Preconfigured `emoji-picker-toggler` component.    |
| `emojiAssist`          | Component | Preconfigured `emoji-typing assistance` component. |
| `isEmojiPickerVisible` | Boolean   | Whether emoji picker is visible.                   |



### emoji-picker component

This component is used to select emoji from a list. Designed as a popup.

Render it like this:

```handlebars
{{#if isPickerVisible}}
  {{emoji-picker
    selectAction = (action 'selectEmoji')
  }}
{{/if}}
```



#### emoji-picker options

The following options are preconfigured by the wrapper component. Override them only if you're using `emoji-picker` manually, without the wrapper:

| Option         | Type    | Default value | Description                                                                 |
|:---------------|:--------|:--------------|:----------------------------------------------------------------------------|
| `selectAction` | Action  | required      | Action to execute when an emoji is clicked                                  |
| `closeAction`  | Action  | `undefined`   | Action to execute on click outside of the component                         |
| `isVisible`    | Boolean | `false`       | Controls component visibility with `display: none` (from `Ember.Component`) |


These are the options that you can configure regardless of whether you're using the wrapper.

| Option                | Type    | Default value      | Description                                                   |
|:----------------------|:--------|:-------------------|:--------------------------------------------------------------|
| `toneSelectAction`    | Action  | `undefined`        | Action to execute when skin tone is changed                   |
| `shouldCloseOnSelect` | Boolean | `false`            | Whether to execute the close action when an emoji is selected |
| `disableAutoFocus`    | Boolean | `false`            | Prevents from focusing on component when first rendered       |
| `textNoEmojiFound`    | String  | `"No emoji found"` | Override for i18n                                             |
| `textSearch`          | String  | `"Search"`         | Override for i18n                                             |
| `textClearSearch`     | String  | `"Clear search"`   | Override for i18n                                             |



### emoji-picker-toggler component

This component isn't supposed to be used separately. It's yielded by the `emoji-picker-wrapper` component and is used to control emoji picker visibility.

This component has no styles, you'll have to style it yourself.

Can be used in inline and block form.



#### emoji-picker-toggler options

Options preconfigured by the wrapper are not listed.

| Option              | Type                  | Default value | Description                                                                                                                          |
|:--------------------|:----------------------|:--------------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `label`             | String or undefined   | `undefined`   | If block is not provided, will be used for button content.                                                                           |
| `labelWhenOpen`     | String or undefined   | `undefined`   | If block is not provided, will be used for button content when the picker is visible. If not provided, `label` will be used instead. |
| any other attribute | String or `undefined` | `undefined`   | Any other attributes will be bound to HTML attributes of the component.                                                              |




### emoji-typing-assistance component

This component isn't supposed to be used separately. It's yielded by the `emoji-picker-wrapper` component and is used to control emoji picker visibility.

It shows suggestions when user types in an emoji code, letting them insert the emoji quicker.



#### emoji-typing-assistance options

Options preconfigured by the wrapper are not listed.

| Option      | Type    | Default value | Description                                                                                         |
|:------------|:--------|:--------------|:----------------------------------------------------------------------------------------------------|
| `minLength` | Integer | `3`           | Minimum length of the emoji code fragment for the component to appear, including the leading colon. |



### Using the emojione JS library directly

The `emojione` library makes itself available as a global.

To help you stay true to the Ember way, this addon lets you import the library as a ES module:

```js
import emojione from 'emojione';
```



### Using emojione-png-sprites tailored spritesheets

The hack we 



### I18n

The addon itself does not integrate with any i18n solution.

Components accept i18n strings as arguments. You can subclass components to change defaults.

In order to translate emoji descriptions (visibile on some emoji on hover), you'll have to override the `emojiDefs` property on the `emoji` service.



## Upgrading from older versions

Some major version bumps introduce breaking changes. Read below what you need to change in your app in order to upgrade `ember-emojione`.

### 1.x → 2.x

`emoji-picker-wrapper` used to yield three components separately:

```handlebars
{{#emoji-picker-wrapper
  as |emojiAssist emojiPickerToggler emojiPicker|
}}
  {{component emojiAssist}}
  {{component emojiPickerToggler}}
  {{component emojiPicker}}
{{/emoji-picker-wrapper}}
```

In 2.0.0+, it yields a hash that contains the components:


```handlebars
{{#emoji-picker-wrapper
  as |h|
}}
  {{component h.emojiAssist}}
  {{component h.emojiPickerToggler}}
  {{component h.emojiPicker}}
{{/emoji-picker-wrapper}}
```



### 2.x → 3.x

No changes required.



## Development

### Installation

* `npm i -g yarn`
* `git clone <repository-url>` this repository
* `cd ember-emojione`
* `yarn install` :warning:
* `bower install`



### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).



### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`



### Do not use npm or ember install, use yarn

This project uses [Yarn](https://yarnpkg.com/) to lock dependencies. Install yarn with `npm i -g yarn`.

To install this addon's npm dependencies locally, do:

    yarn install

To install an Ember addon into this addon, do:

    yarn add -D <package-name>
    ember g <package-name>

An error message "no such blueprint" is expected in case the addon does not want to do boilerplate customizations.

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).



### Branch names

Main branches are named as `gen-1`, `gen-2`, etc. Default branch on GitHub is where active development happens.

This naming scheme is due to the fact that this project uses SemVer. As a result, major version number will rise very quickly, without any correlation with actual major changes in the app.

The number in the branch name, "generation", is supposed to be incremented in these cases:
* A huge improvement or change happens in the addon.
* There's a change in the addon's API or architecture which introduces a necessity to maintain more than one branch at a time.
* The codebase is started from scratch.

Pull requests are welcome from feature branches. Make sure to discus proposed changes with addon maintainers to avoid wasted effort.



### Updating the table of contents

Maintaining the TOC by hand is extremely tedious. Use [this tiny webapp](https://lolmaus.github.io/tocdown/) to generate the TOC automatically. Enable the first two checkboxes there.



### Demo deployment

This command will deploy the app to https://deveo.github.io/ember-emojione/ :

    ember deploy prod



## Credits

Proudly built in [@Deveo](https://github.com/Deveo) by [@lolmaus](https://github.com/lolmaus), [@vvainio](https://github.com/vvainio) and [contributors](https://github.com/Deveo/ember-emojione/graphs/contributors).

https://deveo.com

This addon includes fragments of code borrowed from:
 * the [crhayes/ember-cli-emojione](https://github.com/crhayes/ember-cli-emojione) addon (MIT license),
 * the [cibernox/ember-power-select](https://github.com/cibernox/ember-power-select) addon (MIT license),
 * the [DockYard/ember-one-way-controls](https://github.com/DockYard/ember-one-way-controls) addon (MIT license),
 * [Elad Shahar](https://github.com/SaladFork)'s [template string CP gist](https://gist.github.com/saladfork/178b2408d025d7c0d2acaddf22bbe8bb) (MIT license).



## License

[MIT](https://github.com/Deveo/ember-emojione/blob/gen-1/LICENSE.md).
