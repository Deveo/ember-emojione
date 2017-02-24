# ember-emojione changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).



## [Unreleased]



## [2.0.0] - 2017.02.24
### Changed
- :warning: `emoji-picker-wrapper` now yields a hash that contains the following properties:

    | Option                 | Type      | Description                                        |
    |:-----------------------|:----------|:---------------------------------------------------|
    | `emojiPicker`          | Component | Preconfigured `emoji-picker` component.            |
    | `emojiPickerToggler`   | Component | Preconfigured `emoji-picker-toggler` component.    |
    | `emojiAssist`          | Component | Preconfigured `emoji-typing assistance` component. |
    | `isEmojiPickerVisible` | Boolean   | Whether emoji picker is visible.                   |

### Added
- `isEmojiPickerVisible` is now available as a part of the yield value from `emoji-picker-wrapper`



## [1.0.0] - 2017.02.23
First stable release!

### Added
- `emoji-picker-wrapper` component
- `emoji-typing-assistance` component
- Build configuration is more flexible
- Many more, see the readme for what's available



## [0.3.0] - 2017.02.02
### Documentation
- Huge update to the readme
- 
### Changed
- Asset imports are now semi-automatic
- 
### Added
- `emoji-picker` component! 😎



## [0.2.0] - 2017.01.25
### Changes
- Simplify convenience function footprint: produce an htmlSafe string only if the input was htmlSafe (#25)

### Dependencies
- Upgraded Ember CLI to 2.11.0 stable

### Documentation
- Added demo (16)
- Readme edits



## [0.1.0] - 2017.01.24 (not published)

Initial version.
