import { Movement, Orientation, TerrainElement } from './types';

export const MAX_COLUMS: number = 200;
export const MAX_ROWS: number = 200;
export const MAX_OBSTACLES: number = 300;
export const ORIENTATIONS: { [key: string]: Orientation } = {
  north: 'N',
  south: 'S',
  east: 'E',
  west: 'W'
};
export const ORIENTATIONS_TEXT: { [key: string]: string } = {
  [ORIENTATIONS.north]: 'North',
  [ORIENTATIONS.south]: 'South',
  [ORIENTATIONS.east]: 'East',
  [ORIENTATIONS.west]: 'West'
};
export const DIRECTIONS: Orientation[] = [
  ORIENTATIONS.north,
  ORIENTATIONS.south,
  ORIENTATIONS.east,
  ORIENTATIONS.west];
export const TERRAIN_AVAILABLE: TerrainElement = 'A';
export const TERRAIN_AVAILABLE_TEXT: string = 'Available';
export const TERRAIN_OBSTACLE: TerrainElement = 'O';
export const TERRAIN_OBSTACLE_TEXT: string = 'Obstacle';
export const TERRAIN_ROVER: TerrainElement = 'R';
export const TERRAIN_ROVER_TEXT: string = 'Rover';
export const MOVEMENT: {[key: string]: Movement} = {
  forward: 'F',
  right: 'R',
  left: 'L'
};
