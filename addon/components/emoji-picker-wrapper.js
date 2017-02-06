import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import layout from '../templates/components/emoji-picker-wrapper';
import {assert} from  'ember-metal/utils';
import {next} from  'ember-runloop';
import RSVP from 'rsvp';

export default Component.extend({

  text:                  undefined,
  inputSelector:         undefined,
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
    $input.prop("selectionStart", newCaretPosition);
    $input.prop("selectionEnd",   newCaretPosition);

    if (this.get('shouldSetFocusToInput')) {
      $input.focus();
    }
  },



  actions: {
    selectEmoji(emojo) {
      const emojoCode = get(emojo, 'shortname');
      const $input    = this.get('$input');

      const {newText, newCaretPosition} = this._insertEmojoIntoText(emojoCode);

      // Dealing with either old-school action or closure action
      const result =
        typeof this.attrs.emojiInsertedAction === 'function'
        ? this.attrs.emojiInsertedAction(newText)
        : this.sendAction('emojiInsertedAction', newText);

      // Running synchronously if a promise wasn't returned
      if (!(result instanceof RSVP.Promise)) {
        this._setCaretPositionAndFocusToInput({ $input, newCaretPosition });
        return;
      }

      // Running asynchronously if a promise was returned
      result.then(() => {
        this._setCaretPositionAndFocusToInput({$input, newCaretPosition});
      });
    },



    openEmojiPicker() {
      if (this.get("isEmojiPickerVisible")) return;

      next(() => {
        this.set("isEmojiPickerVisible", true);

        next(() => {
          this.$(".eeo-emojiPicker-filter-input").focus();
        });
      });
    },



    closeEmojiPicker() {
      this.set("isEmojiPickerVisible", false);
      this.get("$input").focus();
    },
  }
});
