import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.currentUser'),

  init() {
    this.get('session').initializeFromCookie();
  },

  setupController: function(controller, model) {
    controller.set('currentUser', this.get('currentUser'));
  },

  title: function(tokens) {
   var defaultTitle = 'Croissant the Pizza Cat';
   var base = 'CPC';
   var hasTokens = tokens && tokens.length;

   return hasTokens ? `${base} - ${tokens.reverse().join(' - ')}` : defaultTitle;
  }
});
