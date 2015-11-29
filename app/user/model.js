import DS from 'ember-data';

export default DS.Model.extend({
  level: DS.attr('string'),
  initials: DS.attr('string'),
  hiScore: DS.attr('number'),
  username: DS.attr('string'),
  password: DS.attr('string'),
});