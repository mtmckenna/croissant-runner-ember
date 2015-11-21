import Sprite from './sprite';
import { getRandomInt } from './util';

export default class extends Sprite {
  constructor(context) {
    var y = getRandomInt(0, 160);
    var path = 'assets/images/bird.png';
    super(path,
          context,
          { x: 320, y: y },
          { width: 7, height: 5 },
          { x: -0.5, y: 0 });
  }
}
