import Component from 'ember-component';
import computed from 'ember-computed';
import {next} from 'ember-runloop';
import get/*, {getProperties}*/ from 'ember-metal/get';
import service from 'ember-service/inject';
// import {htmlSafe} from 'ember-string';
import observer from 'ember-metal/observer';
// import $ from 'jquery';
import {assert} from 'ember-metal/utils';

import layout from '../templates/components/emoji-typing-assistance';
import computedStyle from 'ember-computed-style';
import getCaretCoordinates from 'textarea-caret';
import getLineHeight from 'line-height';
import ClickOutsideMixin from 'ember-click-outside/mixins/click-outside';
import {EMOJI_PROP_NAMES_CATEGORY} from "ember-emojione/utils/constants";
// import {injectEmoji} from "ember-emojione/helpers/inject-emoji";



export default Component.extend(ClickOutsideMixin, {

  filterInput:       undefined,
  $input:            undefined,
  selectAction:      undefined,
  keyPressNotifier:  undefined,
  minLength:         2,



  emojiService: service('emoji'),



  attributeBindings: ['style'],
  classNames: ['eeo-emojiAssist'],
  layout,
  style: computedStyle('caretCoords'),


  _currentEmojiIndex:      0,
  _keyboardNotifierActive: false,



  $scrollable: computed(function () {
    return this.$('.eeo-emojiAssist-emoji');
  }),

  isMinLengthMet: computed('filterInput.length', 'minLength', function () {
    return this.get('filterInput.length') >= this.get('minLength');
  }),



  caretCoords: computed(
    'filterInput',
    'caretPosition',
    'isMinLengthMet',
    'emoji.length',
    function () {
      const isMinLengthMet = this.get('isMinLengthMet');
      const $input         = this.get('$input');
      const emojiCount     = this.get('emoji.length');

      if (!isMinLengthMet || !$input || !emojiCount) return {display: 'none'};

      const filterInput = this.get('filterInput');
      const input       = $input.get(0);
      const position    = $input.prop('selectionStart') - filterInput.length + 1;
      const style       = getCaretCoordinates(input, position);
      const lineHeight  = getLineHeight(input);

      style.top += lineHeight;

      return style;
    }
  ),



  emoji: computed(
    'filterInput',
    'emojiService.currentSkinTone',
    EMOJI_PROP_NAMES_CATEGORY,
    function () {
      if (!this.get('isMinLengthMet')) return [];

      const filterInput     = this.get('filterInput');
      const currentSkinTone = this.get('emojiService.currentSkinTone');
      const emojiPropName   = `emojiService.emoji__tone_${currentSkinTone}`;

      return this
        .get(emojiPropName)
        .filter(emojo => get(emojo, 'shortname').lastIndexOf(filterInput) === 0);
    }
  ),



  selectEmojiFromKeyboard() {
    const index = this.get('_currentEmojiIndex');
    const emojo = this.get('emoji')[index];
    assert("Attempted to retrieve emojo at index that deos not exist", emojo);
    this.send('selectEmojo', emojo);
  },

  nextEmojiFromKeyboard() {
    let index = this.get('_currentEmojiIndex') + 1;
    const count = this.get('emoji.length');
    if (index >= count) index = 0;
    this.set('_currentEmojiIndex', index);
    this._scrollToEmoji(index);
  },

  previousEmojiFromKeyboard() {
    let index = this.get('_currentEmojiIndex') - 1;
    if (index < 0) index = this.get('emoji.length') - 1;
    this.set('_currentEmojiIndex', index);
    this._scrollToEmoji(index);
  },

  _scrollToEmoji(index) {
    const $scrollable  = this.get('$scrollable');
    const $emojo       = $scrollable.children('.eeo-emojiAssist-emojo').eq(index);
    const top          = $emojo.position().top;
    const height       = $emojo.outerHeight();
    const parentHeight = $scrollable.innerHeight();
    const oldScrollTop = $scrollable.scrollTop();


    const scrollTop =
      top < 0                     ? oldScrollTop + top :
      top + height > parentHeight ? oldScrollTop + top + height - parentHeight :
                                    null;

    if (scrollTop === null) return;

    $scrollable.animate({scrollTop}, 150, false);
  },



  setUpKeyNotifierCallbacks() {
    const keyPressNotifier = this.get('keyPressNotifier');
    if (!keyPressNotifier) return;
    if (this.get('_keyboardNotifierActive')) return;
    this.set('_keyboardNotifierActive', true);

    keyPressNotifier.on('selectEmoji',   () => this.selectEmojiFromKeyboard());
    keyPressNotifier.on('nextEmoji',     () => this.nextEmojiFromKeyboard());
    keyPressNotifier.on('previousEmoji', () => this.previousEmojiFromKeyboard());
  },



  removeKeyNotifierCallbacks() {
    if (!this.get('_keyboardNotifierActive')) return;
    const keyPressNotifier = this.get('keyPressNotifier');
    if (!keyPressNotifier) return;

    keyPressNotifier.off('selectEmoji');
    keyPressNotifier.off('nextEmoji');
    keyPressNotifier.off('previousEmoji');
  },



  didInsertElement() {
    this._super(...arguments);
    next(() => this.addClickOutsideListener());
  },



  didReceiveAttrs() {
    this._super(...arguments);
    this.setUpKeyNotifierCallbacks();
  },



  willDestroyElement() {
    this._super(...arguments);
    this.removeClickOutsideListener();
    this.removeKeyNotifierCallbacks();
  },



  clickOutside() {
    this.set('filterInput', null);
  },



  resetIndexOnEmojiChange: observer('emoji.[]', function () {
    this.set('_currentEmojiIndex', 0);
  }),


  actions: {
    selectEmojo(emojo) {
      this.sendAction('selectAction', emojo, {shouldReplace: true});
      this.set('filterInput', null);
    }
  }
});
