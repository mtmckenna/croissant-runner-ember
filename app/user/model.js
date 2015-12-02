import DS from 'ember-data';

export default DS.Model.extend({
  level: DS.attr('string'),
  initials: DS.attr('string'),
  hiScore: DS.attr('number', { defaultValue: 0 }),
  username: DS.attr('string'),
  sessionToken: DS.attr('string')
});
