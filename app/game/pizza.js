import Sprite from './sprite';
import { getRandomInt } from './util';

export default class extends Sprite {
  constructor(context) {
    var y = getRandomInt(20, 200);
    super('pizza',
          context,
          { x: 320, y: y },
          { width: 11, height: 16 },
          { x: -1.5, y: 0 } );
  }

  get currentFrame() {
    return 0;
  }
}
