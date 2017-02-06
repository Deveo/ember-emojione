// import {
//   collection
// } from 'ember-cli-page-object';

import c from '../../helpers/page-object/component';
import emojiPicker from './emoji-picker';

export default c('.eeo-emojiPickerWrapper', {
  emojiPicker,
  toggler: c('.eeo-emojiPicker-toggler'),
});
