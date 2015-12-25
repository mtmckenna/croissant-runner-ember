import Ember from 'ember';
import Pizza from 'croissant-runner-ember/game/pizza';
import { module, test } from 'qunit';
import startApp from 'croissant-runner-ember/tests/helpers/start-app';

module('Acceptance | gameplay', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('touching pizzas means points', function(assert) {
  var game = this.application.__container__.lookup('service:game');

  visit('/');
  click('a:contains("PLAY!")');

  andThen(function() {
    assert.equal(currentURL(), '/play/1');
    assert.equal(game.score, 0);

    game.spriteEmitter.emitSprites = function() {
      if (!game.spriteEmitter.shouldCreateSprite(10)) { return; }
      var pizza = new Pizza(this.context, 200);
      this.sprites.push(pizza);
    };

    var done = assert.async();
    Ember.run.later(function() {
      assert.ok(game.score > 0);
      done();
    }, 3000);
  });
});
