import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { create } from 'ember-cli-page-object';
import emojiPicker from '../../pages/components/emoji-picker';
import { withChai } from 'ember-cli-chai/qunit';
import emojiDefs from 'ember-emojione/emoji-defs';
import sinon from 'sinon';



const component = create(emojiPicker);
let m;



moduleForComponent('emoji-picker', 'Integration | Component | emoji picker', {
  integration: true,
  beforeEach() {
    component.setContext(this);
  },

  afterEach() {
    component.removeContext();
  }
});



test('it renders', withChai(function(expect) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set("dummyAction", function() {});

  this.render(hbs`{{emoji-picker selectAction = (action dummyAction)}}`);

  m = "Should exist after rendering.";
  expect(component.exists, m).true;

  m = "Should have 1369 emoji";
  expect(component.emoji().count, m).equal(1369);

  m = "Should have 8 categories";
  expect(component.categories().count, m).equal(8);

  m = "Category 0 title should be 'Smileys & People'";
  expect(component.categories(0).title.text, m).equal('Smileys & People');

  m = "Category 0 should contain 225 emoji";
  expect(component.categories(0).emoji().count, m).equal(225);

  m = "Category 1 title should be 'Smileys & People'";
  expect(component.categories(1).title.text, m).equal('Animals & Nature');

  m = "Category 1 should contain 225 emoji";
  expect(component.categories(1).emoji().count, m).equal(160);

  m = "Category 2 title should be 'Smileys & People'";
  expect(component.categories(2).title.text, m).equal('Food & Drink');

  m = "Category 2 should contain 225 emoji";
  expect(component.categories(2).emoji().count, m).equal(85);

  m = "Category 3 title should be 'Smileys & People'";
  expect(component.categories(3).title.text, m).equal('Activity');

  m = "Category 3 should contain 225 emoji";
  expect(component.categories(3).emoji().count, m).equal(69);

  m = "Category 4 title should be 'Smileys & People'";
  expect(component.categories(4).title.text, m).equal('Travel & Places');

  m = "Category 4 should contain 225 emoji";
  expect(component.categories(4).emoji().count, m).equal(118);

  m = "Category 5 title should be 'Smileys & People'";
  expect(component.categories(5).title.text, m).equal('Objects');

  m = "Category 5 should contain 225 emoji";
  expect(component.categories(5).emoji().count, m).equal(180);

  m = "Category 6 title should be 'Smileys & People'";
  expect(component.categories(6).title.text, m).equal('Symbols');

  m = "Category 6 should contain 225 emoji";
  expect(component.categories(6).emoji().count, m).equal(275);

  m = "Category 7 title should be 'Smileys & People'";
  expect(component.categories(7).title.text, m).equal('Flags');

  m = "Category 7 should contain 225 emoji";
  expect(component.categories(7).emoji().count, m).equal(257);
}));



test('it should trigger an action when emoji is clicked', withChai(function(expect) {
  const actionSpy = sinon.spy();
  this.setProperties({actionSpy});

  this.render(hbs`{{emoji-picker selectAction=(action actionSpy)}}`);

  component.emoji(0).click();

  m = "Action should've been called once";
  expect(actionSpy.calledOnce, m).ok;
  expect(actionSpy.calledWith(emojiDefs.grinning), m).ok;
}));


