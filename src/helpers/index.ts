import {
  MOVEMENT,
  ORIENTATIONS,
  TERRAIN_AVAILABLE,
  TERRAIN_OBSTACLE,
  TERRAIN_ROVER
} from '../constants';
import {
  Configuration,
  Movement,
  MovementInTerrain,
  Orientation,
  RoverExpedition, Terrain, TerrainLayer
} from '../types';

export const terrainInitialization = (configuration_: Configuration): Terrain => {
  let numberOfObstaclesAllocated: number = 0;
  let xObstacle: number;
  let yObstacle: number;
  const newTerrain: Terrain = [];

  // Creation of the available terrain
  for (let i = 0; i < configuration_.rows; i += 1) {
    newTerrain.push(TERRAIN_AVAILABLE.repeat(configuration_.cols).split('') as TerrainLayer);
  }
  // Set the obstacles
  while (numberOfObstaclesAllocated < configuration_.numberOfObstacles) {
    xObstacle = Math.floor(Math.random() * configuration_.rows);
    yObstacle = Math.floor(Math.random() * configuration_.cols);
    if (newTerrain[yObstacle][xObstacle] === TERRAIN_AVAILABLE
      && xObstacle !== configuration_.xOrigin - 1
      && yObstacle !== configuration_.yOrigin - 1) {
      newTerrain[yObstacle][xObstacle] = TERRAIN_OBSTACLE;
      numberOfObstaclesAllocated += 1;
    }
  }

  // Set the rover at the starting point
  newTerrain[configuration_.yOrigin - 1][configuration_.xOrigin - 1] = TERRAIN_ROVER;

  return newTerrain;
};

export const roverOneMovement = (
  terrain: Terrain,
  xPosition: number,
  yPosition: number,
  orientation: Orientation,
  movement: Movement
): MovementInTerrain => {
  const newTerrain: Terrain = [...terrain];

  const yUp = Math.max(yPosition - 1, 0);
  const yDown = Math.min(yPosition + 1, terrain.length);
  const xRight = Math.min(xPosition + 1, terrain[1].length);
  const xLeft = Math.max(xPosition - 1, 0);

  let xNewPosition = xPosition;
  let yNewPosition = yPosition;
  if (movement === MOVEMENT.forward) {
    // Moving Forward
    switch (orientation) {
      case ORIENTATIONS.north:
        yNewPosition = yUp;
        break;
      case ORIENTATIONS.south:
        yNewPosition = yDown;
        break;
      case ORIENTATIONS.east:
        xNewPosition = xRight;
        break;
      case ORIENTATIONS.west:
        xNewPosition = xLeft;
        break;
      default:
        break;
    }
  } else if (movement === MOVEMENT.right) {
    // Moving Right
    switch (orientation) {
      case ORIENTATIONS.north:
        xNewPosition = xRight;
        break;
      case ORIENTATIONS.south:
        xNewPosition = xLeft;
        break;
      case ORIENTATIONS.east:
        yNewPosition = yDown;
        break;
      case ORIENTATIONS.west:
        yNewPosition = yUp;
        break;
      default:
        break;
    }
  } else if (movement === MOVEMENT.left) {
    // Moving Right
    switch (orientation) {
      case ORIENTATIONS.north:
        xNewPosition = xLeft;
        break;
      case ORIENTATIONS.south:
        xNewPosition = xRight;
        break;
      case ORIENTATIONS.east:
        yNewPosition = yUp;
        break;
      case ORIENTATIONS.west:
        yNewPosition = yDown;
        break;
      default:
        break;
    }
  }
  if (terrain[yNewPosition][xNewPosition] !== TERRAIN_OBSTACLE
    && (xNewPosition !== xPosition || yNewPosition !== yPosition)) {
    newTerrain[yNewPosition][xNewPosition] = TERRAIN_ROVER;
    return {
      terrain: newTerrain,
      xPosition: xNewPosition,
      yPosition: yNewPosition,
      movementDone: movement,
      movementPossible: true
    };
  }
  return {
    terrain,
    xPosition,
    yPosition,
    movementDone: null,
    movementPossible: false
  };
};

export const roverExpedition = (configuration: Configuration): RoverExpedition => {
  let movementPossible: Boolean = true;
  let movement: Movement;
  let xPosition: number = configuration.xOrigin - 1;
  let yPosition: number = configuration.yOrigin - 1;
  let terrain: Terrain = terrainInitialization(configuration);
  let movementDone: Movement | null;
  const movementsDone: Movement[] = [];
  const arrayMovements = configuration.commands.split('');
  while (arrayMovements.length > 0 && movementPossible) {
    movement = arrayMovements.shift() as Movement;
    ({
      terrain,
      xPosition,
      yPosition,
      movementDone,
      movementPossible
    } = roverOneMovement(terrain, xPosition, yPosition, configuration.directionOrigin, movement));
    if (movementDone) {
      movementsDone.push(movementDone);
    }
  }
  return { terrain, movementsDone };
};
