import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import emojione from 'emojione';

moduleForAcceptance('Acceptance | smoke test');

let m;

test('visiting /', async function (assert) {
  await visit('/');

  m = "`emojione` should be available in the global namespace";
  assert.ok(window.emojione, m);

  m = "`emojione` should be available as a ES import";
  assert.ok(emojione, m);
});
