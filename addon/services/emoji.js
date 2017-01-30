import Service from 'ember-service';
import computed, {filterBy/*, sort*/} from 'ember-computed';
import emojiDefs from 'ember-emojione/emoji-defs';
import {assert} from  'ember-metal/utils';
import {A} from 'ember-array/utils';
import {setProperties} from 'ember-metal/set';



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

  categories: [
    {id: "people",   name: "Smileys & People"},
    {id: "nature",   name: "Animals & Nature"},
    {id: "food",     name: "Food & Drink"},
    {id: "activity", name: "Activity"},
    {id: "travel",   name: "Travel & Places"},
    {id: "objects",  name: "Objects"},
    {id: "symbols",  name: "Symbols"},
    {id: "flags",    name: "Flags"},
    // "regional",
    // "modifier",
  ],

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

  _prepareEmojo(emojiDefs, id) {
    const emojo = emojiDefs[id];
    emojo.id    = id;

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

    setProperties(emojo, {filterable});

    return emojo;
  }
});
