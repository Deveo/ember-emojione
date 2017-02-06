/* eslint-env node */
const RSVP      = require('rsvp');
const simpleGit = require('simple-git')();

// For details on each option run `ember help release`
module.exports = {
  // local: true,
  // remote: 'some_remote',
  // annotation: "Release %@",
  // message: "Bumped version to %@",
  // manifest: [ 'package.json', 'bower.json', 'someconfig.json' ],
  // publish: true,
  // strategy: 'date',
  // format: 'YYYY-MM-DD',
  // timezone: 'America/Los_Angeles',
  //
  beforeCommit(/*project, versions*/) {
    require('../lib/compile-css-on-require');

    return new RSVP.Promise(function(resolve) {
      simpleGit.add(['vendor/ember-emojione.css'], function() {
        resolve();
      });
    });
  }
};
