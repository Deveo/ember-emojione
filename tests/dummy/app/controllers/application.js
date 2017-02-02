import Controller from 'ember-controller';
import computed from 'ember-computed';
import { htmlSafe } from 'ember-string';

export default Controller.extend({
  inputStr: 'OMG! :scream:',
  isPickerVisible: false,

  inputStrHtmlSafe: computed('inputStr', function () {
    const inputStr = this.get('inputStr');
    return htmlSafe(inputStr);
  }),

  actions: {
    togglePicker() {
      this.toggleProperty('isPickerVisible');
    },

    selectEmoji(emojo) {
      const text = this.get('inputStr') + emojo.shortname;
      this.set('inputStr', text);
    }
  }
});
