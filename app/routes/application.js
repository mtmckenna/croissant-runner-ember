import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  afterModel() {
    this.get('session').initializeFromCookie();
  },

  title: function(tokens) {
   var defaultTitle = 'Croissant the Pizza Cat';
   var base = 'CPC';
   var hasTokens = tokens && tokens.length;

   return hasTokens ? `${base} - ${tokens.reverse().join(' - ')}` : defaultTitle;
  }
});
