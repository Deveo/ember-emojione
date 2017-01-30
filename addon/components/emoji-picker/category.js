import Component from 'ember-component';
// import computed from 'ember-computed';
import layout from '../../templates/components/emoji-picker/category';
import service from 'ember-service/inject';
import templateString from 'ember-computed-template-string';
import getCP from 'ember-emojione/cp-macros/get';



export default Component.extend({
  category:     undefined, // {id, name}
  selectAction: undefined,

  layout,

  emojiService: service('emoji'),

  classNames: ['eeo-emojiPicker-category'],

  categoryIdWithTone: templateString('${category.id}__tone_${emojiService.currentSkinTone}'),

  emoji: getCP('emojiService', 'categoryIdWithTone'),
});
