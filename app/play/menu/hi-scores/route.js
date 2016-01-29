import Ember from 'ember';

export default Ember.Route.extend({
  filters: {
    limitToLast: 100
  },

  model: function() {
    return this.store.query('hi-score', this.filters);
  },
});
