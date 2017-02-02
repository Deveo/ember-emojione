import InjectEmoji, { injectEmoji } from 'dummy/helpers/inject-emoji';
import { module, test/*, skip*/ } from 'qunit';
import { withChai } from 'ember-cli-chai/qunit';
import { htmlSafe } from 'ember-string';
import isHTMLSafe from 'ember-string-ishtmlsafe-polyfill';
import config from 'ember-get-config';



module('Unit | Helper | inject emoji', {
  beforeEach() {
    this.subject = InjectEmoji.create();
  },

  afterEach() {
    delete config['ember-emojione'];
  }
});

let m;



test('it should inject emoji into a simple string', withChai(function(expect) {
  const inputStr = "<p>Foo :scream_cat: 🤓 <span>Bar :)</span></p>";
  const expected = "<p>Foo <span class=\"emojione emojione-1f640\" title=\":scream_cat:\">🙀</span> <span class=\"emojione emojione-1f913\" title=\":nerd_face:\">🤓</span> <span>Bar :)</span></p>";
  const result   = this.subject.compute([inputStr]);

  m = "Result should contain emoji";
  expect(result, m).equal(expected);
}));



test('it should inject emoji into an html-safe string, returning an html-safe string', withChai(function(expect) {
  const inputStr = htmlSafe("<p>Foo :scream_cat: 🤓 <span>Bar :)</span></p>");
  const expected = "<p>Foo <span class=\"emojione emojione-1f640\" title=\":scream_cat:\">🙀</span> <span class=\"emojione emojione-1f913\" title=\":nerd_face:\">🤓</span> <span>Bar :)</span></p>";
  const result   = this.subject.compute([inputStr]);

  m = "Result should contain emoji";
  expect(result.toString(), m).equal(expected);

  m = "Result should be html-safe";
  expect(isHTMLSafe(result), m).true;
}));



test('it should respect emojione settings from env', withChai(function(expect) {
  config['ember-emojione'] = {
    emojione: {
      imagePathSVG:  'SVG.svg',
      imageType:     'svg',
      imageTitleTag: false,
      unicodeAlt:    false,
      ascii:         true,
    }
  };

  const inputStr = "<p>Foo :scream_cat: 🤓 <span>Bar :)</span></p>";
  const expected = "<p>Foo <object class=\"emojione\" data=\"SVG.svg1f640.svg?v=2.2.7\" type=\"image/svg+xml\" standby=\":scream_cat:\">:scream_cat:</object> <img class=\"emojione\" alt=\":nerd_face:\"  src=\"SVG.svg1f913.svg?v=2.2.7\"/> <span>Bar :)</span></p>";
  const result   = this.subject.compute([inputStr], { emojione: { sprites: false } });

  expect(result).equal(expected);
}));



test('it should respect emojione settings from named argument `emojione`', withChai(function(expect) {
  const options = {
    emojione: {
      imagePathSVG:  'SVGLOL',
      imageType:     'svg',
      imageTitleTag: false,
      sprites:       false,
      unicodeAlt:    false,
      ascii:         true,
    }
  };

  const inputStr = "<p>Foo :scream_cat: 🤓 <span>Bar :)</span></p>";
  const expected = "<p>Foo <object class=\"emojione\" data=\"SVGLOL1f640.svg?v=2.2.7\" type=\"image/svg+xml\" standby=\":scream_cat:\">:scream_cat:</object> <img class=\"emojione\" alt=\":nerd_face:\"  src=\"SVGLOL1f913.svg?v=2.2.7\"/> <span>Bar :)</span></p>";
  const result   = this.subject.compute([inputStr], options);

  expect(result).equal(expected);
}));



test('use from JS', withChai(function(expect) {
  const inputStr = ":D";
  const options  = { emojione: { ascii: true } };
  const expected = "<span class=\"emojione emojione-1f603\"  title=\":D\">😃</span>";
  const result   = injectEmoji(inputStr, options);

  expect(result).equal(expected);
}));



test('it should parse code blocks', withChai(function(expect) {
  const inputStr = "<p>Foo :scream_cat: 🤓 <em>Bar :)</em> <code>some :pig_nose: code</code></p>\n<pre><code class=\"language-js\">\nasdf :crocodile: asdf\n</code></pre>";
  const expected = "<p>Foo <span class=\"emojione emojione-1f640\" title=\":scream_cat:\">🙀</span> <span class=\"emojione emojione-1f913\" title=\":nerd_face:\">🤓</span> <em>Bar :)</em> <code>some <span class=\"emojione emojione-1f43d\" title=\":pig_nose:\">🐽</span> code</code></p>\n<pre><code class=\"language-js\">\nasdf <span class=\"emojione emojione-1f40a\" title=\":crocodile:\">🐊</span> asdf\n</code></pre>";
  const options  = { regexToSkip: false };
  const result   = this.subject.compute([inputStr], options);

  expect(result).equal(expected);
}));



test('it should ignore code blocks', withChai(function(expect) {
  const inputStr = "<p>Foo :scream_cat: 🤓 <em>Bar :)</em> <code>some :pig_nose: code</code></p>\n<pre><code class=\"language-js\">\nasdf :crocodile: asdf\n</code></pre>";
  const expected = "<p>Foo <span class=\"emojione emojione-1f640\" title=\":scream_cat:\">🙀</span> <span class=\"emojione emojione-1f913\" title=\":nerd_face:\">🤓</span> <em>Bar :)</em> <code>some :pig_nose: code</code></p>\n<pre><code class=\"language-js\">\nasdf :crocodile: asdf\n</code></pre>";
  const result   = this.subject.compute([inputStr]);

  expect(result).equal(expected);
}));



test('edge cases', withChai(function(expect) {
  m = "Empty string";
  expect(this.subject.compute(['']), m).equal('');

  m = "`false`";
  expect(this.subject.compute([null]), m).equal('');

  m = "`null`";
  expect(this.subject.compute([null]), m).equal('');

  m = "`undefined` 1";
  expect(this.subject.compute([undefined]), m).equal('');

  m = "`undefined` 2";
  expect(this.subject.compute([]), m).equal('');

  m = "number";
  expect(this.subject.compute([2]), m).equal('2');
}));
