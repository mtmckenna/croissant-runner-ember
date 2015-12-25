import Ember from 'ember';

export default Ember.Component.extend({
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

  configureGoBackOnEnter() {
    this.configureGoBackOnEnterEventListeners();
    this.addGoBackOnEnterEventListeners();
  },

  tearDownGoBackOnEnter() {
    this.removeGoBackOnEnterEventListeners();
  },

  configureGoBackOnEnterEventListeners() {
    this.set('goBackOnEnter', this._goBackOnEnter.bind(this));
  },

  addGoBackOnEnterEventListeners() {
    window.addEventListener('keydown', this.goBackOnEnter, false);
  },

  removeGoBackOnEnterEventListeners() {
    window.removeEventListener('keydown', this.goBackOnEnter, false);
  },

  _goBackOnEnter(e) {
    if (e.keyCode == 13) {
      this.$().find('.js-go-back').click();
    }
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
