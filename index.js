/* globals module */
'use strict';

module.exports = {
  name: 'ember-emojione',

  included(app) {
    this._super.included(app);

    app.import(`${app.bowerDirectory}/emojione-js/index.js`);
    app.import('vendor/emojione.js', {
      exports: {
        emojione: ['default']
      }
    });
  }
};
