import Sprite from './sprite';
import { getRandomInt } from './util';

export default class extends Sprite {
  constructor(context) {
    var y = getRandomInt(220, 234);
    super('flower',
          context,
          { x: 320, y: y },
          { width: 6, height: 6 },
          { x: -1.5, y: 0 });
  }

  get currentFrame() {
    return 0;
  }
}
