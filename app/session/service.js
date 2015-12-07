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

  setPendingHiScore(score) {
    Cookies.set('pendingHiScore', score);
  },

  savePendingHiScore() {
    const score = Cookies.get('pendingHiScore');
    const initials = this.get('previousInitials') || 'MJJ';
    this.saveHiScore(score, initials);
    Cookies.remove('pendingHiScore');
  },

  saveNewHiScore(score) {
    if (score < this.get('previousHiScore')) { return; }
    Cookies.set('hiScore', score);
    const initials = this.get('previousInitials') || 'MJJ';
    this.saveHiScore(score, initials);
  },

  saveHiScore(score, initials) {
    const hiScore = this.get('store').createRecord('hi-score', {
      score: score,
      initials: initials
    });

    hiScore.save();
  }
});
