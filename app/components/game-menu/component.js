import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['game-menu'],
  game: Ember.inject.service(),

  audioText: Ember.computed(function() {
    return 'bananas';
  }),

  actions: {
    toggleAudio: {
    },

    nextLevel: {
    },

    previousLevel: {
    }

  }
});
