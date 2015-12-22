/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'croissant-runner-ember',
    environment: environment,
    baseURL: '/',
    defaultLocationType: process.env.EMBER_CLI_ELECTRON ? 'hash' : 'auto',

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' www.google-analytics.com 'unsafe-inline'",
      'font-src': "'self'",
      'connect-src': "'self' www.google-analytics.com api.parse.com",
      'img-src': "'self' www.google-analytics.com",
      'style-src': "'self'",
      'media-src': "'self'"
    },

    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['production'],
        config: {
          id: process.env.GA_ID
        }
      }
    ],

    cordova: {
      rebuildOnChange: false,
      emulate: true
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV['ember-cli-mirage'] = {
      enabled: false
    }
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    //ENV.APP.LOG_TRANSITIONS = true;
    //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
  }

  ENV.parseApplicationId = process.env.PARSE_APPLICATION_ID;
  ENV.parseJavascriptKey = process.env.PARSE_JAVASCRIPT_KEY;

  return ENV;
};
