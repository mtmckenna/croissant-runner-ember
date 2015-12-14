import { moduleFor, test } from 'ember-qunit';

moduleFor('route:play/menu', 'Unit | Route | play/menu', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:metrics']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
