import Ember from 'ember';
import GoBackOnEnterMixin from '../../../mixins/go-back-on-enter';
import { module, test } from 'qunit';

module('Unit | Mixin | go back on enter');

// Replace this with your real tests.
test('it works', function(assert) {
  var GoBackOnEnterObject = Ember.Object.extend(GoBackOnEnterMixin);
  var subject = GoBackOnEnterObject.create();
  assert.ok(subject);
});
