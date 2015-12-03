import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  previousHiScore: Ember.computed(function() {
    return Cookies.get('hiScore') || 0;
  }).volatile(),

  previousInitials: Ember.computed(function() {
    Cookies.get('initials');
  }).volatile(),

  saveNewHiScore(score, initials) {
    if (score < this.get('previousHiScore')) { return; }

    Cookies.set('hiScore', score);
    Cookies.set('initials', initials);

    let hiScore = this.get('store').createRecord('hi-score', {
      score: score,
      initials: initials
    });

    hiScore.save();
  }
});
