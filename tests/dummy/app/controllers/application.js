import Controller from 'ember-controller';
import computed from 'ember-computed';
import { htmlSafe } from 'ember-string';
import {next} from 'ember-runloop';
import $ from 'jquery';



export default Controller.extend({
  inputStr: 'OMG! :scream:',
  isPickerVisible: false,

  inputStrHtmlSafe: computed('inputStr', function () {
    const inputStr = this.get('inputStr');
    return htmlSafe(inputStr);
  }),

  actions: {
    closeEmojiPicker() {
      this.set("isPickerVisible", false);
      $("textarea").focus();
    },

    openEmojiPicker() {
      if (this.get("isPickerVisible")) return;

      next(() => {
        this.set("isPickerVisible", true);
        next(() => $(".eeo-emojiPicker-filter-input").focus());
      });
    },

    selectEmoji(emojo) {
      const text = this.get('inputStr') + emojo.shortname;
      this.set('inputStr', text);
    }
  }
});
