import Sprite from './sprite';
import { adjustedPositionForSkySprite } from './util';

export default class extends Sprite {
  constructor(context) {
    var path = 'assets/images/moon.png';
    const initialPosition = { x: 263, y: 245 };

    super(path,
          context,
          { x: initialPosition.x, y: initialPosition.y },
          { width: 32, height: 32 },
          { x: 0, y: 0 });

     this.initialPosition = initialPosition;
  }

  get currentFrame() {
    return 0;
  }

  get adjustedPos() {
    return adjustedPositionForSkySprite(this.game, this.pos);
  }
}
