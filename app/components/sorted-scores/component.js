import Ember from 'ember';

export default Ember.Component.extend({
  scoreSorting: ['createdAt:desc'],
  sortedScores: Ember.computed.sort('scores', 'scoreSorting')
});
