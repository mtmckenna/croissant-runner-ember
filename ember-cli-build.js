/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var env = EmberApp.env();
var enableFingerprints = env === 'production' && !process.env.EMBER_CLI_ELECTRON && process.env.EMBER_CLI_CORDOVA == 0

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      enabled: enableFingerprints,
      prepend: 'https://s3.amazonaws.com/croissant.mtmckenna.com-assets/',
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'wav', 'ico']
    },
    dotEnv: {
      path: {
        development: '.env',
        production: '.env.production'
      }
    }
  });

  return app.toTree();
};
