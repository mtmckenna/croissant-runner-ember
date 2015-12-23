import { module, test } from 'qunit';
import Croissant from 'croissant-runner-ember/game/croissant';

module('Croissant', {
  beforeEach: function() {
    var canvas = document.createElement('canvas');
    var cache = { images: {} };
    var game = { xOffset: 11, yOffset: 15, cache: cache };

    this.context = canvas.getContext('2d');

    Croissant.prototype.game = game;

    this.croissant = new Croissant(this.context);
  },

  afterEach: function() {
    this.croissant = null;
    this.context = null;
    Croissant.prototype.game = null;
  }
});

test('jump', function(assert) {
  var didJump = this.croissant.jump();
  assert.equal(this.croissant.vel.y, -14);
  assert.ok(didJump);

  this.croissant.update();

  var didntJump = this.croissant.jump();
  assert.notOk(didntJump);
});

test('update', function(assert) {
  assert.equal(this.croissant.pos.y, this.croissant.groundLevel);
  this.croissant.jump();
  this.croissant.update();

  assert.equal(this.croissant.pos.y, 186);
  assert.equal(this.croissant.vel.y, -13.5);

  this.croissant.pos.y = this.croissant.groundLevel + 1;
  this.croissant.vel.y = 1;

  this.croissant.update();

  assert.equal(this.croissant.pos.y, 200);
  assert.equal(this.croissant.vel.y, 0);
});
