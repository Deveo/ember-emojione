// Code borrowed from:
// https://github.com/DockYard/ember-one-way-controls/blob/v2.0.0/addon/-private/dynamic-attribute-bindings.js

import Mixin from '@ember/object/mixin';



export default Mixin.create({
  attributeBindings:         [],
  NON_ATTRIBUTE_BOUND_PROPS: ['class', 'classNames'],
  concatenatedProperties:    ['NON_ATTRIBUTE_BOUND_PROPS'],

  _isKeyBoundToAttribute(key) {
    return (
         this.NON_ATTRIBUTE_BOUND_PROPS.indexOf(key) === -1
      && this.attributeBindings        .indexOf(key) === -1
    );
  },

  init() {
    this._super(...arguments);

    const newAttributeBindings =
      Object
        .keys(this.attrs)
        .filter(key => this._isKeyBoundToAttribute(key));

    const attributeBindings = this.attributeBindings.concat(newAttributeBindings);

    this.setProperties({attributeBindings});
  }
});
