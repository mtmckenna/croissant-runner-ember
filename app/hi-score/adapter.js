import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';
import FirebaseAdapter from 'emberfire/adapters/firebase';

const { inject } = Ember;

var adapter = DS.JSONAPIAdapter.extend({});

if (config.environment === 'production') {
  adapter = FirebaseAdapter.extend({
    firebase: inject.service(),
  });
}

export default adapter;
