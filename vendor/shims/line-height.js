(function () {
  /* eslint-env node, amd */

  function generateModule(name, values) {
    define(name, [], function () {
      'use strict';

      return values;
    });
  }

  generateModule('line-height', { default: window.lineHeight });
})();
