import Ember from 'ember';

export default Ember.Component.extend({
  game: Ember.inject.service(),

  pauseCallback: function() {
    if (this.get('isPlaying')) {
      this.play();
    } else {
      this.pause();
    }
  }.observes('isPlaying'),

  didInsertElement() {
    this.configureCanvas();
    const canvas = this.get('canvas');
    const level = this.get('level');
    this.get('game').configureGame(canvas, level);
    this.configureEventListeners();

    this.play();

    Ember.run.scheduleOnce('afterRender', () => {
      this.resizeCanvas();
    });
  },

  willDestroyElement() {
    this.removeEventListeners();
  },

  configureCanvas() {
    var canvas = this.get('element').getElementsByClassName('game')[0];
    this.set('canvas', canvas);
  },

  configureEventListeners() {
    this.set('playOrPause', this._playOrPause.bind(this));
    this.set('resizeCanvas', this._resizeCanvas.bind(this));
  },

  addEventListeners() {
    window.addEventListener('keydown', this.playOrPause, false);
    window.addEventListener('resize', this.resizeCanvas, false);
  },

  removeEventListeners() {
    window.removeEventListener('keydown', this.playOrPause, false);
    window.removeEventListener('resize', this.resizeCanvas, false);
    const game = this.get('game');
    if (game) { game.removeEventListeners(); }
  },

  play() {
    if (!this.get('isPlaying')) { return; }
    this.removeEventListeners();
    this.addEventListeners();
    this.get('game').addEventListeners();

    this.main();
  },

  pause() {
    window.cancelAnimationFrame(this.get('animReq'));
    this.set('animReq', null);
    if (this.get('game')) { this.get('game').removeEventListeners(); }
  },


  main() {
    this.set('animReq', window.requestAnimationFrame(this.main.bind(this)));
    const game = this.get('game');
    game.update();
    game.draw();
  },

  _playOrPause(e) {
    if (e.keyCode === 67) {
      if(this.get('animReq')) {
        this.pause();
      } else {
        this.play();
      }
    }
  },

  _resizeCanvas() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasClass = 'canvas-tall';

    if (width > height) { canvasClass = 'canvas-wide'; }

    var canvas = this.get('canvas');
    canvas.className = canvasClass;
  }
});
