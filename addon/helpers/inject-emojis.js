import Helper from 'ember-helper';
import emojione from 'emojione';
import { htmlSafe } from 'ember-string';

export default Helper.extend({
  compute([inputStr], /* options */) {
    const resultStr = emojione.toImage(inputStr);
    return htmlSafe(resultStr);
  }
});
