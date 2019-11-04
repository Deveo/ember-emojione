import Service from '@ember/service';
import EObject, { computed, defineProperty, setProperties } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import emojiDefs from 'ember-emojione/emoji-defs';
import { assert } from '@ember/debug';
import { A } from '@ember/array';
import { htmlSafe } from '@ember/string';
import {
  EMOJI_CATEGORIES_ARRAY,
  EMOJI_TONES_ARRAY
} from "ember-emojione/-private/utils/constants";

const O = EObject.create.bind(EObject);

function filterEmojiBySkinToneCP(tone) {
  const anotherTone   = tone === 1 ? 2 : 1;
  const regexThisTone = new RegExp(`_tone${tone}$`);
  const regexAnyTone  = /_tone\d$/;

  return computed('emojiDefs', 'emoji.@each.id', function () {
    const emojiDefs = this.get('emojiDefs');

    const emoji =
      this
        .get('emoji')
        .filter(({id}) => {
          if (regexThisTone.test(id)) return true;
          if (regexAnyTone.test(id))  return false;
          return !emojiDefs[`${id}_tone${anotherTone}`];
        });

    return A(emoji);
  });
}

export default Service.extend({
  emojiDefs,

  categories: A([
    O({id: "people",   name: "Smileys & People", icon: htmlSafe(":grinning:")}),
    O({id: "nature",   name: "Animals & Nature", icon: htmlSafe(":deciduous_tree:")}),
    O({id: "food",     name: "Food & Drink",     icon: htmlSafe(":pizza:")}),
    O({id: "activity", name: "Activity",         icon: htmlSafe(":cartwheel:")}),
    O({id: "travel",   name: "Travel & Places",  icon: htmlSafe(":ship:")}),
    O({id: "objects",  name: "Objects",          icon: htmlSafe(":hammer:")}),
    O({id: "symbols",  name: "Symbols",          icon: htmlSafe(":heart:")}),
    O({id: "flags",    name: "Flags",            icon: htmlSafe(":flag_aq:")}),
    // "regional",
    // "modifier",
  ]),

  emojiCategoryIds: EMOJI_CATEGORIES_ARRAY,
  emojiToneIds: EMOJI_TONES_ARRAY,

  _currentSkinTone: 'default',

  currentSkinTone: computed('_currentSkinTone', {
    get() {
      return this.get('_currentSkinTone');
    },
    set(key, value) {
      if (value === 'default') {
        this.set('_currentSkinTone', 'default');
        return 'default';
      }

      assert(`Attempted to set emoji skin tone to an unsupported value: ${value}`, (
        value >= 1 && value <= 5
      ));

      value = value.toString();
      this.set('_currentSkinTone', value);
      return value;
    }
  }),

  emoji: computed('emojiDefs', function () {
    const emojiDefs = this.get('emojiDefs');

    return Object
      .keys(emojiDefs)
      .map(id => this._prepareEmojo(emojiDefs, id));
  }),

  emoji__tone_default: computed('emoji.@each.id', function () {
    const emoji =
      this
        .get('emoji')
        .filter(({id}) => !/_tone\d$/.test(id));

    return A(emoji);
  }),

  emoji__tone_1: filterEmojiBySkinToneCP(1),
  emoji__tone_2: filterEmojiBySkinToneCP(2),
  emoji__tone_3: filterEmojiBySkinToneCP(3),
  emoji__tone_4: filterEmojiBySkinToneCP(4),
  emoji__tone_5: filterEmojiBySkinToneCP(5),

  init() {
    this._defineEmojiComputedProperties();
  },

  // Defines computed properties for each category and tone, for example:
  // * people: filterBy('emoji', 'category', 'people')
  // * people__tone_default: filterBy('emoji__tone_default', 'category', 'people')
  _defineEmojiComputedProperties() {
    this.get('emojiCategoryIds').forEach(category => {
      defineProperty(this, category, filterBy('emoji', 'category', category));

      this.get('emojiToneIds').forEach(tone => {
        const propertyName = `${category}__tone_${tone}`;
        const dependentKey = `emoji__tone_${tone}`;

        defineProperty(this, propertyName, filterBy(dependentKey, 'category', category));
      });
    });
  },

  _prepareEmojo(emojiDefs, id) {
    const emojo = emojiDefs[id];

    let title = emojo.shortname;

    if (id.replace(/_/g, ' ') !== emojo.name) {
      title += ` (${emojo.name})`;
    }

    // Prepare search field
    const filterable =
      [
        [emojo.name, emojo.code_decimal, emojo.shortname, emojo.unicode],
        emojo.aliases,
        emojo.aliases_ascii,
        emojo.keywords
      ]
        .reduce((result, arr) => result.concat(arr), []) // flatten
        .filter(item => item && item.length) // remove empty
        .join(' ');

    setProperties(emojo, {
      id,
      title,
      filterable
    });

    return emojo;
  }
});
