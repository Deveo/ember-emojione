import {
  collection
} from 'ember-cli-page-object';

import c from '../../helpers/page-object/component';

export default c('.eeo-emojiPicker', {
  emoji: collection({
    itemScope: '.eeo-emojiPicker-category-emoji-emojo',
    item:      c()
  }),

  categories: collection({
    itemScope: '.eeo-emojiPicker-category',
    item: c({
      title: c('.eeo-emojiPicker-category-title'),
      emoji: collection({
        scope: '.eeo-emojiPicker-category-emoji',
        itemScope: '.eeo-emojiPicker-category-emoji-emojo',
        item:      c()
      }),
    }),
  }),
});
