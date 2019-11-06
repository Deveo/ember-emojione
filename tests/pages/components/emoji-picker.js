import {
  collection
} from 'ember-cli-page-object';

import c from '../../helpers/page-object/component';

export default c('.eeo-emojiPicker', {
  emoji: collection('.eeo-emojiPicker-category-emoji-emojo', {
    ...c()
  }),

  categories: collection('.eeo-emojiPicker-category', {
    ...c({
      title: c('.eeo-emojiPicker-category-title'),
      emoji: collection('.eeo-emojiPicker-category-emoji-emojo', {
        ...c()
      }),
    }),
  }),

  tones: collection('.eeo-emojiPicker-tone', {
    ...c()
  }),

  filterInput: c('.eeo-emojiPicker-filter-input'),
});
