import { roverOneMovement, terrainInitialization } from '..'
import { MOVEMENT, ORIENTATIONS, TERRAIN_AVAILABLE, TERRAIN_OBSTACLE, TERRAIN_ROVER } from '../../constants'

const testConfiguration = {
  cols: 10,
  rows: 10,
  numberOfObstacles: 10,
  xOrigin: 5,
  yOrigin: 6,
  directionOrigin: ORIENTATIONS.north,
  commands: 'FFF',
  disabled: true
};

const terrainExample = [
  [TERRAIN_AVAILABLE, TERRAIN_OBSTACLE, TERRAIN_AVAILABLE],
  [TERRAIN_OBSTACLE, TERRAIN_AVAILABLE, TERRAIN_OBSTACLE],
  [TERRAIN_AVAILABLE, TERRAIN_AVAILABLE, TERRAIN_AVAILABLE]
];

describe("given a helpers modules", () => {
  describe("given a terrainInitialization function", () => {
    test("It would place the robert at (5,4) with xOrigin 5 and yOrigin 6", () => {
      const resultTerrain = terrainInitialization(testConfiguration);

      expect(resultTerrain[5][4]).toBe(TERRAIN_ROVER);
    });
  });

  describe("given a roverOneMovement function", () => {
    test("It would return movementPossible false when finds an obstacle", () => {
      const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.north, MOVEMENT.forward);

      expect(resultMovement.movementPossible).toBeFalsy();
    })

    test("It would return movementPossible true when not finds an obstacle", () => {
      const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.south, MOVEMENT.forward);

      expect(resultMovement.movementPossible).toBeTruthy();
    })

    test("It would return the same position when finds an obstacle", () => {
      const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.east, MOVEMENT.forward);

      expect(resultMovement.xPosition).toBe(1);
      expect(resultMovement.yPosition).toBe(1);
    })

    test("It would return the some position when orientantion is string empty", () => {
      const resultMovement = roverOneMovement(terrainExample, 1, 1, '', MOVEMENT.forward);

      expect(resultMovement.xPosition).toBe(1);
      expect(resultMovement.yPosition).toBe(1);
    })

    test("It would return the some terrain when finds an obstacle", () => {
      const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.west, MOVEMENT.forward);

      expect(resultMovement.terrain).toEqual(terrainExample);
    })
  })
});