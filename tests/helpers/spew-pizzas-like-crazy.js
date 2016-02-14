import Ember from 'ember';
import Pizza from 'croissant-runner-ember/game/pizza';

export default Ember.Test.registerHelper('spewPizzasLikeCrazy', function(app) {
  var game = app.__container__.lookup('service:game');

  game.spriteEmitter.emitSprites = function() {
      if (!game.spriteEmitter.shouldCreateSprite(5)) { return; }
      var pizza = new Pizza(this.context, 200, -10.0);
      this.sprites.push(pizza);
    };
});
