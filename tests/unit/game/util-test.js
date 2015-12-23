import { module, test } from 'qunit';
import Util from 'croissant-runner-ember/game/util';

module('Util');

test('getRandomInt', function(assert) {
  var randomInt = Util.getRandomInt(2, 5);

  assert.ok(randomInt < 6);
  assert.ok(randomInt > 1);
});

test('adjustedPositionForSkySprite', function(assert) {
  var game = { xOffset: 8, yOffset: 4 };
  game.unscaledDimensions = { height: 2 };

  var pos = { x: 10, y: 20 };

  var skyPosition = Util.adjustedPositionForSkySprite(game, pos);

  assert.equal(skyPosition.x, 18);
  assert.equal(skyPosition.y, 60);
});

