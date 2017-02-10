import on from 'ember-evented/on';
import {keyDown} from 'ember-keyboard';

export default function onKey(...args) {
  const callbackOrEventName = args.pop();
  const keyEvents           = args.map(keyDown);

  return on(...keyEvents, function (event) {
    if (!this.get('$input').is(':focus')) return;
    if (!this.get('_assistFilterInput'))  return;

    event.preventDefault();

    if (typeof callbackOrEventName === "function") {
      return callbackOrEventName.call(this, event);
    }

    this.get('_keyPressNotifier').trigger(callbackOrEventName);
  });
}
