import React, { useState, useEffect } from 'react';
import {
  DIRECTIONS,
  MAX_COLUMS,
  MAX_OBSTACLES,
  MAX_ROWS
} from '../constants';
import { roverExpedition } from '../helpers';
import {
  Configuration,
  ErrorConfiguration,
  RoverExpedition
} from '../types';
import './styles.scss';

const App: React.FC = () => {
  const defaultError: ErrorConfiguration = {
    numberOfObstacles: null,
    yOrigin: null,
    xOrigin: null,
    commands: null,
    totalValidation: false
  };

  const defaultConfiguration: Configuration = {
    cols: 20,
    rows: 20,
    numberOfObstacles: 25,
    yOrigin: 10,
    xOrigin: 15,
    directionOrigin: DIRECTIONS[0],
    commands: 'FFR',
    submited: false,
    error: defaultError
  };
  const [configuration, setConfiguration] = useState<Configuration>(defaultConfiguration);
  const [expeditionRover, setExpeditionRover] = useState<RoverExpedition>();

  useEffect(() => {
    if (configuration.error.totalValidation) {
      setExpeditionRover(roverExpedition(configuration));
    }
  }, [configuration.error.totalValidation]);

  const validateForm = (
    configuration_: Configuration
  ): ErrorConfiguration => {
    let newError: ErrorConfiguration = ({ ...defaultError, totalValidation: true });

    // Validate yOrigin
    if (configuration_.yOrigin > configuration_.cols) {
      newError = ({ ...newError, yOrigin: `Vertical position ${configuration_.yOrigin} out of dashboard ${configuration_.cols}`, totalValidation: false });
    }

    // Validate xOrigin
    if (configuration_.xOrigin > configuration_.rows) {
      newError = ({ ...newError, xOrigin: `Horizontal position ${configuration_.xOrigin} out of dashboard ${configuration_.rows}`, totalValidation: false });
    }

    // Validate number of obstacles
    if (configuration_.numberOfObstacles > (configuration_.cols * configuration_.rows - 1)) {
      newError = ({ ...newError, numberOfObstacles: 'Too many obstacles for the dashboard', totalValidation: false });
    }

    // Validate command string
    const regex = /^[FRL]*$/gi;
    if (!regex.test(configuration_.commands)) {
      newError = ({ ...newError, commands: 'Fix your command string, only allow F, R and L', totalValidation: false });
    }

    return newError;
  };

  const handlerOnChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    event.preventDefault();
    setConfiguration({
      ...configuration,
      [event?.target?.name]: event?.target?.value,
      error: validateForm({ ...configuration, [event?.target?.name]: event?.target?.value })
    });
  };

  const handlerOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const error: ErrorConfiguration = validateForm(configuration);
    setConfiguration({ ...configuration, error, submited: error.totalValidation });
  };

  return (
    <div className="app-container">
      <div className="configuration-container">
        <h1>Configuration</h1>
        <form onSubmit={handlerOnSubmit}>
          <h2>Area to explore</h2>
          <div className="input-container">
            <div className="input-container__element">

              <label htmlFor="cols">
                Columns available
              </label>
              <input className="input-container__element--number" name="cols" id="cols" type="number" min="10" max={MAX_COLUMS} step="1" placeholder="Colums" onChange={handlerOnChange} value={configuration.cols} disabled={configuration.submited} />
            </div>
          </div>
          <div className="input-container">
            <div className="input-container__element">

              <label htmlFor="rows">
                Rows available
              </label>
              <input className="input-container__element--number" name="rows" id="rows" type="number" min="10" max={MAX_ROWS} step="1" placeholder="Rows" onChange={handlerOnChange} value={configuration.rows} disabled={configuration.submited} />
            </div>
          </div>
          <div className="input-container">
            <div className="input-container__element">
              <label htmlFor="numberOfObstacles">
                Number of obstacles
              </label>
              <input className="input-container__element--number" name="numberOfObstacles" id="numberOfObstacles" type="number" min="10" max={MAX_OBSTACLES} step="1" placeholder="Obstacles" onChange={handlerOnChange} value={configuration.numberOfObstacles} disabled={configuration.submited} />
            </div>
            {configuration.error.numberOfObstacles
              && (<span className="input-container__element--error">{configuration.error.numberOfObstacles}</span>)}
          </div>
          <h2>Rover mars</h2>
          <h3>Original position</h3>
          <div className="input-container">
            <div className="input-container__element">

              <label htmlFor="yOrigin">
                Vertical position
              </label>
              <input className="input-container__element--number" name="yOrigin" id="yOrigin" type="number" min="1" max={MAX_COLUMS} step="1" placeholder="Y position" onChange={handlerOnChange} value={configuration.yOrigin} disabled={configuration.submited} />
            </div>
            {configuration.error.yOrigin && (<span className="input-container__element--error">{configuration.error.yOrigin}</span>)}

          </div>
          <div className="input-container">
            <div className="input-container__element">

              <label htmlFor="xOrigin">
                Horizontal position
              </label>
              <input className="input-container__element--number" name="xOrigin" id="xOrigin" type="number" min="1" max={MAX_ROWS} step="1" placeholder="X position" onChange={handlerOnChange} value={configuration.xOrigin} disabled={configuration.submited} />
            </div>
            {configuration.error.xOrigin && (<span className="input-container__element--error">{configuration.error.xOrigin}</span>)}
          </div>
          <div className="input-container">
            <div className="input-container__element">

              <label htmlFor="directionOrigin">
                Orientation
              </label>
              <select id="directionOrigin" name="directionOrigin" onChange={handlerOnChange} value={configuration.directionOrigin} disabled={configuration.submited}>
                {DIRECTIONS.map((direction: string): JSX.Element => (
                  <option value={direction} key={direction}>
                    {direction}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <h3>Commands</h3>
          <div className="input-container">

            <label htmlFor="commands">
              Command sequence (F/R/L)
            </label>
            <input className="input-container__element--commands" name="commands" id="commands" type="string" placeholder="commands" onChange={handlerOnChange} value={configuration.commands} disabled={configuration.submited} />
            {configuration.error.commands && (<span className="input-container__element--error">{configuration.error.commands}</span>)}
          </div>
          <div className="input-container input-container__element--centered">
            <button className="input-container__element--button" type="submit" onClick={handlerOnSubmit} disabled={configuration.submited}>LAUNCH ROVER TO MARS</button>
          </div>
        </form>
      </div>
      {configuration.submited
        && (
          <div className="rover-container">
            <pre>
              {expeditionRover?.terrain.join('\n')}
            </pre>
          </div>
        )}
    </div>
  );
};

export default App;
