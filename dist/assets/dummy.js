"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'ember-application', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _ember, _emberApplication, _dummyResolver, _emberLoadInitializers, _dummyConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _emberApplication['default'].extend({
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix,
    Resolver: _dummyResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _dummyConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('dummy/components/auto-focus', ['exports', 'ember-auto-focus/components/auto-focus'], function (exports, _emberAutoFocusComponentsAutoFocus) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAutoFocusComponentsAutoFocus['default'];
    }
  });
});
define('dummy/components/click-outside', ['exports', 'ember-click-outside/components/click-outside'], function (exports, _emberClickOutsideComponentsClickOutside) {
  exports['default'] = _emberClickOutsideComponentsClickOutside['default'];
});
define('dummy/components/emoji-picker-toggler', ['exports', 'ember-emojione/components/emoji-picker-toggler'], function (exports, _emberEmojioneComponentsEmojiPickerToggler) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojioneComponentsEmojiPickerToggler['default'];
    }
  });
});
define('dummy/components/emoji-picker-wrapper', ['exports', 'ember-emojione/components/emoji-picker-wrapper'], function (exports, _emberEmojioneComponentsEmojiPickerWrapper) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojioneComponentsEmojiPickerWrapper['default'];
    }
  });
});
define('dummy/components/emoji-picker', ['exports', 'ember-emojione/components/emoji-picker'], function (exports, _emberEmojioneComponentsEmojiPicker) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojioneComponentsEmojiPicker['default'];
    }
  });
});
define('dummy/components/emoji-picker/category', ['exports', 'ember-emojione/components/emoji-picker/category'], function (exports, _emberEmojioneComponentsEmojiPickerCategory) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojioneComponentsEmojiPickerCategory['default'];
    }
  });
});
define('dummy/components/emoji-picker/label', ['exports', 'ember-emojione/components/emoji-picker/label'], function (exports, _emberEmojioneComponentsEmojiPickerLabel) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojioneComponentsEmojiPickerLabel['default'];
    }
  });
});
define('dummy/components/emoji-picker/tone', ['exports', 'ember-emojione/components/emoji-picker/tone'], function (exports, _emberEmojioneComponentsEmojiPickerTone) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojioneComponentsEmojiPickerTone['default'];
    }
  });
});
define('dummy/components/emoji-typing-assistance', ['exports', 'ember-emojione/components/emoji-typing-assistance'], function (exports, _emberEmojioneComponentsEmojiTypingAssistance) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojioneComponentsEmojiTypingAssistance['default'];
    }
  });
});
define('dummy/components/scroll-to', ['exports', 'ember-scroll-to-mk2/components/scroll-to'], function (exports, _emberScrollToMk2ComponentsScrollTo) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberScrollToMk2ComponentsScrollTo['default'];
    }
  });
});
define('dummy/controllers/application', ['exports', 'ember-controller', 'ember-computed', 'ember-string'], function (exports, _emberController, _emberComputed, _emberString) {
  exports['default'] = _emberController['default'].extend({
    inputStr: 'OMG! :scream:',

    inputStrHtmlSafe: (0, _emberComputed['default'])('inputStr', function () {
      var inputStr = this.get('inputStr');
      return (0, _emberString.htmlSafe)(inputStr);
    })
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/-private/cp-macros/template-string.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/-private/cp-macros/template-string.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/-private/cp-macros/template-string.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/-private/helpers/eeo-and.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/-private/helpers/eeo-and.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/-private/helpers/eeo-and.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/-private/helpers/eeo-eq.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/-private/helpers/eeo-eq.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/-private/helpers/eeo-eq.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/-private/helpers/eeo-exists.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/-private/helpers/eeo-exists.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/-private/helpers/eeo-exists.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/-private/helpers/eeo-html-safe.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/-private/helpers/eeo-html-safe.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/-private/helpers/eeo-html-safe.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/-private/mixins/dynamic-attribute-bindings.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/-private/mixins/dynamic-attribute-bindings.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/-private/mixins/dynamic-attribute-bindings.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/-private/utils/constants.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/-private/utils/constants.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/-private/utils/constants.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/-private/utils/on-key.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/-private/utils/on-key.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/-private/utils/on-key.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/components/emoji-picker-toggler.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/components/emoji-picker-toggler.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/components/emoji-picker-toggler.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/components/emoji-picker-wrapper.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/components/emoji-picker-wrapper.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/components/emoji-picker-wrapper.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/components/emoji-picker.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/components/emoji-picker.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/components/emoji-picker.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/components/emoji-picker/category.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/components/emoji-picker/category.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/components/emoji-picker/category.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/components/emoji-picker/label.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/components/emoji-picker/label.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/components/emoji-picker/label.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/components/emoji-picker/tone.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/components/emoji-picker/tone.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/components/emoji-picker/tone.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/components/emoji-typing-assistance.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/components/emoji-typing-assistance.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/components/emoji-typing-assistance.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/helpers/inject-emoji.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/helpers/inject-emoji.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/helpers/inject-emoji.js should pass ESLint.\n');
  });
});
define('dummy/ember-emojione/tests/modules/ember-emojione/services/emoji.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint - modules/ember-emojione/services/emoji.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-emojione/services/emoji.js should pass ESLint.\n');
  });
});
define('dummy/helpers/app-version', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _dummyConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('dummy/helpers/eeo-and', ['exports', 'ember-emojione/-private/helpers/eeo-and'], function (exports, _emberEmojionePrivateHelpersEeoAnd) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojionePrivateHelpersEeoAnd['default'];
    }
  });
  Object.defineProperty(exports, 'eeoAnd', {
    enumerable: true,
    get: function get() {
      return _emberEmojionePrivateHelpersEeoAnd.eeoAnd;
    }
  });
});
define('dummy/helpers/eeo-eq', ['exports', 'ember-emojione/-private/helpers/eeo-eq'], function (exports, _emberEmojionePrivateHelpersEeoEq) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojionePrivateHelpersEeoEq['default'];
    }
  });
  Object.defineProperty(exports, 'eeoEq', {
    enumerable: true,
    get: function get() {
      return _emberEmojionePrivateHelpersEeoEq.eeoEq;
    }
  });
});
define('dummy/helpers/eeo-exists', ['exports', 'ember-emojione/-private/helpers/eeo-exists'], function (exports, _emberEmojionePrivateHelpersEeoExists) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojionePrivateHelpersEeoExists['default'];
    }
  });
  Object.defineProperty(exports, 'eeoExists', {
    enumerable: true,
    get: function get() {
      return _emberEmojionePrivateHelpersEeoExists.eeoExists;
    }
  });
});
define('dummy/helpers/eeo-html-safe', ['exports', 'ember-emojione/-private/helpers/eeo-html-safe'], function (exports, _emberEmojionePrivateHelpersEeoHtmlSafe) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojionePrivateHelpersEeoHtmlSafe['default'];
    }
  });
  Object.defineProperty(exports, 'eeoHtmlSafe', {
    enumerable: true,
    get: function get() {
      return _emberEmojionePrivateHelpersEeoHtmlSafe.eeoHtmlSafe;
    }
  });
});
define('dummy/helpers/inject-emoji', ['exports', 'ember-emojione/helpers/inject-emoji'], function (exports, _emberEmojioneHelpersInjectEmoji) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojioneHelpersInjectEmoji['default'];
    }
  });
  Object.defineProperty(exports, 'injectEmoji', {
    enumerable: true,
    get: function get() {
      return _emberEmojioneHelpersInjectEmoji.injectEmoji;
    }
  });
});
define('dummy/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'dummy/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _dummyConfigEnvironment) {
  var _config$APP = _dummyConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/ember-keyboard-first-responder-inputs', ['exports', 'ember-keyboard/initializers/ember-keyboard-first-responder-inputs'], function (exports, _emberKeyboardInitializersEmberKeyboardFirstResponderInputs) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberKeyboardInitializersEmberKeyboardFirstResponderInputs['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberKeyboardInitializersEmberKeyboardFirstResponderInputs.initialize;
    }
  });
});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_dummyConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _dummyConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_dummyConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('dummy/router', ['exports', 'ember-router', 'dummy/config/environment'], function (exports, _emberRouter, _dummyConfigEnvironment) {

  var MyRouter = _emberRouter['default'].extend({
    location: _dummyConfigEnvironment['default'].locationType,
    rootURL: _dummyConfigEnvironment['default'].rootURL
  });

  MyRouter.map(function () {});

  exports['default'] = MyRouter;
});
define('dummy/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('dummy/services/emoji', ['exports', 'ember-emojione/services/emoji'], function (exports, _emberEmojioneServicesEmoji) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberEmojioneServicesEmoji['default'];
    }
  });
});
define('dummy/services/keyboard', ['exports', 'ember-keyboard/services/keyboard'], function (exports, _emberKeyboardServicesKeyboard) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberKeyboardServicesKeyboard['default'];
    }
  });
});
define("dummy/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZsRh3Dl0", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"ember-emojione demo\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/Deveo/ember-emojione\"],[\"flush-element\"],[\"text\",\"Source on GitHub\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Output\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"inject-emoji\"],[[\"get\",[\"inputStrHtmlSafe\"]]],null],true],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Input\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"emoji-picker-wrapper\"],null,[[\"text\",\"inputSelector\",\"emojiInsertedAction\"],[[\"get\",[\"inputStr\"]],\"textarea\",[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"inputStr\"]]],null]],null]]],0],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Source\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"pre\",[]],[\"flush-element\"],[\"text\",\"inputStr: 'OMG! :scream:',\\n\\ninputStrHtmlSafe: computed('inputStr', function () {\\n  const inputStr = this.get('inputStr');\\n  return htmlSafe(inputStr);\\n}),\\n\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n{{#emoji-picker-wrapper\\n  text                = inputStr\\n  inputSelector       = \\\"textarea\\\"\\n  emojiInsertedAction = (action (mut inputStr))\\n  as |emojiPicker emojiPickerToggler emojiAssist|\\n}}\\n  <span style=\\\"position: relative; display: inline-block;\\\" class=\\\"input-wrapper\\\">\\n    {{textarea value=inputStr}}\\n    {{component emojiAssist}}\\n  </span>\\n\\n\\n  <span class=\\\"togglePickerWrapper\\\">\\n    {{component emojiPickerToggler}}\\n\\n    {{component emojiPicker}}\\n  </span>\\n{{/emoji-picker-wrapper}}\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"position: relative; display: inline-block;\"],[\"static-attr\",\"class\",\"input-wrapper\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"value\"],[[\"get\",[\"inputStr\"]]]]],false],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"component\"],[[\"get\",[\"emojiAssist\"]]],null],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"togglePickerWrapper\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"component\"],[[\"get\",[\"emojiPickerToggler\"]]],null],false],[\"text\",\"\\n\\n    \"],[\"append\",[\"helper\",[\"component\"],[[\"get\",[\"emojiPicker\"]]],null],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"emojiPicker\",\"emojiPickerToggler\",\"emojiAssist\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/application.hbs" } });
});
define('dummy/utils/get-cmd-key', ['exports', 'ember-keyboard/utils/get-cmd-key'], function (exports, _emberKeyboardUtilsGetCmdKey) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberKeyboardUtilsGetCmdKey['default'];
    }
  });
});
define('dummy/utils/listener-name', ['exports', 'ember-keyboard/utils/listener-name'], function (exports, _emberKeyboardUtilsListenerName) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberKeyboardUtilsListenerName['default'];
    }
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("dummy/app")["default"].create({"name":"ember-emojione","version":"1.0.0-alpha.0"});
}

/* jshint ignore:end */
//# sourceMappingURL=dummy.map
