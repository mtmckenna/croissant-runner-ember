import Ember from 'ember';

export default Ember.Route.extend({
  game: Ember.inject.service(),

  playGame: function() {
    const game = this.get('game');
    game.paused = false;
  }.on('activate'),

  titleToken: function(model) {
    return `Level ${model}`;
  },

  model(params) {
    return parseInt(params.level_id);
  },

  actions: {
    willTransition(transition) {
      if (transition.targetName === 'play.index') {
        this.get('game').play();
      }
      return true;
    }
  },

  renderTemplate: function() {
    this.render('play', {
      outlet: 'game-overlay',
      into: 'application'
    });
  }
});
