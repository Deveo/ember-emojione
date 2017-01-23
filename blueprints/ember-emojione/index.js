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

  _readEmojiOneJsUrlFromBowerJson() {
    const jsonFileName = path.join(__dirname, '../../bower.json');
    const jsonString   = fs.readFileSync(jsonFileName, 'utf8');
    const json         = JSON.parse(jsonString);
    return json.dependencies['emojione-js'];
  },

  afterInstall(/* options */) {
    const emojiOneJsUrl = this._readEmojiOneJsUrlFromBowerJson();
    this.addBowerPackageToProject('emojione-js', emojiOneJsUrl);
  }
};
