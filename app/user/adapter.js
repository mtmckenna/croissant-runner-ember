import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: 'https://api.parse.com',
  namespace: '1/',
  headers: {
    "Accept":"application/json",
    "Content-Type":"application/json",
    "X-Parse-Application-Id": config.parseApplicationId,
    "X-Parse-JAVASCRIPT-Key": config.parseJavascriptKey
  },

  createRecord(store, type, snapshot) {
    const url = `${this.host}/1/users`;
    const data = snapshot.attributes();

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

    data = this.formattedData(data);

    return this.ajax(url, 'PUT', { data: data });
  }
});
