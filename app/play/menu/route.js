import Ember from 'ember';

export default Ember.Route.extend({
  game: Ember.inject.service(),

  pauseGame: function(){
    this.get('game').pause();
  }.on('activate'),

  actions: {
    goToLevel: function(level) {
      this.transitionTo('play', level);
    }
  },

  renderTemplate: function() {
    this.render('play.menu', {
      outlet: 'game-overlay',
      into: 'application'
    });
  }
});
