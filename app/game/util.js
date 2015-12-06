export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function adjustedPositionForSkySprite(game, pos) {
  const unscaledHeight = game.unscaledDimensions.height;
  const scaleFactor = (game.yOffset + unscaledHeight) / unscaledHeight;
  return {
    x: pos.x + game.xOffset,
    y: pos.y * scaleFactor
  };
}



