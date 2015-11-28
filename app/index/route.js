import Ember from 'ember';

export default Ember.Route.extend({
  game: Ember.inject.service(),

  model() {
    return 'demo';
  },

  afterModel(level) {
    const game = this.get('game');
    game.changeLevel(level);
  },

  renderTemplate: function() {
    this.render('index', {
      outlet: 'game-overlay',
      into: 'application'
    });
  }
});
