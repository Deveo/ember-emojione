import Helper from 'ember-helper';
import emojione from 'emojione';
import { htmlSafe } from 'ember-string';
import isHTMLSafe from 'ember-string-ishtmlsafe-polyfill';
import config from 'ember-get-config';
import { getProperties } from 'ember-metal/get';



const InjectEmoji = Helper.extend({

  compute([inputStr], options) {
    if (!inputStr) {
      return htmlSafe('');
    }

    if (!isHTMLSafe(inputStr)) {
      throw new Error(`inject-emoji was passed an unsafe string: "${inputStr}"`);
    }

    return this
      ._runEmojiOneWithOptionsOnce(options, () => {
        const resultStr = this._injectEmoji(inputStr, options);
        return htmlSafe(resultStr);
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



  /**
   * A decorator that:
   * 1. Initializes the EmojiOne library with given options.
   * 2. Runs it.
   * 3. Restores its original state.
   **/
  _runEmojiOneWithOptionsOnce(overrideOptions, callback) {
    const currentEmojiOneOptions = this._mergeEmojiOneOptions(overrideOptions);
    const initialEmojiOneOptions = this._captureEmojiOneInitialState();

    this._applyOptionsToEmojiOne(currentEmojiOneOptions);
    const result = callback();
    this._applyOptionsToEmojiOne(initialEmojiOneOptions);

    return result;
  },



  _mergeEmojiOneOptions(overrideOptions = {}) {
    const defaultOptions          = config[ 'ember-emojione' ] || {};
    const defaultOptionsEmojiOne  = defaultOptions.emojione    || {};
    const overrideOptionsEmojiOne = overrideOptions.emojione   || {};
    return { ...defaultOptionsEmojiOne, ...overrideOptionsEmojiOne };
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
        emojione[key] = value;
      });
  },



  _injectEmoji(inputStr, {
    regexToSkip = /<code[\s\S]*?>[\s\S]*?<\/code>/gm
  } = {}) {
    if (!regexToSkip) {
      return this._injectEmojiWithEmojiOne(inputStr);
    }

    // Collecting substrings-to-skip into an array
    const skippedStrs = inputStr.toString().match(regexToSkip);

    if (!skippedStrs || !skippedStrs.length) {
      return this._injectEmojiWithEmojiOne(inputStr);
    }

    return inputStr
      .toString()

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
    return emojione.toImage(inputStr.toString());
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
