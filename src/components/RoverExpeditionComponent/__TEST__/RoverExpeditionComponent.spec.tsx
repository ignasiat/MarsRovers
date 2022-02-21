/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { act, render } from '@testing-library/react';
import { Configuration, ErrorConfiguration, RoverExpedition } from '../../../types';
import { TERRAIN_AVAILABLE, TERRAIN_OBSTACLE, TERRAIN_ROVER } from '../../../constants';
import RoverExpeditionComponent from '..';

describe('Given a RoverExpeditionComponent ', () => {
  let container : HTMLDivElement | null | any;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container = null;
  });

  describe('When is invoked with a configuration files containing xOrigin 3 and yOrigin 1', () => {
    test('Then should render an element with class terrain-origincoordinates with 3,1 inside', () => {
      const testExpedition : RoverExpedition = {
        terrain: [[TERRAIN_AVAILABLE, TERRAIN_ROVER, TERRAIN_AVAILABLE],
        [TERRAIN_AVAILABLE, TERRAIN_ROVER, TERRAIN_OBSTACLE],
        [TERRAIN_OBSTACLE, TERRAIN_ROVER, TERRAIN_AVAILABLE]
      ], movementsDone: ['F', 'F', 'F']
      }

      const testError: ErrorConfiguration = {
        xOrigin: null,
        yOrigin: null,
        commands: null,
        numberOfObstacles: null,
        totalValidation: true,
      }
      
      const testConfiguration: Configuration = {
        xOrigin: 3,
        yOrigin: 1,
        numberOfObstacles: 2,
        commands: 'FFF',
        rows: 3,
        cols: 3,
        directionOrigin: 'N',
        submited: true,
        error: testError
      }

      
      act(() => {
        render(<RoverExpeditionComponent expedition={testExpedition} configuration={testConfiguration} />, container);
      });

      const td: HTMLTableCellElement | null | any = document.getElementsByClassName('terrain-origin-coordinates');

      expect(td[0].innerHTML).toBe('3,1');
    });
  });
});