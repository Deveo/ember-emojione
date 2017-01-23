/* global emojione */
import emojioneModule from 'emojione';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | module');

let m;

test('visiting /module', async function (assert) {
  await visit('/');

  m = "`emojione` should be available in the global namespace";
  assert.ok(emojione, m);

  m = "`emojione` should be available as an import";
  assert.ok(emojioneModule, m);
});
