import { USER_LIST } from './constants';

export default function listUsersInView(positionX, positionY, screenWidth, screenHeight) {
  const users = USER_LIST;
  const usersInView = [];

  const halfWidth = screenWidth / 2;
  const halfHeight = screenHeight / 2;
  const [minWidth, maxWidth] = [positionX - halfWidth, positionX + halfWidth];
  const [minHeight, maxHeight] = [positionY - halfHeight, positionY + halfHeight];

  /**
   * Filter all peer avatar's based on whether the avatar's position is within the user's view port
   * If the avatar's x and y coordinates are between the user's minWidth, maxWidth, minHeight, and maxHeight
   * the avatar is within view
   */
  for (let value of Object.values(users)) {
    if (
      minWidth <= value.x &&
      value.x <= maxWidth &&
      minHeight <= value.y &&
      value.y <= maxHeight
    ) {
      usersInView.push({
        id: value.id,
        username: value.username,
        distance: Math.floor(findDistance([positionX, positionY], [value.x, value.y])),
        isBroadcaster: value.is_broadcaster,
      });
    }
  }

  /**
   * Filter all peer avatar's based on whether the entire avatar is within the user's view port
    const halfAvatarWidth = 50 / 2;
    const halfAvatarHeight = 125 / 2;
    for (let value of Object.values(users)) {
      if (
        minWidth <= value.x - halfAvatarWidth &&
        value.x + halfAvatarWidth <= maxWidth &&
        minHeight <= value.y - halfAvatarHeight &&
        value.y + halfAvatarHeight <= maxHeight
      ) {
        usersInView.push({
          id: value.id,
          username: value.username,
          distance: Math.floor(findDistance([positionX, positionY], [value.x, value.y])),
          isBroadcaster: value.is_broadcaster,
        });
      }
    }
   */

  usersInView.sort((a, b) => {
    if (a.distance === b.distance) return a.id - b.id;
    return a.distance - b.distance;
  });
  return usersInView;
}

const findDistance = (p1, p2) => {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
};
