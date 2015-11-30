import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.currentUser'),
  host: 'https://api.parse.com',
  namespace: '1',
  headers: {
      "Accept":"application/json",
      "Content-Type":"application/json",
      "X-Parse-Application-Id": config.parseApplicationId,
      "X-Parse-JAVASCRIPT-Key": config.parseJavascriptKey
  },

  loggedInHeaders: Ember.computed(function() {
    const headers = this.get('headers');
    const sessionHeader = {
      "X-Parse-Session-Token": this.get('currentUser').get('sessionToken')
    };

    return Ember.$.extend({}, headers, sessionHeader);
  }),

  loginUser(username, password) {
    const url = `${this.host}/1/login`;
    const data = {
      username: username,
      password: password
    };

    return Ember.$.ajax(url, {
      method: 'GET',
      data: data,
      headers: this.get('headers')
    });
  },

  createRecord(store, type, snapshot) {
    const url = `${this.host}/1/users`;
    let data = snapshot.attributes();
    data.password = snapshot.record.password;

    return Ember.$.ajax(url, {
      method: 'POST',
      data: JSON.stringify(data),
      headers: this.get('headers')
    });
  },

  updateRecord: function(store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    var id = snapshot.id;
    var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');

    return Ember.$.ajax(url, {
      method: 'PUT',
      data: JSON.stringify(data),
      headers: this.get('loggedInHeaders')
    });
  }
});
