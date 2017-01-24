import Helper from 'ember-helper';
import emojione from 'emojione';
import { htmlSafe } from 'ember-string';
import isHTMLSafe from 'ember-string-ishtmlsafe-polyfill';
import config from 'ember-get-config';
import { getProperties } from 'ember-metal/get';

export default Helper.extend({
  compute([inputStr], options) {
    if (!inputStr) {
      return htmlSafe('');
    }

    if (!isHTMLSafe(inputStr)) {
      throw new Error(`inject-emoji was passed an unsafe string: "${inputStr}"`);
    }

    return this
      ._initializeEmojiOne(options, () => {
        const resultStr = emojione.toImage(inputStr.toString());
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
  _initializeEmojiOne(overrideOptions = {}, callback) {
    const currentEmojiOneOptions = this._mergeEmojiOneOptions(overrideOptions);
    const initialEmojiOneOptions = this._captureEmojiOneInitialState();

    this._applyOptionsToEmojiOne(currentEmojiOneOptions);
    const result = callback();
    this._applyOptionsToEmojiOne(initialEmojiOneOptions);

    return result;
  },

  _mergeEmojiOneOptions(overrideOptions) {
    const defaultOptions          = config[ 'ember-emojione' ] || {};
    const defaultOptionsEmojiOne  = defaultOptions.emojione || {};
    const overrideOptionsEmojiOne = overrideOptions.emojione || {};
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
  }
});
