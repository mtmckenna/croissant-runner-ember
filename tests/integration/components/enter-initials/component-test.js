/*global Cookies */

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('enter-initials', 'Integration | Component | enter initials', {
  integration: true,

  beforeEach: function (assert) {
    Cookies.remove('initials');
    assert.notOk(Cookies.get('initials'));
  }
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs`{{enter-initials}}`);
  assert.notEqual(this.$().text().indexOf('BACK'), -1);
});

test("it uses Michael Jordan's initials by default", function(assert) {
  this.render(hbs`{{enter-initials}}`);
  assert.equal(Cookies.get('initials'), 'MJJ');
  assert.equal(this.$('.enter-initials--text-input').val(), 'MJJ');
});

test('it saves initials in the cookie', function(assert) {
  this.render(hbs`{{enter-initials}}`);
  this.$('.enter-initials--text-input').val('SRS').trigger('change');
  assert.equal(Cookies.get('initials'), 'SRS');
});

test('it displays the previously saved initials', function(assert) {
  Cookies.set('initials', 'WWZ');
  this.render(hbs`{{enter-initials}}`);
  assert.equal(this.$('.enter-initials--text-input').val(), 'WWZ');
  assert.equal(Cookies.get('initials'), 'WWZ');
});

test('back buttons points to the right location', function(assert) {
  assert.expect(2);

  this.set('pizzaRouteName', 'pizzaRoute');

  this.on('goBackAction', (routeName) => {
    assert.equal(routeName, 'pizzaRoute');
  });

  this.render(hbs`{{enter-initials backRoute=pizzaRouteName goBack='goBackAction'}}`);
  this.$('.game-menu--button').click();
});
