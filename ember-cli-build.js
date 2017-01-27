/* global require, module, require, __dirname */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

const path = require('path');
const fs = require('fs');
const emojiDefFileName = path.join(__dirname, 'bower_components/emojione-defs/index.json');
if (!fs.existsSync(emojiDefFileName)) throw new Error(`Missing asset: ${emojiDefFileName}`);
const emojiDefStr = fs.readFileSync(emojiDefFileName, 'utf8');

module.exports = function(defaults) {
  const app = new EmberAddon(defaults, {
    // Add options here
    "ember-cli-babel": {
      includePolyfill: true
    },

    fileCreator: [
      {
        filename: '/fixtures/emojione-defs.js',
        content: `export default ${emojiDefStr}`
      }
    ]
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
