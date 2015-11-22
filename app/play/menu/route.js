import Ember from 'ember';

export default Ember.Route.extend({
  game: Ember.inject.service(),

  pauseGame: function(){
    this.get('game').pause();
  }.on('activate'),

  renderTemplate: function() {
    this.render('play.menu', {
      outlet: 'game-menu',
      into: 'play'
    });
  },

  actions: {
    goToLevel: function(level) {
      this.transitionTo('play', level);
    }
  }
});
