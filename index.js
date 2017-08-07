/* eslint-env node */
'use strict';

const path       = require('path');
const resolve    = require('resolve');
const Funnel     = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const jsonModule = require('broccoli-json-module');
const writeFile  = require('broccoli-file-creator');



module.exports = {

  /*******************
   * Public properties
   *******************/

  name: 'ember-emojione',

  options: {
    babel: {
      plugins: ['transform-object-rest-spread'],
    },
  },

  /*******************
   * Public methods
   *******************/

  // Import JS and CSS
  included(app) {
    this._super.included.apply(this, arguments);

    // Not sure if this snippet is necessary here.
    // "@tbieniek: this code is needed if you want your addon to run in other addons."
    // More info here: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this._prepareOptions(app);
    this._importEmojiOneJS(app);
    this._importEmojiOneCSS(app);
    this._importTextareaCaretJS(app);
    this._importLineHeightJS(app);
  },



  // Filter modules
  treeForApp(tree) {
    tree = this._excludeComponentsFromAppTree(tree);
    tree = this._super.treeForApp.call(this, tree);

    return tree;
  },



  // Include assets
  treeForPublic(tree) {
    tree = this._mergeTrees(
      tree,
      this._generateTreeForPngSprite(),
      this._generateTreeForSvgSprite(),
      this._generateTreeForPngImages(),
      this._generateTreeForSvgImages()
    );

    tree = this._super.treeForPublic.call(this, tree);

    return tree;
  },



  // Include emoji definitions and config
  treeForAddon(tree) {
    tree = this._mergeTrees(
      tree,
      this._generateTreeForEmojiDefinitions(),
      this._generateTreeForConfig()
    );

    tree = this._super.treeForAddon.call(this, tree);
    tree = this._excludeComponentsFromAddonTree(tree);

    return tree;
  },



  // Include emoji definitions and config
  treeForVendor(tree) {
    tree = this._mergeTrees(
      tree,
      this._generateTreeForTextareaCaret(),
      this._generateTreeForLineHeight()
    );

    tree = this._super.treeForVendor.call(this, tree);

    return tree;
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

    packageNameMain:      'emojione',
    packageNameJs:        'emojione-js',
    packageNameCss:       'emojione-css',
    packageNameDefs:      'emojione-defs',
    packageNamePngSprite: 'emojione-png',
    packageNameSvgSprite: 'emojione-svg',

    shouldIncludeComponents: true,
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
    app.import('vendor/shims/emojione.js', { exports: { emojione: ['default'] } });
  },



  _importTextareaCaretJS(app) {
    app.import("vendor/textarea-caret/index.js");

    // Import ES module shim
    app.import('vendor/shims/textarea-caret.js', { exports: { 'textarea-caret': ['default'] } });
  },



  _importLineHeightJS(app) {
    app.import("vendor/line-height/index.js");

    // Import ES module shim
    app.import('vendor/shims/line-height.js', { exports: { 'line-height': ['default'] } });
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
      app.import(`vendor/styles/emojione-local-png-sprites.css`);
    }

    // Including component css
    if (
      opts.shouldIncludeComponents
      && !app.registry.availablePlugins['ember-cli-sass'] // If ember-cli-sass is not available, import prebuilt CSS file
    ) {
      app.import(`vendor/styles/ember-emojione.css`);
    }
  },



  _mergeTrees(...trees) {
    trees = trees.filter(tree => tree != null); // Compact (remove nully values)
    return mergeTrees(trees);
  },



  _generateTreeForPngSprite() {
    const opts       = this._emojiOptions;

    if (!opts.shouldIncludePngSprite) return;

    const packageDir = opts.separatePackages ? opts.packageNamePngSprite : opts.packageNameMain;
    const baseDir    = `${opts.bowerDir}/${packageDir}${opts.separatePackages ? '' : '/assets/sprites'}`;

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
  },



  _generateTreeForTextareaCaret() {
    const modulePath = path.dirname(resolve.sync('textarea-caret'));

    return new Funnel(modulePath, {
      files:   ['index.js'],
      destDir: '/textarea-caret',
    });
  },



  _generateTreeForLineHeight() {
    // line-height main file is within lib/, we need dist/
    const modulePath = path.join(path.dirname(resolve.sync('line-height')), '..');

    return new Funnel(modulePath, {
      srcDir:  'dist',
      files:   ['line-height.js'],
      destDir: '/line-height',
      getDestinationPath() {
        return 'index.js';
      },
    });
  },



  _excludeComponentsFromAppTree(tree) {
    const opts = this._emojiOptions;

    if (opts.shouldIncludeComponents) return tree;

    return new Funnel(tree, {
      exclude: [
        'components/emoji-picker-toggler.js',
        'components/emoji-picker-wrapper.js',
        'components/emoji-picker.js',
        'components/emoji-picker/category.js',
        'components/emoji-picker/label.js',
        'components/emoji-picker/tone.js',
        'components/emoji-typing-assistance.js',
        'helpers/eeo-and.js',
        'helpers/eeo-exists.js',
        'helpers/eeo-html-safe.js',
      ]
    });
  },



  _excludeComponentsFromAddonTree(tree) {
    const opts = this._emojiOptions;

    if (opts.shouldIncludeComponents) return tree;

    return new Funnel(tree, {
      exclude: [
        'modules/ember-emojione/-private/**',
        'modules/ember-emojione/components/**',
        'modules/ember-emojione/templates/**',
        'modules/ember-emojione/services/**',
        'modules/ember-emojione/emoji-defs.js',
      ]
    });
  },
};
