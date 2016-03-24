import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-menu', 'Integration | Component | game menu', {
  integration: true
});

test('toggle audio', function(assert) {
  this.render(hbs`{{game-menu}}`);

  $('div:contains("AUDIO ON")').click();
  assert.notEqual(this.$().text().indexOf('AUDIO OFF'), -1);
  $('div:contains("AUDIO OFF")').click();
  assert.notEqual(this.$().text().indexOf('AUDIO ON'), -1);
});
