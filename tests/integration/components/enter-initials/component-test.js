import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('enter-initials', 'Integration | Component | enter initials', {
  integration: true,

  beforeEach: function (assert) {
    window.localStorage.removeItem('initials');
    assert.notOk(window.localStorage.getItem('initials'));
  }
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs`{{enter-initials}}`);
  assert.notEqual(this.$().text().indexOf('BACK'), -1);
});

test("it uses Michael Jordan's initials by default", function(assert) {
  this.render(hbs`{{enter-initials}}`);
  assert.equal(window.localStorage.getItem('initials'), 'MJJ');
  assert.equal(this.$('.enter-initials__text-input').val(), 'MJJ');
});

test('it saves initials in localStorage', function(assert) {
  this.render(hbs`{{enter-initials}}`);
  this.$('.enter-initials__text-input').val('SRS').trigger('change');
  assert.equal(window.localStorage.getItem('initials'), 'SRS');
});

test('it displays the previously saved initials', function(assert) {
  window.localStorage.setItem('initials', 'WWZ');
  this.render(hbs`{{enter-initials}}`);
  assert.equal(this.$('.enter-initials__text-input').val(), 'WWZ');
  assert.equal(window.localStorage.getItem('initials'), 'WWZ');
});

test('back buttons points to the right location', function(assert) {
  assert.expect(2);

  this.set('pizzaRouteName', 'pizzaRoute');

  this.on('goBackAction', (routeName) => {
    assert.equal(routeName, 'pizzaRoute');
  });

  this.render(hbs`{{enter-initials backRoute=pizzaRouteName goBack='goBackAction'}}`);
  this.$('.game-menu__button').click();
});
