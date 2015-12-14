import { moduleFor, test } from 'ember-qunit';

moduleFor('route:play/menu/hi-scores', 'Unit | Route | hi scores', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:metrics']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
