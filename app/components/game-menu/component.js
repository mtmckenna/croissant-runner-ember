import Ember from 'ember';
import GoBackOnEnter from 'croissant-runner-ember/mixins/go-back-on-enter';

export default Ember.Component.extend(GoBackOnEnter, {
  classNames: ['game-menu'],
  game: Ember.inject.service(),

  init: function() {
    this._super(...arguments);
    const game = this.get('game');
    this.set('audioEnabled', game.audioEnabled);
  },

  didInsertElement() {
    this.configureGoBackOnEnter();
  },

  willDestroyElement() {
    this.tearDownGoBackOnEnter();
  },

  audioText: Ember.computed('audioEnabled', function() {
    return ((this.get('game').audioEnabled) ? 'AUDIO OFF' : 'AUDIO ON');
  }),

  actions: {
    toggleAudio: function() {
      const game = this.get('game');
      game.audioEnabled = !game.audioEnabled;
      this.set('audioEnabled', game.audioEnabled);
    }
  }
});
