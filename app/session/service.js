import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  previousHiScore: Ember.computed(function() {
    return window.localStorage.getItem('hiScore') || 0;
  }).volatile(),

  previousInitials: Ember.computed(function() {
    return window.localStorage.getItem('initials') || 'MJJ';
  }).volatile(),

  saveNewInitials(initials) {
    window.localStorage.setItem('initials', initials);
  },

  setPendingHiScore(score) {
    window.localStorage.setItem('pendingHiScore', score);
  },

  savePendingHiScore() {
    const score = window.localStorage.getItem('pendingHiScore');
    const initials = this.get('previousInitials');

    this.saveHiScore(score, initials);
    window.localStorage.removeItem('pendingHiScore');
  },

  saveNewHiScore(score) {
    if (score < this.get('previousHiScore')) { return; }
    window.localStorage.setItem('hiScore', score);
    const initials = this.get('previousInitials');
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
