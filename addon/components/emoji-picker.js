import Component from 'ember-component';
import layout from '../templates/components/emoji-picker';
import service from 'ember-service/inject';

export default Component.extend({

  selectAction: undefined,


  layout,

  emojiService: service('emoji'),


  classNames: ['eeo-emojiPicker'],


  actions: {
    setTone(tone) {
      this
        .get('emojiService')
        .set('currentSkinTone', tone);
    }
  }
});
