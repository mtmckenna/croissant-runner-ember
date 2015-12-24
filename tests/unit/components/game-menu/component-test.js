import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('game-menu', 'Unit | Component | game menu', {
  needs: ['service:game', 'service:metrics'],
  unit: true
});

test('can toggle audio', function(assert) {
  assert.expect(3);

  var component = this.subject();
  var game = component.get('game');

  assert.equal(game.audioEnabled, true);
  component.send('toggleAudio');
  assert.equal(game.audioEnabled, false);
  component.send('toggleAudio');
  assert.equal(game.audioEnabled, true);
});
