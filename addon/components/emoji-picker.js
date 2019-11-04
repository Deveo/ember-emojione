import Component from '@ember/component';
import EObject, {
  computed,
  observer,
  get,
  set
} from '@ember/object';
import { htmlSafe } from '@ember/string';
import { debounce, next, throttle } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import layout from '../templates/components/emoji-picker';
import ClickOutsideMixin from 'ember-click-outside/mixin';

const O = EObject.create.bind(EObject);

import {
  EMOJI_PROP_NAMES_TONE,
  EMOJI_PROP_NAMES_TONE_TONE,
  EMOJI_CATEGORIES_ARRAY,
} from "ember-emojione/-private/utils/constants";

const EMOJI_PICKER_SCROLLABLE_ELEMENT = '.eeo-emojiPicker-scrollable';



export default Component.extend(ClickOutsideMixin, {

  selectAction:        undefined,
  toneSelectAction:    () => {},
  closeAction:         () => {},
  shouldCloseOnSelect: false,
  disableAutoFocus:    false,
  textNoEmojiFound:    "No emoji found",
  textSearch:          "Search",
  textClearSearch:     "Clear search",



  emojiService: service('emoji'),



  layout,
  classNames:   ['eeo-emojiPicker'],
  _filterInput: '',
  filterInput: '',

  scrollableId: computed(function () {
    return Math.random().toString(36).substr(2, 5);
  }),

  $scrollable: computed(function () {
    return this.$(EMOJI_PICKER_SCROLLABLE_ELEMENT);
  }),

  $filterInput: computed(function () {
    return this.$('.eeo-emojiPicker-filter-input');
  }),

  emoji: computed(
    'emojiService.currentSkinTone',
    EMOJI_PROP_NAMES_TONE,
    function () {
      const currentSkinTone = this.get('emojiService.currentSkinTone');
      const emojiPropName   = `emojiService.emoji__tone_${currentSkinTone}`;
      return this.get(emojiPropName);
    }
  ),

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
    'emojiService.currentSkinTone',
    'emojiService.categories.@each.id',
    EMOJI_PROP_NAMES_TONE_TONE,
    function () {
      const emojiCategories = this.get('emojiService.categories');
      const filterStrs      = this.get('filterInput').split(' ');

      return emojiCategories.reduce((result, category) => {
        const categoryId = category.get('id');
        const emoji      = this._getEmojiForCategoryId(categoryId);

        let visibleCount = 0;

        emoji.forEach(emojo => {
          const isVisible =
            filterStrs
              ? filterStrs.every(str => get(emojo, 'filterable').indexOf(str) > -1)
              : true;

          set(emojo, 'isVisible', isVisible);
          if (isVisible) visibleCount++;
        });

        result.set(categoryId, {emoji, visibleCount});

        return result;
      }, O());
    }
  ),



  filteredEmojiCount: computed('emojiByCategoryIdFiltered', function () {
    return EMOJI_CATEGORIES_ARRAY.reduce((count, category) => {
      return count + this.get(`emojiByCategoryIdFiltered.${category}.visibleCount`);
    }, 0);
  }),



  _applyFilterInput(filterInput) {
    if (this.get('isDestroying') || this.get('isDestroyed')) return;

    this.setProperties({filterInput});
    next(() => this._updateScroll());
  },



  _updateScroll() {
    if (this.get('isDestroying') || this.get('isDestroyed')) return;

    const $scrollable = this.get('$scrollable');
    const parHeight   = $scrollable.innerHeight();

    this
      .get('categorySections')
      .forEach(section => {
        const id = section.category.get('id');
        const $category = this.$(
          `.eeo-emojiPicker-category._${id} .eeo-emojiPicker-category-emoji`
        );

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


  _getEmojiForCategoryId(categoryId) {
    const currentSkinTone = this.get('emojiService.currentSkinTone');
    const emojiPropName = `emojiService.${categoryId}__tone_${currentSkinTone}`;
    return this.get(emojiPropName);
  },

  _focusOnSearch() {
    if (this.get('disableAutoFocus')) return;
    this.get('$filterInput').focus();
  },



  didInsertElement() {
    this._super(...arguments);

    this._updateScroll();

    this
      .$(EMOJI_PICKER_SCROLLABLE_ELEMENT)
      .on('scroll.eeo', () => throttle(this, this._updateScroll, 200, false));

    next(() => this.addClickOutsideListener());
  },



  willDestroyElement() {
    this._super(...arguments);

    this
      .$(EMOJI_PICKER_SCROLLABLE_ELEMENT)
      .off('scroll.eeo');

    this.removeClickOutsideListener();
  },



  clickOutside() {
    this.closeAction();
  },



  _applyFilterInputDebounced: observer('_filterInput', function () {
    const filterInput = this.get('_filterInput');
    debounce(this, this._applyFilterInput, filterInput, 200, false);
  }),



  _restoreBarOnShow: observer('isVisible', function () {
    if (!this.get('isVisible')) return;

    next(() => {
      this._updateScroll();
      this._focusOnSearch();
    });
  }),



  actions: {
    selectEmojo(emojo, shouldFocus = true) {
      this.selectAction(emojo, {shouldFocus});

      if (this.get('shouldCloseOnSelect')) {
        this.closeAction(true);
      }
    },

    inputFilteringText(_filterInput) {
      this.setProperties({_filterInput});
    },

    selectFirstFilteredEmojo() {
      let emojo = null;

      const emojiByCategoryIdFiltered = this.get('emojiByCategoryIdFiltered');

      EMOJI_CATEGORIES_ARRAY
        .map(categoryName => emojiByCategoryIdFiltered.get(categoryName))
        .filter(categoryHash => get(categoryHash, 'visibleCount'))
        .find(categoryHash => {
          return emojo = get(categoryHash, 'emoji').find(emojo => get(emojo, 'isVisible'));
        });

      if (emojo) this.send('selectEmojo', emojo, false);
    },

    clearFilterOrClose() {
      if (this.get('filterInput.length')) {
        this.send('inputFilteringText', '');
        return;
      }

      this.closeAction(true);
    }
  }
});
