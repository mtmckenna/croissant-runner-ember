/*global Cookies */

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('enter-initials', 'Integration | Component | enter initials', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{enter-initials}}`);

  assert.notEqual(this.$().text().indexOf('BACK'), -1);
});

test('it saves initials in the cookie', function(assert) {
  Cookies.remove('initials');
  assert.notOk(Cookies.get('initials'));

  this.render(hbs`{{enter-initials}}`);
  this.$('.enter-initials--text-input').val('SRS').trigger('change');
  assert.equal(Cookies.get('initials'), 'SRS');
});
