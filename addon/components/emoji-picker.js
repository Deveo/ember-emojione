import Component from 'ember-component';
import computed from 'ember-computed';
import {htmlSafe} from 'ember-string';
import {debounce, later, throttle} from 'ember-runloop';
import layout from '../templates/components/emoji-picker';
import service from 'ember-service/inject';
import observer from 'ember-metal/observer';

import {A} from 'ember-array/utils';
import {default as EObject} from 'ember-object';
const  O = EObject.create.bind(EObject);

export default Component.extend({

  selectAction:     undefined,
  disableAutoFocus: false,



  emojiService: service('emoji'),



  layout,
  classNames:   ['eeo-emojiPicker'],
  _filterInput: '',
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

  emojiByCategoryIdFiltered: computed(
    'filterInput',
    'emojiService.categories.@each.id',
    'emojiService.currentSkinToneEmoji__people',
    'emojiService.currentSkinToneEmoji__nature',
    'emojiService.currentSkinToneEmoji__food',
    'emojiService.currentSkinToneEmoji__activity',
    'emojiService.currentSkinToneEmoji__travel',
    'emojiService.currentSkinToneEmoji__objects',
    'emojiService.currentSkinToneEmoji__symbols',
    'emojiService.currentSkinToneEmoji__flags',
    function () {
      const filterInput = this.get('filterInput');
      const filterStrs  = filterInput.length ? filterInput.split(' ') : null;

      return this
        .get('emojiService.categories')
        .reduce((result, category) => {
          const categoryId      = category.get('id');
          const emojiPropName   = `emojiService.currentSkinToneEmoji__${categoryId}`;
          const emojiUnfiltered = this.get(emojiPropName);

          const emojiFiltered =
            filterStrs
            ? emojiUnfiltered.filter(emojo => filterStrs.every(str => emojo.filterable.indexOf(str) > -1))
            : emojiUnfiltered;

          result.set(categoryId, emojiFiltered);
          return result;
        }, O());
    }
  ),



  filteredEmojiCount: computed(
    'emojiByCategoryIdFiltered.people.length',
    'emojiByCategoryIdFiltered.nature.length',
    'emojiByCategoryIdFiltered.food.length',
    'emojiByCategoryIdFiltered.activity.length',
    'emojiByCategoryIdFiltered.travel.length',
    'emojiByCategoryIdFiltered.objects.length',
    'emojiByCategoryIdFiltered.symbols.length',
    'emojiByCategoryIdFiltered.flags.length',
    function () {
      return (
        this.get('emojiByCategoryIdFiltered.people.length')
        + this.get('emojiByCategoryIdFiltered.nature.length')
        + this.get('emojiByCategoryIdFiltered.food.length')
        + this.get('emojiByCategoryIdFiltered.activity.length')
        + this.get('emojiByCategoryIdFiltered.travel.length')
        + this.get('emojiByCategoryIdFiltered.objects.length')
        + this.get('emojiByCategoryIdFiltered.symbols.length')
        + this.get('emojiByCategoryIdFiltered.flags.length')
      );
    }
  ),



  _applyFilterInput(filterInput) {
    if (this.get('isDestroying') || this.get('isDestroyed')) return;

    this.setProperties({filterInput});
    later(() => this._updateScroll());
  },



  _applyFilterInputDebounced: observer('_filterInput', function () {
    const filterInput = this.get('_filterInput');
    debounce(this, this._applyFilterInput, filterInput, 200, false);
  }),



  _updateScroll() {
    if (this.get('isDestroying') || this.get('isDestroyed')) return;

    const $scrollable = this.get('$scrollable');
    const parHeight   = $scrollable.innerHeight();

    this
      .get('categorySections')
      .forEach(section => {
        const $category = this.$(`.eeo-emojiPicker-category._${section.category.get('id')} .eeo-emojiPicker-category-emoji`);

        if (!$category.length) {
          section.set('style', htmlSafe(''));
          return;
        }

        const catTop    = $category.position().top;
        const catHeight = $category.outerHeight();
        const catBottom = catTop + catHeight;
        const left      = (-catTop) / catHeight;
        const right     = (catBottom - parHeight) / catHeight;
        const style     = htmlSafe(`left: ${left  * 100}%; right: ${right * 100}%;`);

        section.setProperties({style});
      });
  },



  didInsertElement() {
    this._super(...arguments);

    this._updateScroll();

    this
      .$('.eeo-emojiPicker-scrollable')
      .on('scroll.eeo', () => throttle(this, this._updateScroll, 200, false));
  },



  willDestroyElement() {
    this._super(...arguments);

    this
      .$('.eeo-emojiPicker-scrollable')
      .off('scroll.eeo');
  },



  actions: {
    inputFilteringText(_filterInput) {
      this.setProperties({_filterInput});
    }
  }
});
