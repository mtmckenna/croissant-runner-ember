import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('index', {
      outlet: 'game-overlay',
      into: 'application'
    });
  }
});
