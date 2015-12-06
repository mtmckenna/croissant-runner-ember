import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['game-menu'],
  game: Ember.inject.service(),

  init: function() {
    this._super(...arguments);
    const game = this.get('game');
    this.set('audioEnabled', game.audioEnabled);
  },

  audioText: Ember.computed('audioEnabled', function() {
    return ((this.get('game').audioEnabled) ? 'AUDIO OFF' : 'AUDIO ON');
  }),

  actions: {
    toggleAudio: function() {
      const game = this.get('game');
      game.audioEnabled = !game.audioEnabled;
      this.set('audioEnabled', game.audioEnabled);
    },

    nextLevel: function(){
      const game = this.get('game');
      const level = Math.min(game.level + 1, 10);
      this.sendAction('goToLevel', level);
    },

    previousLevel: function(){
      const game = this.get('game');
      const level = Math.max(game.level - 1, 1);
      this.sendAction('goToLevel', level);
    }
  }
});
