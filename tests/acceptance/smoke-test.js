/* global emojione */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | smoke test');

let m;

test('visiting /', async function (assert) {
  await visit('/');

  m = "`emojione` should be available in the global namespace";
  assert.ok(emojione, m);
});
