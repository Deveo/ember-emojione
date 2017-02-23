import Controller from 'ember-controller';
import computed from 'ember-computed';
import { htmlSafe } from 'ember-string';



export default Controller.extend({
  inputStr: 'OMG! :scream:',

  inputStrHtmlSafe: computed('inputStr', function () {
    const inputStr = this.get('inputStr');
    return htmlSafe(inputStr);
  }),
});
