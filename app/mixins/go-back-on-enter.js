import Ember from 'ember';

export default Ember.Mixin.create({
  configureGoBackOnEnter() {
    this.configureGoBackOnEnterEventListeners();
    this.addGoBackOnEnterEventListeners();
  },

  tearDownGoBackOnEnter() {
    this.removeGoBackOnEnterEventListeners();
  },

  configureGoBackOnEnterEventListeners() {
    this.set('goBackOnEnter', this._goBackOnEnter.bind(this));
  },

  addGoBackOnEnterEventListeners() {
    window.addEventListener('keydown', this.goBackOnEnter, false);
  },

  removeGoBackOnEnterEventListeners() {
    window.removeEventListener('keydown', this.goBackOnEnter, false);
  },

  _goBackOnEnter(e) {
    if (e.keyCode == 13) {
      this.$().find('.js-go-back').click();
    }
  },
});
