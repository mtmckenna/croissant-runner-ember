import { module, test } from 'qunit';
import Sprite from 'croissant-runner-ember/game/sprite';

module('Sprite', {
  beforeEach: function() {
    var canvas = document.createElement('canvas');
    var cache = { images: {} };
    var game = { xOffset: 11, yOffset: 15, cache: cache };

    this.context = canvas.getContext('2d');

    Sprite.prototype.game = game;

    this.sprite = new Sprite('pizza/cats.png',
                             this.context,
                             { x: 1, y: 2 },
                             { width: 100, height: 200 },
                             { x: 10, y: 20 });
  },

  afterEach: function() {
    this.sprite = null;
    this.context = null;
    Sprite.prototype.game = null;
  }
});

test('adjustedPos', function(assert) {
  assert.equal(this.sprite.adjustedPos.x, 12);
  assert.equal(this.sprite.adjustedPos.y, 17);
});

test('cacheImage', function(assert) {
  assert.ok(this.sprite.game.cache.images[this.sprite.path]);
});

test('image', function(assert) {
  assert.ok(this.sprite.image);
});

test('currentFrame', function(assert) {
  this.sprite._currentFrame = 0;
  this.sprite.drawCounter = 5;
  assert.equal(this.sprite.currentFrame, 0);
  this.sprite.drawCounter = 10;
  assert.equal(this.sprite.currentFrame, 1);
  this.sprite.drawCounter = 15;
  assert.equal(this.sprite.currentFrame, 1);
  this.sprite.drawCounter = 20;
  assert.equal(this.sprite.currentFrame, 0);
});

test('intersects', function(assert) {
  var intersectingSprite = {
    pos: { x: 2, y: 2 },
    size: { width: 5, height: 5 }
  };

  var nonIntersectingSprite = {
    pos: { x: 1000, y: 1000 },
    size: { width: 5, height: 5 }
  };

  assert.ok(this.sprite.intersects(intersectingSprite));
  assert.notOk(this.sprite.intersects(nonIntersectingSprite));
});

test('update', function(assert) {
  this.sprite.update();
  assert.equal(this.sprite.pos.x, 11);
  assert.equal(this.sprite.pos.y, 22);
});
