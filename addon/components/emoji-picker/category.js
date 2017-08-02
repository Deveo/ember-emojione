import Component from '@ember/component';
import { inject as service } from '@ember/service';

import layout from '../../templates/components/emoji-picker/category';
import templateString from 'ember-emojione/-private/cp-macros/template-string';



export default Component.extend({
  category:            undefined,
  emoji:               undefined,
  selectAction:        undefined,

  emojiService: service('emoji'),

  layout,
  classNameBindings: [':eeo-emojiPicker-category', 'categoryClass'],

  categoryClass: templateString('_${category.id}'),
});
