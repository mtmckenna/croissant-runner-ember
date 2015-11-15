import Sprite from './sprite';

export default class extends Sprite {
  constructor(context) {
    var y = 210;
    super('catbed',
          context,
          { x: 320, y: y },
          { width: 32, height: 28 },
          { x: -1.5, y: 0 } );

    this.cacheImage('croissant-in-catbed');
  }

  switchToSleepingCroissantImage() {
    this.type = 'croissant-in-catbed';
    this.pos.y = 206;
    this.size.height = 32;
    this.draw();
  }

  get currentFrame() {
    return 0;
  }
}
