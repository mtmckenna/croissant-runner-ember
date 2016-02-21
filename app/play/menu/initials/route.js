import Ember from 'ember';

export default Ember.Route.extend({
  localStorage: Ember.inject.service(),

  queryParams: {
    backRoute: {
      refreshModel: true
    }
  },

  actions: {
    goBack: function(route) {
      if (route === 'play.index') {
        this.get('localStorage').savePendingHiScore();
      }

      this.transitionTo(route);
    }
  }
});
