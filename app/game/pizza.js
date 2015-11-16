import Sprite from './sprite';
import { getRandomInt } from './util';

export default class extends Sprite {
  constructor(context) {
    var path = '../images/pizza.png';
    var y = getRandomInt(20, 200);
    super(path,
          context,
          { x: 320, y: y },
          { width: 11, height: 16 },
          { x: -1.5, y: 0 } );

    this.type = 'pizza';
  }

  get currentFrame() {
    return 0;
  }
}
