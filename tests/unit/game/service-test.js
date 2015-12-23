import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

moduleFor('service:game', 'Unit | Service | game', {
  beforeEach: function() {
    var canvas = document.createElement('canvas');
    this.context = canvas.getContext('2d');
  },

  afterEach: function() {
    this.context = null;
  }
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

test('resizeCanvasWithViewportDimensions', function(assert) {
  var game = this.subject();
  var canvas = document.createElement('canvas');
  game.canvas = canvas;

  sinon.spy(game, 'configureCanvas');
  sinon.stub(game, 'draw');

  var viewportDimensions = {width: 100, height: 50};

  game.resizeCanvasWithViewportDimensions(viewportDimensions);
  assert.ok(game.configureCanvas.calledWith({height: 240, width: 480}));
  sinon.assert.calledOnce(game.draw);
  game.configureCanvas.restore();
  game.draw.restore();
});

test('adjustedCanvasDimensionsFromViewportDimensions for a landscape browser', function(assert) {
  var game = this.subject();
  var viewportDimensions = {width: 100, height: 50};

  var adjustedDimensions = game.adjustedCanvasDimensionsFromViewportDimensions(viewportDimensions);

  assert.equal(adjustedDimensions.height, 240);
  assert.equal(adjustedDimensions.width, 480);
});

test('adjustedCanvasDimensionsFromViewportDimensions for a portrait browser', function(assert) {
  var game = this.subject();
  var viewportDimensions = {width: 50, height: 100};

  var adjustedDimensions = game.adjustedCanvasDimensionsFromViewportDimensions(viewportDimensions);

  assert.equal(adjustedDimensions.height, 640);
  assert.equal(adjustedDimensions.width, 320);
});

test('adjustedDimensionsForLandscapeViewport', function(assert) {
  var game = this.subject();
  var viewportDimensions = {width: 100, height: 50};

  var adjustedDimensions = game.adjustedDimensionsForLandscapeViewport(viewportDimensions);

  assert.equal(adjustedDimensions.height, 240);
  assert.equal(adjustedDimensions.width, 480);
});

test('adjustedDimensionsForPortraitViewport', function(assert) {
  var game = this.subject();
  var viewportDimensions = {width: 50, height: 100};

  var adjustedDimensions = game.adjustedDimensionsForPortraitViewport(viewportDimensions);

  assert.equal(adjustedDimensions.height, 640);
  assert.equal(adjustedDimensions.width, 320);
});

test('configureCanvas', function(assert) {
  var game = this.subject();
  var canvas = document.createElement('canvas');
  game.canvas = canvas;
  var dimensions = { width: 50, height: 100 };
  game.configureCanvas(dimensions);
  assert.equal(canvas.width, dimensions.width);
  assert.equal(canvas.height, dimensions.height);
});

