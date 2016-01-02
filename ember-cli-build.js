/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      prepend: 'https://s3.amazonaws.com/croissant.mtmckenna.com-assets/',
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'wav'],
      exclude: ['apple-touch-icon', 'favicon']
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
