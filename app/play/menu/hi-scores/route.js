import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('hi-score')
    .then(function (data) {
      return Ember.ArrayProxy.extend({
        arrangedContent: Ember.computed.sort('content', 'props'),
        props: ['createdAt:desc']
      }).create({
        content: data
      });
    });
  },
});
