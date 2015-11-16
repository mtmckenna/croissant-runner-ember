import Ember from 'ember';
import Game from '../../game/game';


export default Ember.Component.extend({
  pauseCallback: function() {
    if (this.get('isPlaying')) {
      this.play();
    } else {
      this.pause();
    }
  }.observes('isPlaying'),

  didInsertElement() {
    this.configureCanvas();
    this.configureGame();
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

  configureGame() {
    this.set('game', new Game(this.get('canvas')));
  },

  configureEventListeners() {
    this.set('playOrPause', this._playOrPause.bind(this));
    this.set('resizeCanvas', this._resizeCanvas.bind(this));
  },

  addEventListeners() {
    var canvas = this.get('canvas');
    window.addEventListener('keydown', this.playOrPause, false);
    window.addEventListener('resize', this.resizeCanvas, false);
  },

  removeEventListeners() {
    window.removeEventListener('keydown', this.playOrPause, false);
    window.removeEventListener('resize', this.resizeCanvas, false);
  },

  play() {
    if (!this.get('isPlaying')) { return; }
    this.removeEventListeners();
    this.addEventListeners();

    this.main();
  },

  main() {
    this.set('animReq', window.requestAnimationFrame(this.main.bind(this)));
    this.game.update();
    this.game.draw();
  },

  pause() {
    window.cancelAnimationFrame(this.get('animReq'));
    this.set('animReq', null);
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
