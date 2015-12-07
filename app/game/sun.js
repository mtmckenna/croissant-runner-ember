import Sprite from './sprite';
import { adjustedPositionForSkySprite } from './util';

export default class extends Sprite {
  constructor(context) {
    var path = 'assets/images/sun.png';
    const initialPosition = { x: 25, y: 25 };

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
    const newPos = adjustedPositionForSkySprite(this.game, this.pos);
    return { x: this.initialPosition.x, y: newPos.y };
  }
}
