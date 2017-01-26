# ember-emojione

[![Travis build status](https://img.shields.io/travis/Deveo/ember-emojione.svg)](https://travis-ci.org/Deveo/ember-emojione)
[![Ember Observer Score](http://emberobserver.com/badges/ember-emojione.svg)](http://emberobserver.com/addons/ember-emojione)
[![npm package version](https://img.shields.io/npm/v/ember-emojione.svg)](https://www.npmjs.com/package/ember-emojione)
[![license MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/Deveo/ember-emojione/blob/gen-1/LICENSE.md)
![ember-versions 1.13+](https://img.shields.io/badge/ember--versions-1.13%2B-yellowgreen.svg?bump)
![ember-cli 2.11.0](https://img.shields.io/badge/uses%20ember--cli-2.11.0-blue.svg?bump)

`ember-emojione` is your emoji solution for Ember, based on the [EmojiOne](http://emojione.com/) project.

Currently a work in progress, here's what it's gonna offer:

* [x] `inject-emoji` helper to hydrate a string containing emoji codes with emoji HTML tags ([#13](https://github.com/Deveo/ember-emojione/issues/13))
* [ ] `emoji-picker` component to select/insert emoji ([#17](https://github.com/Deveo/ember-emojione/issues/17))
* [ ] Components to help you insert emoji while typing ([#26](https://github.com/Deveo/ember-emojione/issues/26))

Demo: https://deveo.github.io/ember-emojione/ :sparkles:
 



## Comparison to ember-cli-emojione

`ember-cli-emojione` is an addon that wraps the `emojione` Bower package into an ES module. The `emojione` global is still available.

The `emojione` Bower package is over 90 MiB large, making installation and CI builds substantially slower. If you're serving your emoji from the free JSDelivr CDN or your own hosting, `emojione` assets aren't needed in the Ember app.

This addon, `ember-emojione`, imports only the `emojione.js` library (~50 KiB large gzipped).

If you want, you can manually import EmojiOne CSS and sprite files, or even the whole `emojione` Bower package. Please see below how to do that.

For the simplicity of importing manually, `ember-emojione` does not offer an ES module. If you need low-level access to the EmojiOne JS library, please use the `emojione` global var.



## Installation

With npm:

    ember install ember-emojione
    
With Yarn:

    yarn add -D ember-emojione

As of [#24](https://github.com/Deveo/ember-emojione/issues/24), the default blueprint (`ember g ember-emojione`) won't install the Bower dependency for some reason. You have to install it manually:

    bower install -S emojione-js=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/lib/js/emojione.js

This addon does not include EmojiOne CSS styles: [normal version](https://github.com/Ranks/emojione/blob/master/assets/css/emojione.css) or [PNG sprite version](https://github.com/Ranks/emojione/blob/master/assets/sprites/emojione.sprites.css). Please include them manually into your project, making necessary adjustments.

Note that you can choose to import the whole `emojione` Bower package with all the assets. This way you can import the CSS file from `bower_components/` rather than checking it into your repo. Read below, how to do that. Unfortunately the `emojione` Bower package is over 90 MiB large, so it's a tough choice.



## Configuration

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
    imagePathPNG:        'https://cdn.jsdelivr.net/emojione/assets/png/',
    imagePathSVG:        'https://cdn.jsdelivr.net/emojione/assets/svg/',
    imagePathSVGSprites: './../assets/sprites/emojione.sprites.svg',
    imageType:           'png', // or svg
    imageTitleTag:       true,  //set to false to remove title attribute from img tag
    sprites:             false, // if this is true then sprite markup will be used (if SVG image type is set then you must include the SVG sprite file locally)
    unicodeAlt:          true,  // use the unicode char as the alt attribute (makes copy and pasting the resulting text better)
    ascii:               false, // change to true to convert ascii smileys
  }
}
```

Configuration is optional.

Note: the path PNG sprite file is configured elsewhere. If you need to customize it, override the background image:

```css
.emojione {
  background-image: url('path/to/your/emojione.sprites.png');
}
```



## Usage

### `inject-emoji` helper

This helper is used to convert a string with emoji codes into a string of HTML with emoji images.

You must manually mark the input string as HTML-safe:

```js
{
  inputStr: Ember.String.htmlSafe("Hi! :sunglasses:")
}
```

By doing so you acknowledge responsibility that the input string will never contain malicious code. Neglecting this responsibility will make your app/website prone to XSS attacks.

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



### Overriding options

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



### Use from JS

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



### Skipping code blocks

`inject-emoji` will ignore emoji located within portions of the input string that match given regular expression.

The regex can be configured via the `regexToSkip` option.

By default, the regex matches `<code>...</code>` elements.

To disable skipping, set `regexToSkip` to `false`.



## Importing `emojione` CSS and JS assets

For quicker installation and CI builds, this addon only imports EmojiOne's [js file](https://github.com/Ranks/emojione/blob/master/lib/js/emojione.js) directly.

By default, EmojiOne assets are served from the "free and super-fast" [JSDelivr](http://jsdelivr.com) CDN, so no EmojiOne images have to be downloaded into your project.

If you want to add a sprite sheet as a local asset, it is recommended to include SVG or CSS and PNG files as individual packages:

    bower i -S emojione-css=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.css
    bower i -S emojione-png=https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/assets/sprites/emojione.sprites.png

Then you can import them from your `ember-cli-build.js` file:

```js
var Funnel = require("broccoli-funnel");

module.exports = function (defaults) {
  /* ... */
  
  app.import(app.bowerDirectory + "/emojione-css/index.css");
  
  var emojiOneSprite = new Funnel(app.bowerDirectory, {
      srcDir: "emojione-png",
      destDir: "assets",
      include: ['*.png']
  });

  return app.toTree([emojiOneSprite]);
};
```



## Installing the `emojione` dependency manually

If you want to install the full [emojione](https://github.com/Ranks/emojione) library, which is over 90 MiB large, you should remove the `emojione-js` entry from your app's `bower.json` and tell the addon not to import it. Add this to your app's `ember-cli-build.js`:

```js
"ember-emojione": {
  skipBowerImport: true
}
```

Then you can install the `emojione` library normally:

    bower install -S emojione

Now you can manually import `emojione.js` and EmojiOne assets from `ember-cli-build.js`.

This addon relies on the `emojione` global var.



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



### Do not use `npm` or `ember install`, use `yarn`

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



## License

[MIT](https://github.com/Deveo/ember-emojione/blob/gen-1/LICENSE.md).
