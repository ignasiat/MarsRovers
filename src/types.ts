export type Configuration = {
  cols: number,
  rows: number,
  numberOfObstacles: number,
  yOrigin: number,
  xOrigin: number,
  directionOrigin: string,
  commands: string,
  disabled: boolean
}

export type Direction = string[]

export type ErrorConfiguration = {
  numberOfObstacles: null | string,
  yOrigin: null | string,
  xOrigin: null | string,
  commands: null | string,
  totalValidation: boolean
}

export type SetErrorConfiguration = (error: ErrorConfiguration) => void;
