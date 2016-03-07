import config from '../config/environment';
import Firebase from 'firebase';
import FirebaseAdapter from 'emberfire/adapters/firebase';

var adapter = DS.JSONAPIAdapter.extend({});

if (config.environment === 'production') {
  adapter = FirebaseAdapter.extend({
    firebase: inject.service(),
  });
}

export default adapter;
