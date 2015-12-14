import { moduleFor, test } from 'ember-qunit';

moduleFor('service:game', 'Unit | Service | game', {
});

test('changeLevel', function(assert) {
  var game = this.subject();
  game.level = 1;
  assert.equal(game.level, 1);
  game.changeLevel(2);
  assert.equal(game.level, 2);
});

test('pause', function(assert) {
  var game = this.subject();
  var canvas = document.createElement('canvas');
  game.configureGame(canvas);
  assert.equal(game.paused, false);
  game.pause();
  assert.equal(game.paused, true);
});

test('play', function(assert) {
  var game = this.subject();
  var canvas = document.createElement('canvas');
  game.configureGame(canvas);
  assert.equal(game.paused, false);
  game.pause();
  assert.equal(game.paused, true);
  game.play();
  assert.equal(game.paused, false);
});
