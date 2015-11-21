import Sprite from './sprite';

export default class extends Sprite {
  constructor(context) {
    var y = 210;
    var path = 'assets/images/catbed.png';
    super(path,
          context,
          { x: 320, y: y },
          { width: 32, height: 28 },
          { x: -1.5, y: 0 } );

    this.type = 'catbed';
    this.croissantInCatBedPath = 'assets/images/croissant-in-catbed.png';
    this.cacheImage(this.croissantInCatBedPath);
  }

  switchToSleepingCroissantImage() {
    this.path = this.croissantInCatBedPath;
    this.pos.y = 206;
    this.size.height = 32;
    this.draw();
  }

  get currentFrame() {
    return 0;
  }
}
