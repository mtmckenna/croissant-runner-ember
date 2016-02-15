import { moduleFor, test } from 'ember-qunit';

moduleFor('route:play/menu/apps', 'Unit | Route | play/menu/apps', {
  // Specify the other units that are required for this test.
  needs: ['service:metrics']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
