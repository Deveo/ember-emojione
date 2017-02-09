import on from 'ember-evented/on';
import {keyDown/*, keyUp*/} from 'ember-keyboard';

export default function onKeyDown(key, callback) {
  return on(keyDown(key), function (event) {
    if (!this.get('$input').is(':focus')) return;
    if (!this.get('_assistFilterInput'))  return;

    event.preventDefault();
    return callback.call(this, event);
  });
}
