import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-canvas', 'Integration | Component | game canvas', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{game-canvas}}`);

  assert.notEqual(this.$().text().indexOf('0 Pizzas'), -1);
  assert.notEqual(this.$().text().indexOf('Hi Score'), -1);
});
