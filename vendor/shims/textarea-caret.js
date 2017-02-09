(function () {
  /* eslint-env node, amd */

  function generateModule(name, values) {
    define(name, [], function () {
      'use strict';

      return values;
    });
  }

  generateModule('textarea-caret', { default: window.getCaretCoordinates });
})();
