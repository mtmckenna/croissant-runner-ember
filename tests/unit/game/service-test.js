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

test('configureInitialGameState', function(assert) {
  var game = this.subject();

  game.drawCounter = -1;
  game.score = -1;
  game.userHasInteracted = -1;
  game.gameOver = -1;
  this.initializedAlready = -1;

  game.configureInitialGameState();

  assert.equal(game.drawCounter, 0);
  assert.equal(game.score, 0);
  assert.equal(game.userHasInteracted, false);
  assert.equal(game.gameOver, false);
  assert.equal(game.initializedAlready, true);
});

test('configureAudioEffects', function(assert) {
  var game = this.subject();
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContext();
  game.configureAudioEffects(audioContext);

  assert.ok(game.audioHash.pizza);
  assert.ok(game.audioHash.jump);
  assert.ok(game.audioHash.nap);
});
