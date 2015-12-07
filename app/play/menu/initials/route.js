import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  queryParams: {
    backRoute: {
      refreshModel: true
    }
  },

  actions: {
    goBack: function(route) {
      if (route === 'play.index') {
        this.get('session').savePendingHiScore();
      }

      this.transitionTo(route);
    }
  }
});
