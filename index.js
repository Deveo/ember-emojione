/* globals module, require */
'use strict';

const Funnel     = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const jsonModule = require('broccoli-json-module');


module.exports = {
  name: 'ember-emojione',



  _defaultOptions: {
    separatePackages:       true,

    shouldImportCss:        true,
    shouldImportDefs:       true,

    shouldIncludePngSprite: true,
    shouldIncludeSvgSprite: false,
    shouldIncludePngs:      false,
    shouldIncludeSvgs:      false,

    packageNameMain:        'emojione',
    packageNameJs:          'emojione-js',
    packageNameCss:         'emojione-css',
    packageNameDefs:        'emojione-defs',
    packageNamePngSprite:   'emojione-png',
    packageNameSvgSprite:   'emojione-svg',
  },



  _mergeOptions(app) {
    const defaultOptions  = this._defaultOptions;
    const overrideOptions = app.options['ember-emojione'] || {};

    return Object.assign({}, defaultOptions, overrideOptions);
  },


  // Import JS and CSS
  included(app) {
    this._super.included(app);

    const opts    = this._mergeOptions(app);
    const sprites = opts.shouldIncludePngSprite || opts.shouldIncludeSvgSprite;

    this._emojiOptions   = opts;
    this._bowerDirectory = app.bowerDirectory;

    // Importing JS library
    const jsPath =
      opts.separatePackages
      ? `${opts.packageNameJs}/index.js`
      : `${opts.packageNameMain}/lib/js/emojione.js`;

    app.import(`${app.bowerDirectory}/${jsPath}`);


    // Importing CSS
    if (opts.shouldImportCss) {
      const cssPath =
        opts.separatePackages ? `${opts.packageNameCss}/index.css` :
        sprites               ? `${opts.packageNameMain}/assets/sprites/emojione.sprites.css` :
                                `${opts.packageNameMain}/assets/css/emojione.css`;

      app.import(`${app.bowerDirectory}/${cssPath}`);
    }
  },



  // Include assets
  treeForPublic(tree) {
    const newTrees = [];
    const opts     = this._emojiOptions;
    const destDir  = 'assets/emojione';

    if (tree) newTrees.push(tree);

    const baseDir =
      opts.separatePackages
      ? opts.packageNamePngSprite
      : `${opts.packageNameMain}/assets/sprites`;

    // Including PNG sprite
    if (opts.shouldIncludePngSprite) {
      const currentTree = new Funnel(`${this._bowerDirectory}/${baseDir}`, {
        destDir,
        include: ['*.png'],
        getDestinationPath() {
          return 'emojione.sprites.png';
        }
      });

      newTrees.push(currentTree);
    }

    const resultingTree = newTrees.length ? mergeTrees(newTrees) : tree;

    return this._super.treeForPublic.call(this, resultingTree);
  },



  // Include emoji definitions
  treeForAddon(tree) {
    const opts = this._emojiOptions;

    if (!opts.shouldImportDefs) return tree;

    const baseDir =
      opts.separatePackages
      ? opts.packageNameDefs
      : opts.packageNameMain;

    let currentTree = new Funnel(`${this._bowerDirectory}/${baseDir}`, {
      destDir: 'fixtures',
      include: [opts.separatePackages ? 'index.json' : 'emoji.json'],
      getDestinationPath(foo) {
        return 'emoji-defs.json';
      }
    });

    currentTree = jsonModule(currentTree);
    currentTree = tree ? mergeTrees([tree, currentTree]) : currentTree;

    return this._super.treeForAddon.call(this, currentTree);
  }
};
