import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return parseInt(params.level_id);
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('isPlaying', true);
  },

  playOrPauseGame: function(targetName) {
    if (targetName === 'play.index') {
      this.controllerFor('play').set('isPlaying', true);
    } else {
      this.controllerFor('play').set('isPlaying', false);
    }
  },

  actions: {
    willTransition(transition) {
      this.playOrPauseGame(transition.targetName);
      return true;
    }
  }
});
