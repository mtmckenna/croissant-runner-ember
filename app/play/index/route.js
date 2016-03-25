import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    goToMenu: function() {
      this.transitionTo('play.menu.index');
    }
  }
});
