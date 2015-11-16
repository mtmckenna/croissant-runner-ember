export default class {
  constructor(path, context, loop = false) {
    this.path = path;
    this.context = context;
    this.loop = loop;
    this.loadAudio(this.path);
  }

  loadAudio(path) {
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      var data = request.response;
      this.decodeAudio(data);
    };

    request.send();
  }

  decodeAudio(data) {
    if (!this.context) { return; }

    this.context.decodeAudioData(data, (buffer) => {
      this.buffer = buffer;
    });
  }

  play() {
    if (!this.buffer || !this.context) { return; }

    this.source = this.context.createBufferSource();
    this.source.loop = this.loop;
    this.source.buffer = this.buffer;
    this.source.connect(this.context.destination);
    this.source.start(0);
  }

  stop() {
    if (!this.source) { return; }
    this.source.stop();
  }
}
