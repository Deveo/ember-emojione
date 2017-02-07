import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import layout from '../templates/components/emoji-picker-wrapper';
import {assert} from  'ember-metal/utils';
import {next} from 'ember-runloop';

export default Component.extend({

  inputSelector:         undefined,
  text:                  undefined,
  shouldSetFocusToInput: true,
  isEmojiPickerVisible:  false,
  emojiInsertedAction:   undefined,



  layout,
  classNames: ['eeo-emojiPickerWrapper'],



  $input: computed('inputSelector', function () {
    const inputSelector = this.get('inputSelector');
    assert("inputSelector should be provided", inputSelector);
    return this.$(inputSelector);
  }),



  _insertEmojoIntoText(emojoCode) {
    const text   = this.get("text") || "";
    const $input = this.get("$input");

    const selectionStart = $input.prop("selectionStart");
    const selectionEnd   = $input.prop("selectionEnd");

    const textBefore = text.slice(0, selectionStart);
    const textAfter  = text.slice(selectionEnd);

    return {
      newText:          textBefore + emojoCode + textAfter,
      newCaretPosition: textBefore.length + emojoCode.length
    };
  },



  _setCaretPositionAndFocusToInput({$input, newCaretPosition}) {
    next(() => {
      $input.prop("selectionStart", newCaretPosition);
      $input.prop("selectionEnd",   newCaretPosition);

      if (this.get('shouldSetFocusToInput')) $input.focus();
    });
  },



  actions: {
    selectEmoji(emojo) {
      const emojoCode = get(emojo, 'shortname');
      const $input    = this.get('$input');

      const {newText, newCaretPosition} = this._insertEmojoIntoText(emojoCode);

      this.sendAction('emojiInsertedAction', newText);
      this._setCaretPositionAndFocusToInput({ $input, newCaretPosition });
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
