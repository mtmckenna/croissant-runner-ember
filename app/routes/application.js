import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  title: function(tokens) {
   var defaultTitle = 'Croissant the Pizza Cat';
   var base = 'CPC';
   var hasTokens = tokens && tokens.length;

   return hasTokens ? `${base} - ${tokens.reverse().join(' - ')}` : defaultTitle;
  },

  actions: {
    enterInitialsAndSaveHiScore: function(score) {
      this.get('session').setPendingHiScore(score);
      this.transitionTo('play.menu.initials', {queryParams: {backRoute: 'play.index'}});
    }
  }
});
