import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('dispatchMouseDownEvent', function(app, selector) {
  var event = new Event('mousedown');
  var element = $(selector)[0];
  Ember.run(() => element.dispatchEvent(event));
});
