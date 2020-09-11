import { htmlSafe, isHTMLSafe } from '@ember/string';
import Helper from '@ember/component/helper';
import { getProperties, set } from '@ember/object';
import config from 'ember-get-config';
import opts from 'ember-emojione/config';
import emojione from 'emojione';



const InjectEmoji = Helper.extend({

  compute([inputStr], overrideOptions) {
    if (!inputStr) {
      return '';
    }

    const isInputHtmlSafe = isHTMLSafe(inputStr);

    return this._runEmojiOneWithOptionsOnce(overrideOptions, (options) => {
      const result = this._injectEmoji(inputStr.toString(), options);
      return isInputHtmlSafe ? htmlSafe(result) : result;
    });

  },



  _emojiOneOptionKeys: [
    'imagePathPNG',
    'imagePathSVG',
    'imagePathSVGSprites',
    'imageType',
    'imageTitleTag',
    'sprites',
    'unicodeAlt',
    'ascii',
  ],



  _mergeOptions(overrideOptions = {}) {
    const envOptions = config[ 'ember-emojione' ] || {};

    return {
      ...envOptions,
      ...overrideOptions,

      emojione: {
        imagePathPNG:        opts.shouldIncludePngImages ? '../ember-emojione/png'                : null,
        imagePathSVG:        opts.shouldIncludeSvgImages ? '/ember-emojione/svg/'                 : null,
        imagePathSVGSprites: opts.shouldIncludeSvgSprite ? '/ember-emojione/emojione.sprites.svg' : null,

        ...(envOptions.emojione || {}),

        sprites: opts.spriteSheet,

        ...(overrideOptions.emojione || {}),
      }
    };
  },



  _captureEmojiOneInitialState() {
    const keys = this.get('_emojiOneOptionKeys');
    return getProperties(emojione, keys);
  },



  _applyOptionsToEmojiOne(options) {
    this
      .get('_emojiOneOptionKeys')
      .forEach(key => {
        const value = options[key];
        if (value == null) return;
        set(emojione, key, value);
      });
  },

  /**
   * A decorator that:
   * 1. Initializes the EmojiOne library with given options.
   * 2. Runs it.
   * 3. Restores its original state.
   **/
  _runEmojiOneWithOptionsOnce(overrideOptions, callback) {
    const initialEmojiOneOptions = this._captureEmojiOneInitialState();
    const currentOptions         = this._mergeOptions(overrideOptions);

    this._applyOptionsToEmojiOne(currentOptions.emojione);
    const result = callback(currentOptions);
    this._applyOptionsToEmojiOne(initialEmojiOneOptions);

    return result;
  },

  _injectEmoji(inputStr, {
    regexToSkip = /<code[\s\S]*?>[\s\S]*?<\/code>/gm
  } = {}) {
    if (!regexToSkip) {
      return this._injectEmojiWithEmojiOne(inputStr);
    }

    // Collecting substrings-to-skip into an array
    const skippedStrs = inputStr.match(regexToSkip);

    if (!skippedStrs || !skippedStrs.length) {
      return this._injectEmojiWithEmojiOne(inputStr);
    }

    return inputStr

      // Collecting substrings-to-parse into an array
      .split(regexToSkip)

      // Injecting emoji into substrings
      .map(this._injectEmojiWithEmojiOne)

      // Merging parsed substings with their ignored counterparts
      .map((substr, index) => {
        if (!index) return substr;
        const skippedStr = skippedStrs[index - 1];
        return skippedStr + substr;
      })
      .join("");
  },



  _injectEmojiWithEmojiOne(inputStr) {
    return emojione.toImage(inputStr);
  }
});

export default InjectEmoji;



// Single instance for programmatic usage
let injectEmojiInstance;

export function injectEmoji(input, options) {
  if (!injectEmojiInstance) {
    injectEmojiInstance = InjectEmoji.create();
  }

  return injectEmojiInstance.compute([input], options);
}
