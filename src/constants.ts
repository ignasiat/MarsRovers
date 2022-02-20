import { Orientation } from './types';

export const MAX_COLUMS: number = 200;
export const MAX_ROWS: number = 200;
export const MAX_OBSTACLES: number = 300;
export const ORIENTATIONS: { [key: string]: Orientation } = {
  north: 'N',
  south: 'S',
  east: 'E',
  west: 'W'
};
export const DIRECTIONS: Orientation[] = [
  ORIENTATIONS.north,
  ORIENTATIONS.south,
  ORIENTATIONS.east,
  ORIENTATIONS.west];
export const TERRAIN_AVAILABLE: string = 'A';
export const TERRAIN_OBSTACLE: string = 'O';
export const TERRAIN_ROVER: string = 'R';
export const MOVEMENT = {
  forward: 'F',
  right: 'R',
  left: 'L'
};
