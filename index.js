/* globals module */
'use strict';

module.exports = {
  name: 'ember-emojione',

  included(app) {
    this._super.included(app);

    if (!app.options['ember-emojione'] || !app.options['ember-emojione'].skipBowerImport) {
      app.import(`${app.bowerDirectory}/emojione-js/index.js`);
    }

  }
};
