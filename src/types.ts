export type Configuration = {
  cols: number,
  rows: number,
  numberOfObstacles: number,
  yOrigin: number,
  xOrigin: number,
  directionOrigin: Orientation,
  commands: string,
  submited: boolean,
  error: ErrorConfiguration
}

export type ErrorConfiguration = {
  numberOfObstacles: null | string,
  yOrigin: null | string,
  xOrigin: null | string,
  commands: null | string,
  totalValidation: boolean
}

export type SetConfiguration = (configuration: Configuration) => void;

export type TerrainElement = ('A' | 'O' | 'R')

export type TerrainLayer = TerrainElement[];

export type Terrain = TerrainLayer[];

export type Movement = 'F' | 'R' | 'L';

export type Orientation = 'N' | 'S' | 'E' | 'W';

export type MovementInTerrain = {
  terrain: Terrain,
  xPosition: number,
  yPosition: number,
  movementDone: Movement | null,
  movementPossible: boolean
}

export type RoverExpedition = {
  terrain: Terrain,
  movementsDone: Movement[]
}