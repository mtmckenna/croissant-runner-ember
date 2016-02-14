import Ember from 'ember';

export default Ember.Route.extend({
  game: Ember.inject.service(),

  pauseGame: function(){
    this.get('game').pause();
  }.on('activate'),

  playGame: function(){
    this.get('game').play();
  }.on('deactivate')
});
