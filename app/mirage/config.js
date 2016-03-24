export default function() {
  this.passthrough('/assets/audio/**');
  this.get('hi-scores', function(db, request) {
    var limit = parseInt(request.queryParams['limitToLast']);
    return {
      data: db['hi-scores'].reverse().slice(0, limit).map(attrs => (
        {type: 'hi-scores', id: attrs.id, attributes: attrs }
      )).sortBy('createdAt')
    };
  });

  this.post('hi-scores', function(db, request) {
    var requestBody = JSON.parse(request.requestBody);
    return requestBody;
  });
}
