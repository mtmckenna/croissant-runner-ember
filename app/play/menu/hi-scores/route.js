import Ember from 'ember';

export default Ember.Route.extend({
  filters: {
    limit: 100,
    order: '-createdAt',
  },

  model: function() {
    return this.store.query('hi-score', this.filters);
  }
});