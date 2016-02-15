import Sprite from './sprite';
import { getRandomInt, adjustedPositionForSkySprite } from './util';

export default class extends Sprite {
  constructor(context) {
    var y = getRandomInt(0, 120);
    var path = 'assets/images/cloud.png';
    super(path,
          context,
          { x: 320, y: y },
          { width: 6, height: 4 },
          { x: -1.0, y: 0 } );
  }

  get currentFrame() {
    return 0;
  }

  get adjustedPos() {
    return adjustedPositionForSkySprite(this.game, this.pos);
  }
}
