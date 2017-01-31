import Service from 'ember-service';
import computed, {filterBy/*, sort*/} from 'ember-computed';
import emojiDefs from 'ember-emojione/emoji-defs';
import {assert} from  'ember-metal/utils';
import {A} from 'ember-array/utils';
import {setProperties} from 'ember-metal/set';
import {htmlSafe} from 'ember-string';
import getFromSelfCP from 'ember-emojione/cp-macros/get-from-self';
import templateString from 'ember-computed-template-string';

import {default as EObject} from 'ember-object';
const  O = EObject.create.bind(EObject);



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

  // emojiSortOrder: ['id'],
  // emoji:          sort('emojiUnsorted', 'emojiSortOrder'),

  people:   filterBy('emoji', 'category', 'people'),
  nature:   filterBy('emoji', 'category', 'nature'),
  food:     filterBy('emoji', 'category', 'food'),
  activity: filterBy('emoji', 'category', 'activity'),
  travel:   filterBy('emoji', 'category', 'travel'),
  objects:  filterBy('emoji', 'category', 'objects'),
  symbols:  filterBy('emoji', 'category', 'symbols'),
  flags:    filterBy('emoji', 'category', 'flags'),
  regional: filterBy('emoji', 'category', 'regional'),
  modifier: filterBy('emoji', 'category', 'modifier'),

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

  people__tone_default:   filterBy('emoji__tone_default', 'category', 'people'),
  nature__tone_default:   filterBy('emoji__tone_default', 'category', 'nature'),
  food__tone_default:     filterBy('emoji__tone_default', 'category', 'food'),
  activity__tone_default: filterBy('emoji__tone_default', 'category', 'activity'),
  travel__tone_default:   filterBy('emoji__tone_default', 'category', 'travel'),
  objects__tone_default:  filterBy('emoji__tone_default', 'category', 'objects'),
  symbols__tone_default:  filterBy('emoji__tone_default', 'category', 'symbols'),
  flags__tone_default:    filterBy('emoji__tone_default', 'category', 'flags'),
  regional__tone_default: filterBy('emoji__tone_default', 'category', 'regional'),
  modifier__tone_default: filterBy('emoji__tone_default', 'category', 'modifier'),

  people__tone_1:   filterBy('emoji__tone_1', 'category', 'people'),
  nature__tone_1:   filterBy('emoji__tone_1', 'category', 'nature'),
  food__tone_1:     filterBy('emoji__tone_1', 'category', 'food'),
  activity__tone_1: filterBy('emoji__tone_1', 'category', 'activity'),
  travel__tone_1:   filterBy('emoji__tone_1', 'category', 'travel'),
  objects__tone_1:  filterBy('emoji__tone_1', 'category', 'objects'),
  symbols__tone_1:  filterBy('emoji__tone_1', 'category', 'symbols'),
  flags__tone_1:    filterBy('emoji__tone_1', 'category', 'flags'),
  regional__tone_1: filterBy('emoji__tone_1', 'category', 'regional'),
  modifier__tone_1: filterBy('emoji__tone_1', 'category', 'modifier'),

  people__tone_2:   filterBy('emoji__tone_2', 'category', 'people'),
  nature__tone_2:   filterBy('emoji__tone_2', 'category', 'nature'),
  food__tone_2:     filterBy('emoji__tone_2', 'category', 'food'),
  activity__tone_2: filterBy('emoji__tone_2', 'category', 'activity'),
  travel__tone_2:   filterBy('emoji__tone_2', 'category', 'travel'),
  objects__tone_2:  filterBy('emoji__tone_2', 'category', 'objects'),
  symbols__tone_2:  filterBy('emoji__tone_2', 'category', 'symbols'),
  flags__tone_2:    filterBy('emoji__tone_2', 'category', 'flags'),
  regional__tone_2: filterBy('emoji__tone_2', 'category', 'regional'),
  modifier__tone_2: filterBy('emoji__tone_2', 'category', 'modifier'),

  people__tone_3:   filterBy('emoji__tone_3', 'category', 'people'),
  nature__tone_3:   filterBy('emoji__tone_3', 'category', 'nature'),
  food__tone_3:     filterBy('emoji__tone_3', 'category', 'food'),
  activity__tone_3: filterBy('emoji__tone_3', 'category', 'activity'),
  travel__tone_3:   filterBy('emoji__tone_3', 'category', 'travel'),
  objects__tone_3:  filterBy('emoji__tone_3', 'category', 'objects'),
  symbols__tone_3:  filterBy('emoji__tone_3', 'category', 'symbols'),
  flags__tone_3:    filterBy('emoji__tone_3', 'category', 'flags'),
  regional__tone_3: filterBy('emoji__tone_3', 'category', 'regional'),
  modifier__tone_3: filterBy('emoji__tone_3', 'category', 'modifier'),

  people__tone_4:   filterBy('emoji__tone_4', 'category', 'people'),
  nature__tone_4:   filterBy('emoji__tone_4', 'category', 'nature'),
  food__tone_4:     filterBy('emoji__tone_4', 'category', 'food'),
  activity__tone_4: filterBy('emoji__tone_4', 'category', 'activity'),
  travel__tone_4:   filterBy('emoji__tone_4', 'category', 'travel'),
  objects__tone_4:  filterBy('emoji__tone_4', 'category', 'objects'),
  symbols__tone_4:  filterBy('emoji__tone_4', 'category', 'symbols'),
  flags__tone_4:    filterBy('emoji__tone_4', 'category', 'flags'),
  regional__tone_4: filterBy('emoji__tone_4', 'category', 'regional'),
  modifier__tone_4: filterBy('emoji__tone_4', 'category', 'modifier'),

  people__tone_5:   filterBy('emoji__tone_5', 'category', 'people'),
  nature__tone_5:   filterBy('emoji__tone_5', 'category', 'nature'),
  food__tone_5:     filterBy('emoji__tone_5', 'category', 'food'),
  activity__tone_5: filterBy('emoji__tone_5', 'category', 'activity'),
  travel__tone_5:   filterBy('emoji__tone_5', 'category', 'travel'),
  objects__tone_5:  filterBy('emoji__tone_5', 'category', 'objects'),
  symbols__tone_5:  filterBy('emoji__tone_5', 'category', 'symbols'),
  flags__tone_5:    filterBy('emoji__tone_5', 'category', 'flags'),
  regional__tone_5: filterBy('emoji__tone_5', 'category', 'regional'),
  modifier__tone_5: filterBy('emoji__tone_5', 'category', 'modifier'),

  currentCategoryName_people:   templateString("people__tone_${currentSkinTone}"),
  currentCategoryName_nature:   templateString("nature__tone_${currentSkinTone}"),
  currentCategoryName_food:     templateString("food__tone_${currentSkinTone}"),
  currentCategoryName_activity: templateString("activity__tone_${currentSkinTone}"),
  currentCategoryName_travel:   templateString("travel__tone_${currentSkinTone}"),
  currentCategoryName_objects:  templateString("objects__tone_${currentSkinTone}"),
  currentCategoryName_symbols:  templateString("symbols__tone_${currentSkinTone}"),
  currentCategoryName_flags:    templateString("flags__tone_${currentSkinTone}"),

  currentSkinToneEmoji__people:   getFromSelfCP('currentCategoryName_people'),
  currentSkinToneEmoji__nature:   getFromSelfCP('currentCategoryName_nature'),
  currentSkinToneEmoji__food:     getFromSelfCP('currentCategoryName_food'),
  currentSkinToneEmoji__activity: getFromSelfCP('currentCategoryName_activity'),
  currentSkinToneEmoji__travel:   getFromSelfCP('currentCategoryName_travel'),
  currentSkinToneEmoji__objects:  getFromSelfCP('currentCategoryName_objects'),
  currentSkinToneEmoji__symbols:  getFromSelfCP('currentCategoryName_symbols'),
  currentSkinToneEmoji__flags:    getFromSelfCP('currentCategoryName_flags'),

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