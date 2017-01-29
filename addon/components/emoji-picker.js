import Component from 'ember-component';
import layout from '../templates/components/emoji-picker';
import service from 'ember-service/inject';

export default Component.extend({
  layout,

  emojiService: service('emoji'),

  actions: {
    setTone(tone) {
      this
        .get('emojiService')
        .set('currentSkinTone', tone);
    }
  }
});
