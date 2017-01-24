import InjectEmoji from 'dummy/helpers/inject-emoji';
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
  const inputStr = htmlSafe("<p>Foo :scream_cat: 🤓 <span>Bar :)</span></p>");
  const expected = "<p>Foo <img class=\"emojione\" alt=\"🙀\" title=\":scream_cat:\" src=\"https://cdn.jsdelivr.net/emojione/assets/png/1f640.png?v=2.2.7\"/> <img class=\"emojione\" alt=\"🤓\" title=\":nerd_face:\" src=\"https://cdn.jsdelivr.net/emojione/assets/png/1f913.png?v=2.2.7\"/> <span>Bar :)</span></p>";
  const result = this.subject.compute([inputStr]);

  m = "Result should contain emoji";
  expect(result.toString(), m).equal(expected);

  m = "Result should be html-safe";
  expect(isHTMLSafe(result), m).true;
}));

test('it should error out on unsafe string', withChai(function(expect) {
  const inputStr = "<p>Foo :scream_cat: 🤓 <span>Bar :)</span></p>";

  m = `inject-emoji was passed an unsafe string: "${inputStr}"`;
  expect(() => {
    this.subject.compute([inputStr]);
  }, m)
    .throw(m);
}));

test('it should respect emojione settings from env', withChai(function(expect) {
  config['ember-emojione'] = {
    emojione: {
      imagePathSVGSprites: 'SVGSPRITE.svg',
      imageType:           'svg',
      imageTitleTag:       false,
      sprites:             true,
      unicodeAlt:          false,
      ascii:               true,
    }
  };

  const inputStr = htmlSafe("<p>Foo :scream_cat: 🤓 <span>Bar :)</span></p>");
  const expected = "<p>Foo <svg class=\"emojione\"><description>:scream_cat:</description><use xlink:href=\"SVGSPRITE.svg#emoji-1f640\"></use></svg> <svg class=\"emojione\"><description><svg class=\"emojione\"><description>:nerd_face:</description><use xlink:href=\"SVGSPRITE.svg#emoji-1f913\"></use></svg></description><use xlink:href=\"SVGSPRITE.svg#emoji-1f913\"></use></svg> <span>Bar :)</span></p>";
  const result = this.subject.compute([inputStr]);

  expect(result.toString()).equal(expected);
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

  const inputStr = htmlSafe("<p>Foo :scream_cat: 🤓 <span>Bar :)</span></p>");
  const expected = "<p>Foo <object class=\"emojione\" data=\"SVGLOL1f640.svg?v=2.2.7\" type=\"image/svg+xml\" standby=\":scream_cat:\">:scream_cat:</object> <img class=\"emojione\" alt=\":nerd_face:\"  src=\"SVGLOL1f913.svg?v=2.2.7\"/> <span>Bar :)</span></p>";
  const result = this.subject.compute([inputStr], options);

  expect(result.toString()).equal(expected);
}));

