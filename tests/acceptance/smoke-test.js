import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import emojione from 'emojione';

module('Acceptance | smoke test', function(hooks) {
  setupApplicationTest(hooks);

  let m;

  test('visiting /', async function (assert) {
    await visit('/');

    m = "`emojione` should be available in the global namespace";
    assert.ok(window.emojione, m);

    m = "`emojione` should be available as a ES import";
    assert.ok(emojione, m);
  });
});
