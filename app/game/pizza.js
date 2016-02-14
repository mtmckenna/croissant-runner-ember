import Sprite from './sprite';
import { getRandomInt } from './util';

export default class extends Sprite {
  constructor(context, yPosition = null, xVelocity = -1.5) {
    var path = 'assets/images/pizza.png';
    yPosition = yPosition || getRandomInt(20, 200);
    super(path,
          context,
          { x: 320, y: yPosition },
          { width: 11, height: 16 },
          { x: xVelocity, y: 0 } );

    this.type = 'pizza';
  }

  get currentFrame() {
    return 0;
  }
}
