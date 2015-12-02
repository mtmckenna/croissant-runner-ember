import { moduleForModel, test } from 'ember-qunit';

moduleForModel('hi-score', 'Unit | Serializer | hi score', {
  // Specify the other units that are required for this test.
  needs: ['serializer:hi-score']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
