import Component from 'ember-component';
import computed from 'ember-computed';
import {next} from 'ember-runloop';
import get, {getProperties} from 'ember-metal/get';
import service from 'ember-service/inject';
import {htmlSafe} from 'ember-string';
import $ from 'jquery';

import layout from '../templates/components/emoji-typing-assistance';
import computedStyle from 'ember-computed-style';
import getCaretCoordinates from 'textarea-caret';
import getLineHeight from 'line-height';
import ClickOutsideMixin from 'ember-click-outside/mixins/click-outside';
import {EMOJI_PROP_NAMES_CATEGORY} from "ember-emojione/utils/constants";
import {injectEmoji} from "ember-emojione/helpers/inject-emoji";



export default Component.extend(ClickOutsideMixin, {

  filterInput:       undefined,
  $input:            undefined,
  selectAction:      undefined,

  _keyPressNotifier: undefined,
  _minLength:        3,



  emojiService: service('emoji'),



  attributeBindings: ['style'],
  classNames: ['eeo-emojiAssist'],
  layout,


  style: computedStyle('caretCoords'),



  isMinLengthMet: computed('filterInput.length', '_minLength', function () {
    return this.get('filterInput.length') >= this.get('_minLength');
  }),



  caretCoords: computed(
    'filterInput',
    'caretPosition',
    'isMinLengthMet',
    'emoji.length',
    function () {
      const isMinLengthMet = this.get('isMinLengthMet');
      const $input         = this.get('$input');
      const emojiCount     = this.get('emoji.length');

      if (!isMinLengthMet || !$input || !emojiCount) return {display: 'none'};

      const filterInput = this.get('filterInput');
      const input       = $input.get(0);
      const position    = $input.prop('selectionStart') - filterInput.length + 1;
      const style       = getCaretCoordinates(input, position);
      const lineHeight  = getLineHeight(input);

      style.top += lineHeight;

      return style;
    }
  ),



  emoji: computed(
    'filterInput',
    'emojiService.currentSkinTone',
    EMOJI_PROP_NAMES_CATEGORY,
    function () {
      if (!this.get('isMinLengthMet')) return [];

      const filterInput     = this.get('filterInput');
      const currentSkinTone = this.get('emojiService.currentSkinTone');
      const emojiPropName   = `emojiService.emoji__tone_${currentSkinTone}`;

      return this
        .get(emojiPropName)
        .filter(emojo => get(emojo, 'shortname').lastIndexOf(filterInput) === 0);
    }
  ),


  emojiHTML: computed('emoji.[]', function () {
    const html =
      this
        .get('emoji')
        .map(emojo => getProperties(emojo, 'id', 'shortname'))
        .map(({id, shortname}) => `
          <a href class="eeo-emojiAssist-emojo" data-emojo-shortname="${shortname}">
            ${shortname} <span class="eeo-emojiAssist-emojo-label">${id}</span>
          </a>
        `)
        .join('');

    return htmlSafe(injectEmoji(html));
  }),



  didInsertElement() {
    this._super(...arguments);
    next(() => this.addClickOutsideListener());
  },



  willDestroyElement() {
    this._super(...arguments);
    this.removeClickOutsideListener();
  },



  clickOutside() {
    this.set('filterInput', null);
  },



  click(event) {
    event.preventDefault();

    const $target = $(event.target);

    const shortname =
      $target.data('emojo-shortname')
      || $target.parent('.eeo-emojiAssist-emojo').data('emojo-shortname');

    if (!shortname) return;

    this.sendAction('selectAction', shortname, {shouldReplace: true});
    this.set('filterInput', null);
  }
});
