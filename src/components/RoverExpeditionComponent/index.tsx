/* global JSX */
import React from 'react';
import barrier from '../../assets/barrier.png';
import layers from '../../assets/layers.png';
import marsRover from '../../assets/mars-rover.png';
import {
  ORIENTATIONS_TEXT,
  TERRAIN_AVAILABLE_TEXT,
  TERRAIN_OBSTACLE,
  TERRAIN_OBSTACLE_TEXT,
  TERRAIN_ROVER,
  TERRAIN_ROVER_TEXT
} from '../../constants';
import {
  Configuration,
  RoverExpedition,
  TerrainElement,
  TerrainLayer
} from '../../types';
import './styles.scss';

const RoverExpeditionComponent = ({
  expedition,
  configuration
}: { expedition: RoverExpedition | undefined, configuration: Configuration }): JSX.Element => (

  <div className="rover-container">
    <h1> Rover Expedition</h1>
    <div>
      {expedition?.terrain.map((firstLayer: TerrainLayer, indexY: number) => (
        <div className="terrain-layer" key={`terrain-${indexY}`}>
          {firstLayer.map((element: TerrainElement, indexX: number) => {
            switch (element) {
              case TERRAIN_OBSTACLE:
                return (
                  <img src={barrier} alt={TERRAIN_OBSTACLE_TEXT} key={`terrain-${indexX}-${indexY}`} />);
              case TERRAIN_ROVER:
                return indexX === configuration.xOrigin - 1
                  && indexY === configuration.yOrigin - 1 ? (
                    <img src={marsRover} alt={TERRAIN_ROVER_TEXT} className="terrain-origin-rover" key={`terrain-${indexX}-${indexY}`} />
                  ) : (
                    <img src={marsRover} alt={TERRAIN_ROVER_TEXT} key={`terrain-${indexX}-${indexY}`} />
                  );
              default:
                return (
                  <img src={layers} alt={TERRAIN_AVAILABLE_TEXT} key={`terrain-${indexX}-${indexY}`} />);
            }
          })}
        </div>))}
    </div>
    <table>
      <thead>
        <tr>
          <th colSpan={2}>
            Mission summary
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="terrain-origin-rover">Origin</td>
          <td className="terrain-origin-coordinates">
            {configuration.xOrigin}
            ,
            {configuration.yOrigin}
          </td>
        </tr>
        <tr>
          <td>Orientation:</td>
          <td>
            {ORIENTATIONS_TEXT[configuration.directionOrigin]}
          </td>
        </tr>
        <tr>
          <td>Sequence sended:</td>
          <td>
            {configuration.commands.split('').join(',')}
          </td>
        </tr>
        <tr>
          <td>Sequence executed:</td>
          <td>
            {expedition?.movementsDone.join(',')}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default RoverExpeditionComponent;
