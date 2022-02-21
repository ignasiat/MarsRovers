import { roverExpedition, roverOneMovement, terrainInitialization } from '../helpers'
import { MOVEMENT, ORIENTATIONS, TERRAIN_AVAILABLE, TERRAIN_OBSTACLE, TERRAIN_ROVER } from '../constants'
import { Configuration, ErrorConfiguration, Terrain } from '../types';

const testError: ErrorConfiguration = {
  xOrigin: null,
  yOrigin: null,
  numberOfObstacles: null,
  commands: null,
  totalValidation: true
}

const testConfiguration: Configuration = {
  cols: 10,
  rows: 10,
  numberOfObstacles: 10,
  xOrigin: 5,
  yOrigin: 6,
  directionOrigin: ORIENTATIONS.north,
  commands: 'FFF',
  submited: true,
  error: testError
};

const terrainExample: Terrain = [
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
    describe("Set the movement to be Forward", () => {

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
      });
    });

    describe("Set the movement to be Right", () => {
      test("It would return movementPossible false when finds an obstacle", () => {
        const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.north, MOVEMENT.right);
        
        expect(resultMovement.movementPossible).toBeFalsy();
      })
      
      test("It would return movementPossible true when not finds an obstacle", () => {
        const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.south, MOVEMENT.right);
        
        expect(resultMovement.movementPossible).toBeFalsy();
      })
      
      test("It would return the same position when finds an obstacle", () => {
        const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.south, MOVEMENT.right);
        
        expect(resultMovement.xPosition).toBe(1);
        expect(resultMovement.yPosition).toBe(1);
      })
      
      test("It would return the some position when it founds an obstacle facing east", () => {
        const resultMovement = roverOneMovement(terrainExample, 0, 0, ORIENTATIONS.east, MOVEMENT.right);

        expect(resultMovement.xPosition).toBe(0);
        expect(resultMovement.yPosition).toBe(0);
      })

      test("It would return the some position when orientantion is string empty", () => {
        const resultMovement = roverOneMovement(terrainExample, 1, 1, '', MOVEMENT.right);
        
        expect(resultMovement.xPosition).toBe(1);
        expect(resultMovement.yPosition).toBe(1);
      })
      
      test("It would return the some terrain when finds an obstacle", () => {
        const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.west, MOVEMENT.right);
        
        expect(resultMovement.terrain).toEqual(terrainExample);
      });
    });

    describe("Set the movement to be Left", () => {
      test("It would return movementPossible false when finds an obstacle", () => {
        const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.north, MOVEMENT.left);
        
        expect(resultMovement.movementPossible).toBeFalsy();
      })
      
      test("It would return movementPossible true when not finds an obstacle", () => {
        const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.east, MOVEMENT.left);
        
        expect(resultMovement.movementPossible).toBeFalsy();
      })
      
      test("It would return the same position when finds an obstacle", () => {
        const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.south, MOVEMENT.left);
        
        expect(resultMovement.xPosition).toBe(1);
        expect(resultMovement.yPosition).toBe(1);
      })
      
      test("It would return the some position when orientantion is string empty", () => {
        const resultMovement = roverOneMovement(terrainExample, 1, 1, '', MOVEMENT.left);
        
        expect(resultMovement.xPosition).toBe(1);
        expect(resultMovement.yPosition).toBe(1);
      })
      
      test("It would return the some terrain when finds an obstacle", () => {
        const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.west, MOVEMENT.left);
        
        expect(resultMovement.terrain).toEqual(terrainExample);
      });
    });
   describe("Set the movement to not allowed value", () => {
     test("It would return the some position", () => {
      const resultMovement = roverOneMovement(terrainExample, 1, 1, ORIENTATIONS.west, '');

      expect(resultMovement.xPosition).toBe(1);
      expect(resultMovement.yPosition).toBe(1);
     });
   }); 
  });
  describe("given a roverExpedition function", () => {
    test("movementsDone will be a subset of commands", () => {
      const {terrain, movementsDone} = roverExpedition(testConfiguration);

      const movementsDoneString = movementsDone.join('');
      expect(testConfiguration.commands.includes(movementsDoneString)).toBeTruthy();
    })
  })
});