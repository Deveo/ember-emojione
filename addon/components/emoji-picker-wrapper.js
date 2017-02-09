import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import layout from '../templates/components/emoji-picker-wrapper';
import {assert} from  'ember-metal/utils';
import {next} from 'ember-runloop';
import observer from 'ember-metal/observer';
import Evented from 'ember-evented';
import EObject from 'ember-object';



export default Component.extend({

  inputSelector:         undefined,
  text:                  undefined,
  shouldSetFocusToInput: true,
  isEmojiPickerVisible:  false,
  emojiInsertedAction:   undefined,



  layout,
  classNames: ['eeo-emojiPickerWrapper'],



  _emojiTypingRegex: /(?:^|\s)(:[\w_]+:?)$/,
  _assistFilterInput: null,


  $input: computed('inputSelector', function () {
    const inputSelector = this.get('inputSelector');
    assert("inputSelector should be provided", inputSelector);
    return this.$(inputSelector);
  }),


  _keyPressNotifier: computed(function () {
    return EObject
      .extend(Evented)
      .create();
  }),



  _insertEmojoIntoText(emojoCode, {shouldReplace = false} = {}) {
    const text   = this.get("text") || "";
    const $input = this.get("$input");

    let selectionStart = $input.prop("selectionStart");
    let selectionEnd   = $input.prop("selectionEnd");

    // Replacing partially inputted emoji code
    if (shouldReplace) {
      const regex = this.get('_emojiTypingRegex');
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

    const $input = this.get('$input');
    if (!$input.is(':focus')) return;

    const position = $input.prop('selectionStart');
    if (position != $input.prop('selectionEnd')) return;

    let text = this.get('text');
    if (typeof text !== 'string') return;

    text         = text.slice(0, position);
    const regex  = this.get('_emojiTypingRegex');
    const result = regex.exec(text);
    if (!result) return;

    this.set('_assistFilterInput', result[1]);
  }),



  actions: {
    selectEmoji(emojoOrCode, {shouldFocus = true, shouldReplace = false} = {}) {
      const emojoCode =
        typeof emojoOrCode === 'object' && emojoOrCode.shortname
        ? get(emojoOrCode, 'shortname')
        : emojoOrCode;

      const $input = this.get('$input');

      const {newText, newCaretPosition} = this._insertEmojoIntoText(emojoCode, {shouldReplace});

      this.sendAction('emojiInsertedAction', newText);
      this._setCaretPositionAndFocusToInput({ $input, newCaretPosition, shouldFocus });
    },



    toggleEmojiPicker() {
      this.toggleProperty('isEmojiPickerVisible');
    },



    closeEmojiPicker(shouldFocus) {
      this.set("isEmojiPickerVisible", false);

      if (shouldFocus && this.get('shouldSetFocusToInput')) {
        this.get("$input").focus();
      }
    },
  }
});
