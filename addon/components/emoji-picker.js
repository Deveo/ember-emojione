import Component from 'ember-component';
import computed from 'ember-computed';
import {htmlSafe} from 'ember-string';
import {later, scheduleOnce} from 'ember-runloop';
import layout from '../templates/components/emoji-picker';
import service from 'ember-service/inject';

import {A} from 'ember-array/utils';
import {default as EObject} from 'ember-object';
const  O = EObject.create.bind(EObject);

export default Component.extend({

  selectAction: undefined,



  emojiService: service('emoji'),



  layout,
  classNames: ['eeo-emojiPicker'],
  filterInput: '',



  scrollableId: computed(function () {
    return Math.random().toString(36).substr(2, 5);
  }),

  $scrollable: computed(function () {
    return this.$('.eeo-emojiPicker-scrollable');
  }),

  categorySections: computed('emojiService.categories', function () {
    const objs =
      this
        .get('emojiService.categories')
        .map(category => O({
          category,
          style: htmlSafe("")
        }));

    return A(objs);
  }),



  _applyFilterInput(filterInput) {
    this.setProperties({filterInput});
    later(this, this._updateScroll);
  },



  _updateScroll() {
    const $scrollable = this.get('$scrollable');
    const parHeight   = $scrollable.innerHeight();

    this
      .get('categorySections')
      .forEach(section => {
        if (!section.get('$category')) {
          const $category = this.$(`.eeo-emojiPicker-category._${section.category.get('id')}`);
          section.setProperties({$category});
        }

        const $category = section.get('$category');
        const catTop    = $category.position().top;
        const catHeight = $category.outerHeight();
        const catBottom = catTop + catHeight;

        const left = (-catTop) / catHeight;

        const right = (catBottom - parHeight) / catHeight;

        section.setProperties({
          left,
          right,
          style: htmlSafe(`left: ${left  * 100}%; right: ${right * 100}%;`),
        });

      });
  },



  didInsertElement() {
    this._super(...arguments);

    later(() => this._updateScroll());

    this
      .$('.eeo-emojiPicker-scrollable')
      .on('scroll.eeo', () => scheduleOnce('afterRender', this, this._updateScroll));
  },



  willDestroyElement() {
    this._super(...arguments);

  },



  actions: {
    setTone(tone) {
      this
        .get('emojiService')
        .set('currentSkinTone', tone);
    },

    filter(filterInput) {
      scheduleOnce('afterRender', this, this._applyFilterInput, filterInput);
    }
  }
});
