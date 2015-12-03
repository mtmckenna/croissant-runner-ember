import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  // Messed up to modify this hash in place...
  serializeIntoHash: function(hash, typeClass, snapshot, options) {
    Ember.$.extend(hash, this.serialize(snapshot, options));
  },

  normalizeSingleResponse(store, primaryModelClass, payload) {
    payload =  { data: this.formattedRecord(payload) };
    return payload;
  },

  normalizeArrayResponse(store, primaryModelClass, payload) {
    payload =  { data: this.formattedRecords(payload) };
    return payload;
  },

  formattedRecords: function(records) {
    return records.results.map((record) => {
      return this.formattedRecord(record);
    });
  },

  formattedRecord(record) {
    let newRecord = {};
    newRecord.attributes = record;
    newRecord.id = record.objectId;
    newRecord.type = 'hi-score';
    return newRecord;
  }
});
