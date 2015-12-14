import DS from 'ember-data';

export default DS.JSONSerializer.extend({
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
