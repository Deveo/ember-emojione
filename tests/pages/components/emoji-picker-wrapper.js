// import {
//   collection
// } from 'ember-cli-page-object';

import c from '../../helpers/page-object/component';
import emojiAssist from './emoji-typing-assistance';
import emojiPicker from './emoji-picker';

export default c('.eeo-emojiPickerWrapper', {
  emojiAssist,
  emojiPicker,
  toggler: c('.eeo-emojiPicker-toggler'),
});
