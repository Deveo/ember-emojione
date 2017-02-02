import Component from 'ember-component';
import layout from '../../templates/components/emoji-picker/label';

export default Component.extend({

  categoryObj: undefined,
  emoji:       undefined,


  layout,

  attributeBindings: ['categoryObj.category.name:title'],
  classNameBindings: [':eeo-emojiPicker-nav-item', 'emoji.length:-hasItems:-hasNoItems'],
});
