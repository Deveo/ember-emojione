import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { create } from 'ember-cli-page-object';
import emojiPicker from '../../pages/components/emoji-picker';
import { withChai } from 'ember-cli-chai/qunit';
import emojiDefs from 'ember-emojione/emoji-defs';
import sinon from 'sinon';



const component = create(emojiPicker);
let m;



module('Integration | Component | emoji picker', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    component.setContext(this);
  });

  hooks.afterEach(function() {
    component.removeContext();
  });



  test('it renders', withChai(async function(expect) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set("dummyAction", function() {});

    await render(hbs`{{emoji-picker selectAction = (action dummyAction)}}`);

    m = "Should exist after rendering.";
    expect(component.exists, m).true;

    m = "Should have 1369 emoji";
    expect(component.emoji.length, m).equal(1369);

    m = "Should have 8 categories";
    expect(component.categories.length, m).equal(8);

    m = "Category 0 title should be 'Smileys & People'";
    expect(component.categories.objectAt(0).title.text, m).equal('Smileys & People');

    m = "Category 0 should contain 225 emoji";
    expect(component.categories.objectAt(0).emoji.length, m).equal(225);

    m = "Category 1 title should be 'Animals & Nature'";
    expect(component.categories.objectAt(1).title.text, m).equal('Animals & Nature');

    m = "Category 1 should contain 225 emoji";
    expect(component.categories.objectAt(1).emoji.length, m).equal(160);

    m = "Category 2 title should be 'Food & Drink'";
    expect(component.categories.objectAt(2).title.text, m).equal('Food & Drink');

    m = "Category 2 should contain 225 emoji";
    expect(component.categories.objectAt(2).emoji.length, m).equal(85);

    m = "Category 3 title should be 'Activity'";
    expect(component.categories.objectAt(3).title.text, m).equal('Activity');

    m = "Category 3 should contain 225 emoji";
    expect(component.categories.objectAt(3).emoji.length, m).equal(69);

    m = "Category 4 title should be 'Travel & Places'";
    expect(component.categories.objectAt(4).title.text, m).equal('Travel & Places');

    m = "Category 4 should contain 225 emoji";
    expect(component.categories.objectAt(4).emoji.length, m).equal(118);

    m = "Category 5 title should be 'Objects'";
    expect(component.categories.objectAt(5).title.text, m).equal('Objects');

    m = "Category 5 should contain 225 emoji";
    expect(component.categories.objectAt(5).emoji.length, m).equal(180);

    m = "Category 6 title should be 'Symbols'";
    expect(component.categories.objectAt(6).title.text, m).equal('Symbols');

    m = "Category 6 should contain 225 emoji";
    expect(component.categories.objectAt(6).emoji.length, m).equal(275);

    m = "Category 7 title should be 'Flags'";
    expect(component.categories.objectAt(7).title.text, m).equal('Flags');

    m = "Category 7 should contain 225 emoji";
    expect(component.categories.objectAt(7).emoji.length, m).equal(257);
  }));



  test('it should trigger an action when emoji is clicked', withChai(async function(expect) {
    const actionSpy = sinon.spy();
    this.setProperties({actionSpy});

    await render(hbs`{{emoji-picker selectAction=(action actionSpy)}}`);

    component.emoji.objectAt(0).click();

    m = "Action should've been called once";
    expect(actionSpy.calledOnce, m).ok;

    m = "Action should've been called with the grinning emoji definition";
    expect(actionSpy.calledWith(emojiDefs.grinning), m).ok;
  }));



  test('it should trigger the close action when emoji is clicked and shouldCloseOnSelect is true', withChai(async function(expect) {
    const selectSpy = sinon.spy();
    const closeSpy  = sinon.spy();
    this.setProperties({selectSpy, closeSpy, shouldCloseOnSelect: true});

    await render(hbs`{{emoji-picker
      selectAction        = (action selectSpy)
      closeAction         = (action closeSpy)
      shouldCloseOnSelect = shouldCloseOnSelect
    }}`);

    component.emoji.objectAt(0).click();

    m = "Select action should've been called once";
    expect(selectSpy.calledOnce, m).ok;

    m = "Select action should've been called with the grinning emoji definition";
    expect(selectSpy.calledWith(emojiDefs.grinning), m).ok;

    m = "Close action should've been called once";
    expect(closeSpy.calledOnce, m).ok;

    this.set('shouldCloseOnSelect', false);

    component.emoji.objectAt(0).click();

    m = "After second click, elect action should've been called twice";
    expect(selectSpy.calledTwice, m).ok;

    m = "After second click, close action should've been called once";
    expect(closeSpy.calledOnce, m).ok;


  }));





  test('it should switch tones', withChai(async function(expect) {
    this.set("dummyAction", function() {});

    await render(hbs`{{emoji-picker selectAction=(action dummyAction)}}`);

    m = "Initially should contain toneless emoji";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v:"]'), m).true;

    m = "Initially should not contain toned emoji";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone1:"]'), `${m} (trying tone 1)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone2:"]'), `${m} (trying tone 2)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone3:"]'), `${m} (trying tone 3)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone4:"]'), `${m} (trying tone 4)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone5:"]'), `${m} (trying tone 5)`).false;

    component.tones.objectAt(1).click();

    m = "Should contain tone 1 emoji after click on tone 1";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone1:"]'), m).true;

    m = "Should not contain emoji of other tones after click on tone 1";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v:"]'),       `${m} (trying toneless)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone2:"]'), `${m} (trying tone 2)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone3:"]'), `${m} (trying tone 3)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone4:"]'), `${m} (trying tone 4)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone5:"]'), `${m} (trying tone 5)`).false;

    component.tones.objectAt(2).click();

    m = "Should contain tone 1 emoji after click on tone 2";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone2:"]'), m).true;

    m = "Should not contain emoji of other tones after click on tone 2";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v:"]'),       `${m} (trying toneless)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone1:"]'), `${m} (trying tone 1)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone3:"]'), `${m} (trying tone 3)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone4:"]'), `${m} (trying tone 4)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone5:"]'), `${m} (trying tone 5)`).false;

    component.tones.objectAt(3).click();

    m = "Should contain tone 1 emoji after click on tone 3";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone3:"]'), m).true;

    m = "Should not contain emoji of other tones after click on tone 3";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v:"]'),       `${m} (trying toneless)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone1:"]'), `${m} (trying tone 1)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone2:"]'), `${m} (trying tone 2)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone4:"]'), `${m} (trying tone 4)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone5:"]'), `${m} (trying tone 5)`).false;

    component.tones.objectAt(4).click();

    m = "Should contain tone 1 emoji after click on tone 4";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone4:"]'), m).true;

    m = "Should not contain emoji of other tones after click on tone 4";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v:"]'),       `${m} (trying toneless)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone1:"]'), `${m} (trying tone 1)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone2:"]'), `${m} (trying tone 2)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone3:"]'), `${m} (trying tone 3)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone5:"]'), `${m} (trying tone 5)`).false;

    component.tones.objectAt(5).click();

    m = "Should contain tone 1 emoji after click on tone 5";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone5:"]'), m).true;

    m = "Should not contain emoji of other tones after click on tone 5";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v:"]'),       `${m} (trying toneless)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone1:"]'), `${m} (trying tone 1)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone2:"]'), `${m} (trying tone 2)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone3:"]'), `${m} (trying tone 3)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone4:"]'), `${m} (trying tone 4)`).false;

    component.tones.objectAt(0).click();

    m = "Should contain toneless emoji after clicking on tone 0";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v:"]'), m).true;

    m = "Should not contain toned emoji after clicking on tone 0";
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone1:"]'), `${m} (trying tone 1)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone2:"]'), `${m} (trying tone 2)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone3:"]'), `${m} (trying tone 3)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone4:"]'), `${m} (trying tone 4)`).false;
    expect(component.contains('.eeo-emojiPicker-category-emoji-emojo[title^=":v_tone5:"]'), `${m} (trying tone 5)`).false;
  }));



  test('it should filter emoji', withChai(async function(expect) {
    const actionSpy = sinon.spy();
    this.setProperties({ actionSpy });

    await render(hbs`{{emoji-picker selectAction=(action actionSpy)}}`);

    m = "Initially should contain 1369 emoji";
    expect(component.emoji.filterBy('isVisible')).length(1369);

    component.filterInput.fill("fo");
    await settled();

    m = "Should contain 93 emoji after filling 'fo' into search field";
    expect(component.emoji.filterBy('isVisible')).length(93);
  }));



  test('it should trigger an action when tone is changed', withChai(async function(expect) {
    const toneActionSpy = sinon.spy();
    this.setProperties({toneActionSpy, dummyAction() {}});

    await render(hbs`{{emoji-picker
      selectAction     = (action dummyAction)
      toneSelectAction = (action toneActionSpy)
    }}`);

    component.tones.objectAt(3).click();

    m = "Action should've been called once";
    expect(toneActionSpy.calledOnce, m).ok;

    m = "Action should've been called with '3'";
    expect(toneActionSpy.calledWith('3'), m).ok;

    component.tones.objectAt(3).click();

    m = "Action should not be called again if skin tone isn't changed.";
    expect(toneActionSpy.calledOnce, m).ok;
  }));
});
