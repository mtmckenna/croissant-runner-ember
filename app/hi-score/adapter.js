import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: 'https://api.parse.com',
  namespace: '1/classes',
  headers: {
    "Accept":"application/json",
    "Content-Type":"application/json",
    "X-Parse-Application-Id": config.parseApplicationId,
    "X-Parse-JAVASCRIPT-Key": config.parseJavascriptKey
  },

  pathForType: function() { return 'hi_scores'; }
});
