import InjectEmojis from 'dummy/helpers/inject-emojis';
import { module, test } from 'qunit';
import { withChai } from 'ember-cli-chai/qunit';
import isHTMLSafe from 'ember-string-ishtmlsafe-polyfill';

module('Unit | Helper | inject emojis', {
  beforeEach() {
    this.subject = InjectEmojis.create();
  }
});

let m;

test('it should inject emoji into a simple string', withChai(function(expect) {
  const inputStr = "<p>Foo :scream_cat: 🤓 <span>Bar</span></p>";
  const expected = "<p>Foo <img class=\"emojione\" alt=\"🙀\" title=\":scream_cat:\" src=\"https://cdn.jsdelivr.net/emojione/assets/png/1f640.png?v=2.2.7\"/> <img class=\"emojione\" alt=\"🤓\" title=\":nerd_face:\" src=\"https://cdn.jsdelivr.net/emojione/assets/png/1f913.png?v=2.2.7\"/> <span>Bar</span></p>";
  const result = this.subject.compute([inputStr]);

  m = "Result should contain emojis";
  expect(result.toString(), m).equal(expected);

  m = "Result should be html-safe";
  expect(isHTMLSafe(result), m).true;
}));

