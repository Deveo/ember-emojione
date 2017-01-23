# ember-emojione

This README outlines the details of collaborating on this Ember addon.

## Installation

* `npm i -g yarn`
* `git clone <repository-url>` this repository
* `cd ember-emojione`
* `yarn install` :warning:
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Development

### Do not use `npm` or `ember install`, use `yarn`

This project uses [Yarn](https://yarnpkg.com/) to lock dependencies. Install yarn with `npm i -g yarn`.

To install this addon's npm dependencies locally, do:

    yarn install

To install an Ember addon into this addon, do:

    yarn add -D <package-name>
    ember g <package-name>

An error message "no such blueprint" is expected in case the addon does not want to do boilerplate customizations.

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
