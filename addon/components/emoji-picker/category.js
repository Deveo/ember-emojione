import Component from 'ember-component';
import computed from 'ember-computed';
import layout from '../../templates/components/emoji-picker/category';
import service from 'ember-service/inject';
import templateString from 'ember-computed-template-string';
import getCP from 'ember-emojione/cp-macros/get';



export default Component.extend({
  category:     undefined, // {id, name}
  filterInput:  undefined, // str
  selectAction: undefined,

  layout,

  emojiService: service('emoji'),

  classNames: ['eeo-emojiPicker-category'],

  categoryIdWithTone: templateString('${category.id}__tone_${emojiService.currentSkinTone}'),

  emojiUnfiltered: getCP('emojiService', 'categoryIdWithTone'),

  emoji: computed('filterInput', 'emojiUnfiltered.@each.filterable', function () {
    const filterStrs = this.get('filterInput').split(' ');

    return this
      .get('emojiUnfiltered')
      .filter(emojo => filterStrs.every(str => emojo.filterable.indexOf(str) > -1));
  })
});
