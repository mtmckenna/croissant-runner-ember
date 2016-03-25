import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    this.set('goToMenu', this._goToMenu.bind(this));
    this.$()[0].addEventListener('mousedown', this.get('goToMenu'), true);
    this.$()[0].addEventListener('touchstart', this.get('goToMenu'), true);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$()[0].removeEventListener('mousedown', this.get('goToMenu'), true);
    this.$()[0].removeEventListener('touchstart', this.get('goToMenu'), true);
  },

  _goToMenu: function(event) {
    event.stopPropagation();
    event.preventDefault();
    this.sendAction('goToMenu');
  }
});
