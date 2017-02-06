import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { create } from 'ember-cli-page-object';
import emojiPickerWrapper from '../../pages/components/emoji-picker-wrapper';
import { withChai } from 'ember-cli-chai/qunit';
import sinon from 'sinon';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';



const component = create(emojiPickerWrapper);
let m;



moduleForComponent('emoji-picker-wrapper', 'Integration | Component | emoji picker wrapper', {
  integration: true,

  beforeEach() {
    component.setContext(this);
  },

  afterEach() {
    component.removeContext();
  }
});



test('it calls action with new text value', withChai(async function(expect) {
  const actionSpy = sinon.spy(function (text) {
    this.setProperties({text});
  }.bind(this));

  this.setProperties({
    actionSpy,
    text: 'lol'
  });

  // Template block usage:
  this.render(hbs`
    {{#emoji-picker-wrapper
      text                = text
      inputSelector       = ".input"
      emojiInsertedAction = (action actionSpy)
      as |emojiPicker|
    }}
      {{input value=(readonly text) class="input"}}
      {{component emojiPicker}}
    {{/emoji-picker-wrapper}}
  `);

  component.emojiPicker.emoji(0).click();

  m = "emojiInsertedAction should've been called once";
  expect(actionSpy.calledOnce, m).ok;

  m = "emojiInsertedAction should've been called with the updated text";
  expect(actionSpy.args[0][0], m).equal('lol:grinning:');

  await wait();

  const input = component.$.find('.input');

  m = "input caret position should be at the end";
  expect(input.prop('selectionStart'), `${m} (selectionStart)`).equal(13);
  expect(input.prop('selectionEnd'),   `${m} (selectionEnd)`)  .equal(13);
}));



test('it inserts emoji at selection and sets focus', withChai(async function(expect) {
  const actionSpy = sinon.spy(function (text) {
    this.setProperties({text});
  }.bind(this));

  this.setProperties({
    actionSpy,
    text: 'lol'
  });

  // Template block usage:
  this.render(hbs`
    {{#emoji-picker-wrapper
      text                = text
      inputSelector       = ".input"
      emojiInsertedAction = (action actionSpy)
      as |emojiPicker|
    }}
      {{input value=(readonly text) class="input"}}
      {{component emojiPicker}}
    {{/emoji-picker-wrapper}}
  `);

  const input = component.$.find('.input');

  input.prop('selectionStart', 1);
  input.prop('selectionEnd',   2);

  component.emojiPicker.emoji(0).click();

  await wait();

  m = "emojiInsertedAction should've been called once";
  expect(actionSpy.calledOnce, m).ok;

  m = "emojiInsertedAction should've been called with the updated text";
  expect(actionSpy.args[0][0], m).equal('l:grinning:l');

  m = "input should have focus";
  expect(input.is(':focus'), m).true;

  m = "input caret position should be at 12";
  expect(input.prop('selectionStart'), `${m} (selectionStart)`).equal(11);
  expect(input.prop('selectionEnd'),   `${m} (selectionEnd)`)  .equal(11);
}));



test('it should not set focus if requested not to', withChai(async function(expect) {
  const actionSpy = sinon.spy(function (text) {
    this.setProperties({text});
  }.bind(this));

  this.setProperties({
    actionSpy,
    text: 'lol'
  });

  // Template block usage:
  this.render(hbs`
    {{#emoji-picker-wrapper
      text                  = text
      inputSelector         = ".input"
      shouldSetFocusToInput = false
      emojiInsertedAction   = (action actionSpy)
      as |emojiPicker|
    }}
      {{input value=(readonly text) class="input"}}
      {{component emojiPicker}}
    {{/emoji-picker-wrapper}}
  `);

  const input = component.$.find('.input');

  input.prop('selectionStart', 2);
  input.prop('selectionEnd',   2);
  component.emojiPicker.emoji(0).click();

  await wait();

  m = "input should not have focus";
  expect(input.is(':focus'), m).false;
}));




test('it should work with async closure actions', withChai(async function(expect) {
  const deferred = RSVP.defer();

  const changeTextAsyncAction = function (text) {
    return deferred
      .promise
      .then(() => {
        text += '!';
        this.setProperties({text});
        return text;
      });
  };

  this.setProperties({
    changeTextAsyncAction,
    text: 'lol'
  });

  // Template block usage:
  this.render(hbs`
    {{#emoji-picker-wrapper
      text                = text
      inputSelector       = ".input"
      emojiInsertedAction = (action changeTextAsyncAction)
      as |emojiPicker|
    }}
      {{input value=(readonly text) class="input"}}
      {{component emojiPicker}}
    {{/emoji-picker-wrapper}}
  `);

  const input = component.$.find('.input');

  input.prop('selectionStart', 2);
  input.prop('selectionEnd',   2);

  component.emojiPicker.emoji(0).click();

  await wait();

  m = "text shouldn't be changed yet";
  expect(this.get('text'), m).equal('lol');

  m = "caret position shouldn't be changed yet";
  expect(input.prop('selectionStart'), `${m} (selectionStart)`).equal(2);
  expect(input.prop('selectionEnd'),   `${m} (selectionEnd)`)  .equal(2);

  m = "input shouldn't have focus yet";
  expect(input.is(':focus'), m).false;

  deferred.resolve();
  await deferred.promise;

  m = "text should be changed after promise resolution";
  expect(this.get('text'), m).equal('lo:grinning:l!');

  m = "caret position should be changed after promise resolution";
  expect(input.prop('selectionStart'), `${m} (selectionStart)`).equal(12);
  expect(input.prop('selectionEnd'),   `${m} (selectionEnd)`)  .equal(12);

  m = "input should have focus after promise resolution";
  expect(input.is(':focus'), m).true;
}));




test('it should toggle emoji picker visibility with button', withChai(async function(expect) {
  this.render(hbs`
    {{#emoji-picker-wrapper 
      inputSelector = ".input"
      as |emojiPicker emojiPickerToggler|
    }}
      {{input value=(readonly text) class="input"}}
      {{#component emojiPickerToggler}}
        <span class="my-button">key</span>
      {{/component}}
      {{component emojiPicker}}
    {{/emoji-picker-wrapper}}
  `);

  m = "Emoji picker should initially be invisible";
  expect(component.emojiPicker.isVisible, m).false;

  component.toggler.click();
  await wait();

  m = "Emoji picker should initially be visible after first click";
  expect(component.emojiPicker.isVisible, m).true;

  component.toggler.click();
  await wait();

  m = "Emoji picker should be invisible again after second click";
  expect(component.emojiPicker.isVisible, m).false;
}));
