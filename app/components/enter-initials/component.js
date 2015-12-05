import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  init() {
    this._super(...arguments);
    let initials = this.get('session').get('previousInitials') || 'MJJ';
    this.set('initials', initials);
  },

  saveNewInitials: function() {
    let initials = this.get('initials');
    this.get('session').saveNewInitials(initials);
  }.observes('initials').on('init'),
});
