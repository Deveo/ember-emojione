import Component from '@ember/component';
import layout from 'ember-emojione/templates/components/emoji-picker-toggler';
import DynamicAttributeBindingsMixin from 'ember-emojione/-private/mixins/dynamic-attribute-bindings';

export default Component.extend(DynamicAttributeBindingsMixin, {
  toggleAction:         undefined,
  isEmojiPickerVisible: false,
  label:                undefined,
  labelWhenOpen:        undefined,

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
    this.toggleAction();
    return false;
  }
});
