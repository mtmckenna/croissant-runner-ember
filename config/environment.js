/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'croissant-runner-ember',
    environment: environment,
    firebase: process.env.FIREBASE_URL,
    baseURL: '/',
    defaultLocationType: process.env.EMBER_CLI_ELECTRON ? 'hash' : 'auto',

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' www.google-analytics.com 'unsafe-inline'",
      'font-src': "'self'",
      'connect-src': "'self' www.google-analytics.com wss://*.firebaseio.com",
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

    pace: {
      theme: 'loading-bar',
      color: 'blue',
      catchupTime: 50,
      initialRate: .01,
      minTime: 100,
      ghostTime: 50,
      maxProgressPerFrame: 20,
      easeFactor: 1.25,
      startOnPageLoad: true,
      restartOnPushState: true,
      restartOnRequestAfter: 500,
      target: 'body',

      elements: {
        checkInterval: 100,
        selectors: ['body', '.ember-view']
      },

      eventLag: {
        minSamples: 10,
        sampleCount: 3,
        lagThreshold: 3
      },

      ajax: {
        trackMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        trackWebSockets: false,
        ignoreURLs: []
      }
    },

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
      enabled: true
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

  if (environment === 'production') {}

  return ENV;
};
