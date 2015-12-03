import DS from 'ember-data';

export default DS.Model.extend({
  initials: DS.attr('string'),
  score: DS.attr('number', { defaultValue: 0 }),
  createdAt: DS.attr('date')
});
