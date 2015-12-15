export default function() {
}

export function testConfig() {
  // Uncaught SyntaxError: Failed to execute 'decodeAudioData' on 'AudioContext': invalid ArrayBuffer for audioData.
  //this.passthrough();

  this.urlPrefix = 'https://api.parse.com';
  this.namespace = '1/classes';

  this.get('hi_scores', function() {
    return {"results":[{"createdAt":"2015-12-14T16:11:55.318Z","initials":"MJJ","objectId":"TVCHoEc6Zg","score":31,"updatedAt":"2015-12-14T16:11:55.318Z"},{"createdAt":"2015-12-14T16:10:54.358Z","initials":"MJJ","objectId":"oxA72x3h9s","score":15,"updatedAt":"2015-12-14T16:10:54.358Z"},{"createdAt":"2015-12-07T03:51:43.008Z","initials":"mtm","objectId":"kwU5XHUK33","score":722,"updatedAt":"2015-12-07T03:51:43.008Z"}]};
  });
}

