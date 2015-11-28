import Ember from 'ember';

export default Ember.Component.extend({
  game: Ember.inject.service(),

  hiScore: 0,
  pizzaCount: 0,

  didInsertElement() {
    this.configureCanvas();
    this.configureGame();
    this.configureEventListeners();
    this.addEventListeners();

    Ember.run.scheduleOnce('afterRender', () => {
      this.resizeCanvas();
      const game = this.get('game');
      if (game.paused === false) { game.play(); }
    });
  },

  willDestroyElement() {
    this.removeEventListeners();
  },

  configureCanvas() {
    var canvas = this.get('element').getElementsByClassName('js-game')[0];
    this.set('canvas', canvas);
  },

  configureGame() {
    const canvas = this.get('canvas');
    const game = this.get('game');

    game.configureGame(canvas, this);
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

  gameEventReceived(eventName, data) {
    if (eventName === 'updated-pizza-count') {
      this.set('pizzaCount', data);
    } else if (eventName === 'new-hi-score') {
      this.set('hiScore', data);
    } else if (eventName ==='changed-level') {
      console.log(`level change event received: ${data}`);
    }
  },

  _playOrPause(e) {
    const game = this.get('game');
    if (e.keyCode === 67) {
      if(this.get('animReq')) {
        game.pause();
      } else {
        game.play();
      }
    }
  },

  _resizeCanvas() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const viewportDimensions = { width: width, height: height };
    this.get('game').resizeCanvasWithViewportDimensions(viewportDimensions);
  }
});
