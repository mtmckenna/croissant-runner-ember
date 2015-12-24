import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();

    // stubbing out AudioContext for PhantomJS tests
    window.AudioContext = function() {};

    // Phantom doesn't currently have Math.log10
    Math.log10 = Math.log10 || function(x) {
      return Math.log(x) / Math.LN10;
    };
  });

  return application;
}
