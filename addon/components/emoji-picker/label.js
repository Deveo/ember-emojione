import Component from 'ember-component';
import layout from '../../templates/components/emoji-picker/label';

export default Component.extend({

  categoryObj:  undefined,
  visibleCount: undefined,


  layout,

  attributeBindings: ['categoryObj.category.name:title'],
  classNameBindings: [':eeo-emojiPicker-nav-item', 'visibleCount:-hasItems:-hasNoItems'],
});
