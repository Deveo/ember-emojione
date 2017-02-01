/* globals module, require */
'use strict';

const Funnel     = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const jsonModule = require('broccoli-json-module');
const writeFile  = require('broccoli-file-creator');



module.exports = {

  /*******************
   * Public properties
   *******************/

  name: 'ember-emojione',



  /*******************
   * Public methods
   *******************/

  // Import JS and CSS
  included(app) {
    this._super.included(app);
    this._prepareOptions(app);
    this._importEmojiOneJS(app);
    this._importEmojiOneCSS(app);
  },



  // Include assets
  treeForPublic(tree) {
    const resultingTree = this._mergeTrees(
      tree,
      this._generateTreeForPngSprite(),
      this._generateTreeForSvgSprite(),
      this._generateTreeForPngImages(),
      this._generateTreeForSvgImages()
    );

    return this._super.treeForPublic.call(this, resultingTree);
  },



  // Include emoji definitions and config
  treeForAddon(tree) {
    const resultingTree = this._mergeTrees(
      tree,
      this._generateTreeForEmojiDefinitions(),
      this._generateTreeForConfig()
    );

    return this._super.treeForAddon.call(this, resultingTree);
  },



  /*******************
   * Private properties
   *******************/

  _defaultOptions: {
    separatePackages:       true,

    shouldImportCss:        true,
    shouldImportDefs:       true,

    spriteSheet:            true,

    shouldIncludePngSprite: true,
    shouldIncludeSvgSprite: false,
    shouldIncludePngImages: false,
    shouldIncludeSvgImages: false,

    pngImagesKind: 'png', // png, png_128x128, png_512x512, png_bw
    svgImagesKind: 'svg', // svg, svg_bw

    packageNameMain:        'emojione',
    packageNameJs:          'emojione-js',
    packageNameCss:         'emojione-css',
    packageNameDefs:        'emojione-defs',
    packageNamePngSprite:   'emojione-png',
    packageNameSvgSprite:   'emojione-svg',
  },



  /*******************
   * Private methods
   *******************/

  _prepareOptions(app) {
    const defaultOptions  = this._defaultOptions;
    const overrideOptions = app.options['ember-emojione'] || {};

    const opts = Object.assign(
      { bowerDir: app.bowerDirectory },
      defaultOptions,
      overrideOptions
    );

    if (opts.separatePackages && (opts.shouldIncludePngImages || opts.shouldIncludeSvgImages)) {
      throw new Error('ember-emojione: importing individual images from separate packages is not supported. Please update your `ember-cli-build.js` configuration.');
    }

    this._emojiOptions = opts;
  },



  _importEmojiOneJS(app) {
    const opts = this._emojiOptions;

    const jsPath =
      opts.separatePackages
      ? `${opts.packageNameJs}/index.js`
      : `${opts.packageNameMain}/lib/js/emojione.js`;

    app.import(`${app.bowerDirectory}/${jsPath}`);

    // Import ES module shim
    app.import('vendor/emojione-shim.js', { exports: { emojione: ['default'] } });
  },



  _importEmojiOneCSS(app) {
    const opts = this._emojiOptions;

    if (!opts.shouldImportCss) return;

    const cssPath =
      opts.separatePackages ? `${opts.packageNameCss}/index.css` :
      opts.spriteSheet      ? `${opts.packageNameMain}/assets/sprites/emojione.sprites.css` :
                              `${opts.packageNameMain}/assets/css/emojione.css`;

    app.import(`${app.bowerDirectory}/${cssPath}`);

    // Override local PNG sprite sheet URL
    if (opts.spriteSheet && opts.shouldIncludePngSprite) {
      app.import(`vendor/emojione-local-png-sprites.css`);
    }
  },



  _mergeTrees(...trees) {
    trees = trees.filter(tree => tree != null); // Compact (remove nully values)
    return mergeTrees(trees);
  },



  _generateTreeForPngSprite() {
    const opts       = this._emojiOptions;

    console.log('options', opts)
    if (!opts.shouldIncludePngSprite) return;

    const packageDir = opts.separatePackages ? opts.packageNamePngSprite : opts.packageNameMain;
    const baseDir    = `${opts.bowerDir}/${packageDir}${opts.separatePackages ? '' : '/assets/sprites'}`;

    console.log('baseDir', baseDir)
    return new Funnel(baseDir, {
      include: ['*.png'],
      getDestinationPath() {
        return 'emojione.sprites.png';
      }
    });
  },



  _generateTreeForSvgSprite() {
    const opts = this._emojiOptions;

    if (!opts.shouldIncludeSvgSprite) return;

    const packageDir = opts.separatePackages ? opts.packageNameSvgSprite : opts.packageNameMain;
    const baseDir    = `${opts.bowerDir}/${packageDir}/assets/sprites`;

    return new Funnel(baseDir, {
      include: ['*.svg'],
      getDestinationPath() {
        return 'emojione.sprites.svg';
      }
    });
  },



  _generateTreeForPngImages() {
    const opts = this._emojiOptions;

    if (!opts.shouldIncludePngImages) return;

    const baseDir = `${opts.bowerDir}/${opts.packageNameMain}/assets/${opts.pngImagesKind}`;

    return new Funnel(baseDir, {
      destDir: 'png',
      include: ['*.png'],
    });
  },



  _generateTreeForSvgImages() {
    const opts = this._emojiOptions;

    if (!opts.shouldIncludeSvgImages) return;

    const baseDir = `${opts.bowerDir}/${opts.packageNameMain}/assets/${opts.svgImagesKind}`;

    return new Funnel(baseDir, {
      destDir: 'svg',
      include: ['*.svg'],
    });
  },



  _generateTreeForEmojiDefinitions() {
    const opts = this._emojiOptions;

    if (!opts.shouldImportDefs) return;

    const baseDir = opts.separatePackages ? opts.packageNameDefs : opts.packageNameMain;

    const defsTree = new Funnel(`${opts.bowerDir}/${baseDir}`, {
      include: [opts.separatePackages ? 'index.json' : 'emoji.json'],
      getDestinationPath() {
        return 'emoji-defs.json';
      }
    });

    return jsonModule(defsTree);
  },



  _generateTreeForConfig() {
    const opts = this._emojiOptions;

    if (!opts.shouldImportDefs) return;

    const configJson = JSON.stringify(opts, null, 2);
    const configTree = writeFile('config.json', configJson);

    return jsonModule(configTree);
  }
};
