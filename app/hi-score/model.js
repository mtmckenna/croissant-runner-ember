import DS from 'ember-data';

export default DS.Model.extend({
  initials: DS.attr('string', { defaultValue: 'MTM' } ),
  hiScore: DS.attr('number', { defaultValue: 2 })
});
