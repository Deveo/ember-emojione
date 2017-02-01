import Component from 'ember-component';
import layout from '../../templates/components/emoji-picker/category';
import service from 'ember-service/inject';
import templateString from 'ember-computed-template-string';



export default Component.extend({
  category:            undefined,
  emoji:               undefined,
  selectAction:        undefined,
  closeAction:         undefined,
  shouldCloseOnSelect: false,

  emojiService: service('emoji'),

  layout,
  classNameBindings: [':eeo-emojiPicker-category', 'categoryClass'],

  categoryClass:      templateString('_${category.id}'),

  actions: {
    select(emojo) {
      this.sendAction('selectAction', emojo);

      if (this.get('closeAction') && this.get('shouldCloseOnSelect')) {
        this.sendAction('closeAction');
      }
    }
  }
});
