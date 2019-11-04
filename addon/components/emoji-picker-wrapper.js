import Component from '@ember/component';
import EObject, {
  computed,
  get,
  observer,
  trySet
} from '@ember/object';
import Evented, { on } from '@ember/object/evented';
import layout from '../templates/components/emoji-picker-wrapper';
import { assert } from '@ember/debug';
import { next } from '@ember/runloop';
import {
  EKMixin,
  EKOnInsertMixin,
  keyDown/*,
  keyUp*/
} from 'ember-keyboard';
import onKeyDown from 'ember-emojione/-private/utils/on-key';



export default Component.extend(EKMixin, EKOnInsertMixin, {

  inputSelector:         undefined,
  text:                  undefined,
  shouldSetFocusToInput: true,
  isEmojiPickerVisible:  false,
  emojiInsertedAction:   undefined,
  emojiTypingRegex:      /(?:^|\s)(:[\w_+-]+)$/,



  layout,
  classNames:             ['eeo-emojiPickerWrapper'],
  keyboardPriority:       1,
  keyboardFirstResponder: true,



  _assistFilterInput: null,



  $wrapper: computed(function () {
    return this.$();
  }),


  keyPressNotifier: computed(function () {
    return EObject
      .extend(Evented)
      .create();
  }),



  get$input() {
    const inputSelector = this.get('inputSelector');
    assert("inputSelector should be provided", inputSelector);
    return this.$(inputSelector);
  },



  _insertEmojoIntoText(emojoCode, {shouldReplace = false} = {}) {
    const text   = this.get("text") || "";
    const $input = this.get$input();

    let selectionStart = $input.prop("selectionStart");
    let selectionEnd   = $input.prop("selectionEnd");

    // Replacing partially inputted emoji code
    if (shouldReplace) {
      const regex = this.get('emojiTypingRegex');
      const str   = text.slice(0, selectionStart);
      const match = regex.exec(str);

      if (match && match[1]) {
        selectionStart = str.lastIndexOf(match[ 1 ]);
      }
    }

    const textBefore = text.slice(0, selectionStart);
    const textAfter  = text.slice(selectionEnd);

    return {
      newText:          textBefore + emojoCode + textAfter,
      newCaretPosition: textBefore.length + emojoCode.length
    };
  },



  _setCaretPositionAndFocusToInput({$input, newCaretPosition, shouldFocus}) {
    next(() => {
      $input.prop("selectionStart", newCaretPosition);
      $input.prop("selectionEnd",   newCaretPosition);

      if (shouldFocus && this.get('shouldSetFocusToInput')) $input.focus();
    });
  },



  _triggerEmojiAssistOnTextChange: observer('text', function () {
    this.set('_assistFilterInput', null);

    const $input = this.get$input();

    if (!$input.is(':focus')) return;

    const position = $input.prop('selectionStart');
    if (position !== $input.prop('selectionEnd')) return;

    let text = this.get('text');
    if (typeof text !== 'string') return;

    text         = text.slice(0, position);
    const regex  = this.get('emojiTypingRegex');
    const result = regex.exec(text);
    if (!result) return;

    this.set('_assistFilterInput', result[1]);
  }),



  closeAssistOnEsc: onKeyDown('Escape', function () {
    this.set('_assistFilterInput', null);
  }),

  selectEmojiWithEnter:   onKeyDown('Enter',                  'selectEmoji'),
  nextEmojiWithArrow:     onKeyDown('ArrowDown', 'Tab',       'nextEmoji'),
  previousEmojiWithArrow: onKeyDown('ArrowUp',   'shift+Tab', 'previousEmoji'),

  closeAssistOnArrows: on(keyDown('ArrowLeft'), keyDown('ArrowRight'), function () {
    this.set('_assistFilterInput', null);
  }),



  actions: {
    selectEmoji(emojoOrCode, {shouldFocus = true, shouldReplace = false} = {}) {
      const emojoCode =
        typeof emojoOrCode === 'object' && emojoOrCode.shortname
          ? get(emojoOrCode, 'shortname')
          : emojoOrCode;

      const $input = this.get$input();

      const {newText, newCaretPosition} = this._insertEmojoIntoText(emojoCode, {shouldReplace});

      this.emojiInsertedAction(newText);
      this._setCaretPositionAndFocusToInput({ $input, newCaretPosition, shouldFocus });

      next(() => this.set('_assistFilterInput', null));
    },



    toggleEmojiPicker() {
      this.toggleProperty('isEmojiPickerVisible');
    },



    closeEmojiPicker(shouldFocus) {
      trySet(this, 'isEmojiPickerVisible', false);

      if (shouldFocus && this.get('shouldSetFocusToInput')) {
        this.get$input().focus();
      }
    },
  }
});
