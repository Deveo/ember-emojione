import Component from 'ember-component';
import layout from '../templates/components/emoji-picker';
import service from 'ember-service/inject';
import {debounce} from 'ember-runloop';


export default Component.extend({

  selectAction: undefined,



  emojiService: service('emoji'),



  layout,
  classNames: ['eeo-emojiPicker'],
  filterInput: '',



  _applyFilterInput(filterInput) {
    this.setProperties({filterInput});
  },



  actions: {
    setTone(tone) {
      this
        .get('emojiService')
        .set('currentSkinTone', tone);
    },

    filter(filterInput) {
      debounce(this, this._applyFilterInput, filterInput, 400);
    }
  }
});
