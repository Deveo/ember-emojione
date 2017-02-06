import Component from 'ember-component';
import layout from '../templates/components/emoji-picker-toggler';

export default Component.extend({
  label:        undefined,
  toggleAction: undefined,

  layout,
  classNames: ['eeo-emojiPicker-toggler'],
  tagName: 'button',

  click() {
    this.sendAction('toggleAction');
  }
});
