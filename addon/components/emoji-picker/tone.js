import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import templateString from 'ember-emojione/-private/cp-macros/template-string';



export default Component.extend({
  tone:             undefined,
  toneSelectAction: () => {},

  emojiService: service('emoji'),

  tagName:           'button',
  classNameBindings: [':eeo-emojiPicker-tone', 'isCurrentClass', 'toneClass'],

  isCurrentClass: computed('tone', 'emojiService.currentSkinTone', function () {
    return this.get('tone') === this.get('emojiService.currentSkinTone')
      ? '-current'
      : '';
  }),

  toneClass: templateString("_${tone}"),

  click() {
    const oldSkinTone = this.get('emojiService.currentSkinTone');
    const newSkinTone = this.get('tone');

    if (oldSkinTone === newSkinTone) return;

    this.set('emojiService.currentSkinTone', newSkinTone);
    this.toneSelectAction(newSkinTone);
  }
});
