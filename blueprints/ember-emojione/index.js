/* globals __dirname, module, require */

const fs   = require('fs');
const path = require('path');

module.exports = {
  description: '',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  normalizeEntityName() {
    // allows to run ember g ember-cli-emojione and not blow up
    // because ember cli normally expects the format
    // ember generate <entityName> <blueprint>
  },

  _readEmojiOneJsUrlFromBowerJson() {
    const jsonFileName = path.join(__dirname, '../../bower.json');
    const jsonString   = fs.readFileSync(jsonFileName, 'utf8');
    const json         = JSON.parse(jsonString);
    return json.dependencies['emojione-js'];
  },

  afterInstall(/* options */) {
    const emojiOneJsUrl = this._readEmojiOneJsUrlFromBowerJson();
    this.addBowerPackageToProject('emojione-js', 'https://raw.githubusercontent.com/Ranks/emojione/v2.2.7/lib/js/emojione.js');
  }
};
