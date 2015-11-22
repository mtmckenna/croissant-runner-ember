import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', model);
    this.controllerFor('play').set('isPlaying', false);
  },

  renderTemplate: function() {
    this.render('play.menu', {
      outlet: 'game-menu',
      into: 'play'
    });
  }
});
