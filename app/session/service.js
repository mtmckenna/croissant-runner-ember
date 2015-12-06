/*global Cookies */

import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  previousHiScore: Ember.computed(function() {
    return Cookies.get('hiScore') || 0;
  }).volatile(),

  previousInitials: Ember.computed(function() {
    return Cookies.get('initials');
  }).volatile(),

  saveNewInitials(initials) {
    Cookies.set('initials', initials);
  },

  saveNewHiScore(score) {
    if (score < this.get('previousHiScore')) { return; }

    Cookies.set('hiScore', score);

    let hiScore = this.get('store').createRecord('hi-score', {
      score: score,
      initials: this.get('previousInitials') || 'MJJ'
    });

    hiScore.save();
  }
});
