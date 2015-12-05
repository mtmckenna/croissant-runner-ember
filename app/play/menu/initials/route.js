import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    backRoute: {
      refreshModel: true
    }
  },

  actions: {
    goBack: function(route) {
      this.transitionTo(route);
    }
  }
});
