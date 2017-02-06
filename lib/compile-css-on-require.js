/* eslint-env node */
const sass = require('node-sass');
const fs   = require('fs');
const path = require('path');

const ADDON_NAME = 'ember-emojione';

const inputFile  = path.join(__dirname, `../app/styles/${ADDON_NAME}.scss`);
const outputFile = path.join(__dirname, `../vendor/${ADDON_NAME}.css`);
const data       = fs.readFileSync(inputFile, "utf8");

// Compile main file
const {css} = sass.renderSync({
  data,
  includePaths: ['app/styles']
});

fs.writeFileSync(outputFile, css);
