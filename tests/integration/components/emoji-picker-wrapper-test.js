import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { create } from 'ember-cli-page-object';
import emojiPickerWrapper from '../../pages/components/emoji-picker-wrapper';
import { withChai } from 'ember-cli-chai/qunit';
import sinon from 'sinon';



const component = create(emojiPickerWrapper);
let m;



module('Integration | Component | emoji picker wrapper', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    component.setContext(this);
  });

  hooks.afterEach(function() {
    component.removeContext();
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
    await render(hbs`
      {{#emoji-picker-wrapper
        text                = text
        inputSelector       = ".input"
        emojiInsertedAction = (action actionSpy)
        as |h|
      }}
        {{input value=text class="input"}}
        {{component h.emojiPicker}}
      {{/emoji-picker-wrapper}}
    `);

    component.emojiPicker.emoji.objectAt(0).click();

    m = "emojiInsertedAction should've been called once";
    expect(actionSpy.calledOnce, m).ok;

    m = "emojiInsertedAction should've been called with the updated text";
    expect(actionSpy.args[0][0], m).equal('lol:grinning:');

    await settled();

    const input = component.$.find('.input');

    m = "input caret position should be at the end";
    expect(input.prop('selectionStart'), `${m} (selectionStart)`).equal(13);
    expect(input.prop('selectionEnd'),   `${m} (selectionEnd)`)  .equal(13);
  }));



  test('it inserts emoji at selection', withChai(async function(expect) {
    const actionSpy = sinon.spy(function (text) {
      this.setProperties({text});
    }.bind(this));

    this.setProperties({
      actionSpy,
      text: 'lol'
    });

    // Template block usage:
    await render(hbs`
      {{#emoji-picker-wrapper
        text                = text
        inputSelector       = ".input"
        emojiInsertedAction = (action actionSpy)
        as |h|
      }}
        {{input value=text class="input"}}
        {{component h.emojiPicker}}
      {{/emoji-picker-wrapper}}
    `);

    const input = component.$.find('.input');

    input.prop('selectionStart', 1);
    input.prop('selectionEnd',   2);

    component.emojiPicker.emoji.objectAt(0).click();

    await settled();

    m = "emojiInsertedAction should've been called once";
    expect(actionSpy.calledOnce, m).ok;

    m = "emojiInsertedAction should've been called with the updated text";
    expect(actionSpy.args[0][0], m).equal('l:grinning:l');

    // m = "input should have focus";
    // expect(input.is(':focus'), m).true;

    m = "input caret position should be at 12";
    expect(input.prop('selectionStart'), `${m} (selectionStart)`).equal(11);
    expect(input.prop('selectionEnd'),   `${m} (selectionEnd)`)  .equal(11);
  }));



  // test('it should not set focus if requested not to', withChai(async function(expect) {
  //   const actionSpy = sinon.spy(function (text) {
  //     this.setProperties({text});
  //   }.bind(this));
  //
  //   this.setProperties({
  //     actionSpy,
  //     text: 'lol'
  //   });
  //
  //   // Template block usage:
  //   this.render(hbs`
  //     {{#emoji-picker-wrapper
  //       text                  = text
  //       inputSelector         = ".input"
  //       shouldSetFocusToInput = false
  //       emojiInsertedAction   = (action actionSpy)
  //       as |h|
  //     }}
  //       {{input value=text class="input"}}
  //       {{component h.emojiPicker}}
  //     {{/emoji-picker-wrapper}}
  //   `);
  //
  //   const input = component.$.find('.input');
  //
  //   input.prop('selectionStart', 2);
  //   input.prop('selectionEnd',   2);
  //   component.emojiPicker.emoji.objectAt(0).click();
  //
  //   await wait();
  //
  //   m = "input should not have focus";
  //   expect(input.is(':focus'), m).false;
  // }));




  test('it should toggle emoji picker visibility with button', withChai(async function(expect) {
    await render(hbs`
      {{#emoji-picker-wrapper
        inputSelector = ".input"
        as |h|
      }}
        {{input value=text class="input"}}
        {{#component h.emojiPickerToggler}}
          <span class="my-button">key</span>
        {{/component}}
        {{component h.emojiPicker}}
      {{/emoji-picker-wrapper}}
    `);

    m = "Emoji picker should initially be invisible";
    expect(component.emojiPicker.isVisible, m).false;

    component.toggler.click();
    await settled();

    m = "Emoji picker should initially be visible after first click";
    expect(component.emojiPicker.isVisible, m).true;

    component.toggler.click();
    await settled();

    m = "Emoji picker should be invisible again after second click";
    expect(component.emojiPicker.isVisible, m).false;
  }));




  // test('it should position the typing assistance component correctly', withChai(async function(expect) {
  //   this.set('text', 'foo');
  //
  //   this.render(hbs`
  //     {{#emoji-picker-wrapper
  //       text          = text
  //       inputSelector = ".input"
  //       as |h|
  //     }}
  //       {{input value=text class="input"}}
  //       {{component h.emojiAssist}}
  //     {{/emoji-picker-wrapper}}
  //   `);
  //
  //   m = "Emoji assist should initially be invisible";
  //   expect(component.emojiAssist.isVisible, m).false;
  //
  //   const $input = component.$.find('.input');
  //   $input.val('Foo :ba Baz');
  //   $input.prop('selectionStart', 7);
  //   $input.prop('selectionEnd',   7);
  //
  //   $input.change();
  //
  //   await wait();
  //
  //   m = "Emoji assist should become visible";
  //   expect(component.emojiAssist.isVisible, m).true;
  //
  //   m = "Emoji assist should have top style";
  //   expect(component.emojiAssist.$.css('top'), m).equal('27px');
  //
  //   m = "Emoji assist should have left style";
  //   expect(component.emojiAssist.$.css('left'), m).equal('27px');
  // }));
});

