import Ember from 'ember';

export default Ember.Route.extend({
  game: Ember.inject.service(),

  model() {
    return 'demo';
  },

  afterModel(level) {
    const game = this.get('game');
    game.changeLevel(level);
    game.score = 0;
    game.sendGameEvent('updated-pizza-count', 0);
  }
});
