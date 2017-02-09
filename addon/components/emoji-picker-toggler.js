import Component from 'ember-component';
import layout from 'ember-emojione/templates/components/emoji-picker-toggler';
import DynamicAttributeBindingsMixin from 'ember-emojione/mixins/dynamic-attribute-bindings';

export default Component.extend(DynamicAttributeBindingsMixin, {
  label:                undefined,
  labelWhenOpen:        undefined,
  toggleAction:         undefined,
  isEmojiPickerVisible: undefined,

  NON_ATTRIBUTE_BOUND_PROPS: [
    'label',
    'labelWhenOpen',
    'toggleAction',
    'isEmojiPickerVisible',
    'tagName',
  ],

  layout,
  classNames: ['eeo-emojiPicker-toggler'],
  tagName: 'button',

  click() {
    this.sendAction('toggleAction');
    return false;
  }
});