import Ember from 'ember';

export default Ember.Route.extend({
  game: Ember.inject.service(),

  pauseGame: function(){
    const game = this.get('game');
    game.pause();
  }.on('activate'),

  playGame: function(){
    const game = this.get('game');
    game.play();
  }.on('deactivate'),

  actions: {
    goToLevel: function(level) {
      this.transitionTo('play', level);
    }
  }
});
