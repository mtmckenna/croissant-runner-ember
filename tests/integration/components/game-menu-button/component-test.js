import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-menu-button', 'Integration | Component | game menu button', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{game-menu-button}}`);

  assert.equal(this.$().text().trim(), '');
});
