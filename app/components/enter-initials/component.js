import Ember from 'ember';
import GoBackOnEnter from 'croissant-runner-ember/mixins/go-back-on-enter';

export default Ember.Component.extend(GoBackOnEnter, {
  localStorage: Ember.inject.service(),

  init() {
    this._super(...arguments);
    let initials = this.get('localStorage').get('previousInitials');
    this.set('initials', initials);
  },

  keyUp: function() {
    let initials = this.get('initials');
    this.get('localStorage').saveNewInitials(initials);
  },

  didInsertElement() {
    this.configureGoBackOnEnter();
  },

  willDestroyElement() {
    this.tearDownGoBackOnEnter();
  },

  actions: {
    goBack: function() {
      this.sendAction('goBack', this.get('backRoute'));
    }
  }
});
