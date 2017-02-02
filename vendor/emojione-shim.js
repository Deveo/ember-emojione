(function () {
  /* globals define, emojione */

  function generateModule(name, values) {
    define(name, [], function () {
      'use strict';

      return values;
    });
  }

  generateModule('emojione', { default: emojione });
})();
