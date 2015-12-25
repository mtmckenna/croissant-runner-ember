import Ember from 'ember';
import GoBackOnEnter from 'croissant-runner-ember/mixins/go-back-on-enter';

export default Ember.Component.extend(GoBackOnEnter, {
  session: Ember.inject.service(),

  init() {
    this._super(...arguments);
    let initials = this.get('session').get('previousInitials') || 'MJJ';
    this.set('initials', initials);
  },

  didInsertElement() {
    this.configureGoBackOnEnter();
  },

  willDestroyElement() {
    this.tearDownGoBackOnEnter();
  },

  saveNewInitials: function() {
    let initials = this.get('initials');
    this.get('session').saveNewInitials(initials);
  }.observes('initials').on('init'),

  actions: {
    goBack: function() {
      this.sendAction('goBack', this.get('backRoute'));
    }
  }
});
