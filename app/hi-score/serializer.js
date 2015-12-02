import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeSingleResponse(store, primaryModelClass, payload) {
    payload =  { data: this.formattedRecord(payload) };
    return payload;
  },

  formattedRecord(record) {
    let newRecord = {};
    newRecord.attributes = record;
    newRecord.id = record.objectId;
    newRecord.type = 'hi-score';
    return newRecord;
  }
});
