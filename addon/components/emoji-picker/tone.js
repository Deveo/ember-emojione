import Component from 'ember-component';
import service from 'ember-service/inject';
import computed from 'ember-computed';
import templateString from 'ember-computed-template-string';



export default Component.extend({
  tone: undefined,

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
    this
      .get('emojiService')
      .set('currentSkinTone', this.get('tone'));
  }
});
