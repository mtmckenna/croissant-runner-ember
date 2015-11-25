import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  metrics: Ember.inject.service(),
  location: config.locationType,

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('index', { path: '/' } );
  this.route('play', { path: 'play/:level_id' }, function() {
    this.route('menu');
  });
});

export default Router;
