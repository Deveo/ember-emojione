# ember-emojione

[![Travis build status](https://img.shields.io/travis/Deveo/ember-emojione.svg)](https://travis-ci.org/Deveo/ember-emojione)
[![Ember Observer Score](http://emberobserver.com/badges/ember-emojione.svg)](http://emberobserver.com/addons/ember-emojione)
[![npm package version](https://img.shields.io/npm/v/ember-emojione.svg)](https://www.npmjs.com/package/ember-emojione)
[![license MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/Deveo/ember-emojione/blob/gen-1/LICENSE.md)
![ember-versions 1.13+](https://img.shields.io/badge/ember--versions-1.13%2B-yellowgreen.svg?bump)
![ember-cli 2.11.0](https://img.shields.io/badge/uses%20ember--cli-2.11.0-blue.svg?bump)

`ember-emojione` is your emoji solution for Ember, based on the [EmojiOne](http://emojione.com/) project.

Currently a work in progress, here's what it's gonna offer:

* [x] Versatile configuration of which assets to include.
* [x] `inject-emoji` helper to hydrate a string containing emoji codes with emoji HTML tags ([#13](https://github.com/Deveo/ember-emojione/issues/13))
* [x] `emoji-picker` component to select/insert emoji ([#17](https://github.com/Deveo/ember-emojione/issues/17))
* [ ] Components to help you insert emoji while typing ([#26](https://github.com/Deveo/ember-emojione/issues/26))

Demo: https://deveo.github.io/ember-emojione/ :sparkles:



## Table of contents

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
    * [emoji-picker component](#emoji-picker-component)
        * [Options](#options)
        * [Inserting emoji into an input](#inserting-emoji-into-an-input)
    * [Using the emojione JS library directly](#using-the-emojione-js-library-directly)
    * [I18n](#i18n)
* [Development](#development)
    * [Installation](#installation)
    * [Running](#running)
    * [Running Tests](#running-tests)
    * [Do not use npm or ember install, use yarn](#do-not-use-npm-or-ember-install-use-yarn)
    * [Branch names](#branch-names)
    * [Demo deployment](#demo-deployment)
* [Credits](#credits)
* [License](#license)



## Quick installation

If you don't want to go into the nuances of installation and configuration, use these short installation instructions. Then you can skip to the Usage section.

Quick installation will use these defaults:

* Emoji are rendered as PNG sprites.
* Sprite size is 64×64 px.
* The sprite sheet is included into your app's distro (it's not available on JSDelivr).
* Emoji picker and typing assistance components are available.

Run these console commands in your app:

    ember install ember-emojione
    bower install -S emojione-js=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/lib/js/emojione.js
    bower install -S emojione-css=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.css
    bower install -S emojione-defs=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/emoji.json
    bower install -S emojione-png=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.png

You should be good to go. If your development server has been running, don't forget to restart it.



## Detailed Installation

The `emojione` Bower package, which this addon relies on, is over 90 MiB large. As EmojiOne assets can be served from the "free and super-fast" [JSDelivr](http://jsdelivr.com) CDN, many developers don't need any EmojiOne images locally.

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
 
 Or, if you want to use PNG sprite sheet, add this CSS:
 
    bower install -S emojione-css=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.css

If you're gonna use the components, you'll also need emoji definitions. Definitions add 438 KiB to your distro size (54 KiB gzipped).

    bower install -S emojione-defs=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/emoji.json

If you chose to use a sprite sheet, you must install it locally, because **EmojiOne sprite sheets aren't available on JSDelivr**. Skip this step if you're gonna serve the sprite sheet from your own CDN, separate from you app distro.

PNG sprite sheet:

    bower install -S emojione-png=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.png

SVG sprite sheet:

    bower install -S emojione-svg=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.svg



#### Option 2: including the whole emojione package

Including the whole package, which is over 90 MiB large, is only reasonable if you want to use individual images rather than sprite sheets AND you want to serve them locally rather than via the free CDN.

Simply install it via:

    bower install -S emojione

Note: your app's distro size will not grow by 90 MiB. In the next installation step, you'll decide what assets to include into the distro.

But every clean `bower install` will likely be substantially slower, including your CI builds.



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
    },
  });
```


### Including component styles

Skip this section if you're not using this addon's components.

Until [#38](https://github.com/Deveo/ember-emojione/issues/38) is implemented, this addon requires [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass) to be installed in your app.

Import the addon's own stylesheet into your Sass:

```scss
@import 'ember-emojione';
```


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

* The `sprites` option can not be configured from here. To enable `sprites`, override the `spriteSheet` optionin  `ember-cli-build.js`. It is possible to override the `sprites` when invoking the `inject-emoji` helper.

* The path to PNG sprite sheet is configured via CSS. If you're serving it from a custom CDN, add this style into your app:

    ```css
    .emojione {
      background-image: url('path/to/your/emojione.sprites.png');
    }
    ```
    
* If you chose to include local SVG assets, default SVG paths will use root-relative urls, e. g. `/ember-emojione/svg/1f631.svg`. If you server your app from a subdirectory, please override one of the SVG URL options to include the subdirectory. You don't need this if you serve SVG assets from a CDN (default).



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

But for PNG sprites, that won't work.

The easiest solution for PNG sprites is to use the `zoom` CSS property, but it doesn't work in Firefox.

For a [cross-browser](http://caniuse.com/#feat=transforms2d) solution, use the code below. It is a Sass mixin; if you're not using Sass, please infer how it works. The trick is to scale the emoji via CSS transform, then apply negative margins to remove extra whitespace.

```scss
@mixin emojione-size ($target-size, $original-size: 64px) {
  transform: scale(#{$target-size / $original-size});
  margin: ($target-size - $original-size) / 2;
}

.emojione {
  @include emojione-size(20px);
}

```



#### Using from JS

You can inject emoji programmatically via the `injectEmoji` convenience function:

```js
import {injectEmoji} from 'ember-emojione/helpers/inject-emoji';

injectEmoji(inputString, options);
```

It returns an html-safe string if the input was html-safe. Otherwise, it returns a regular string.

```js
import {htmlSafe} from 'ember-string';
import isHTMLSafe from 'ember-string-ishtmlsafe-polyfill';
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



### emoji-picker component

This component is used to select emoji from a list.

Render it like this:

```handlebars
{{#if isPickerVisible}}
  {{emoji-picker
    selectAction = (action 'selectEmoji')
  }}
{{/if}}
```



#### Options

| Option                | Type    | Default value       | Description                                                   |
|:----------------------|:--------|:--------------------|:--------------------------------------------------------------|
| `selectAction`        | action  | mandatory           | Action to execute when an emoji is clicked                    |
| `toneSelectAction`    | action  | `undefined`         | Action to execute when skin tone is changed                   |
| `closeAction`         | action  | `undefined`         | Action to execute on click outside of the component           |
| `shouldCloseOnSelect` | Boolean | `false`             | Whether to execute the close action when an emoji is selected |
| `disableAutoFocus`    | Boolean | `false`             | Prevents from focusing on component when first rendered       |
| `textNoEmojiFound`    | String  | `"No emoji found"`  | Override for i18n                                             |
| `textSearch`          | String  | `"Search"`          | Override for i18n                                             |
| `textClearSearch`     | String  | `"Clear search"`    | Override for i18n                                             |



#### Inserting emoji into an input

Most likely, you want to insert an emoji into caret position/replace a selection.

You can use this snippet in parent component:

```js
import get from 'ember-metal/get';
import {next} from 'ember-runloop';

{
  text: '', // where the text is stored

  $textArea: computed(function () {
    return this.$("textarea");
  }),

  actions: {
    selectEmoji(emojo) {
      const text             = this.get("text") || "";
      const $textArea        = this.get("$textArea");
      const selectionStart   = $textArea.prop("selectionStart");
      const selectionEnd     = $textArea.prop("selectionEnd");
      const before           = text.slice(0, selectionStart);
      const after            = text.slice(selectionEnd);
      const emojiCode        = get(emojo, "shortname");
      const result           = before + emojiCode + after;
      const newCaretPosition = before.length + emojiCode.length;

      this.set("text", result);
      next(() => $textArea.prop("selectionEnd", newCaretPosition));
    }
  }
}
```



### Using the emojione JS library directly

The `emojione` library makes itself available as a global.

To help you stay true to the Ember way, this addon lets you import the library as a ES module:

```js
import emojione from 'emojione';
```



### I18n

The addon itself does not integrate with any i18n solution.

Components accept i18n strings as arguments. You can subclass components to change defaults.

In order to translate emoji descriptions (visibile on some emoji on hover), you'll have to override the `emojiDefs` property on the `emoji` service.



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



### Demo deployment

This command will deploy the app to https://deveo.github.io/ember-emojione/ :

    ember deploy prod



## Credits

Proudly built in [@Deveo](https://github.com/Deveo) by [@lolmaus](https://github.com/lolmaus) and [contributors](https://github.com/Deveo/ember-emojione/graphs/contributors).

https://deveo.com.

This addon includes fragments of code borrowed from:
 * the [crhayes/ember-cli-emojione](https://github.com/crhayes/ember-cli-emojione) addon (MIT license),
 * [Elad Shahar](https://github.com/SaladFork)'s [template string CP gist](https://gist.github.com/saladfork/178b2408d025d7c0d2acaddf22bbe8bb) (MIT license).



## License

[MIT](https://github.com/Deveo/ember-emojione/blob/gen-1/LICENSE.md).
