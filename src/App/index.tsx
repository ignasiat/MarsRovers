import React, { useState, useEffect } from 'react';
import {
  DIRECTIONS, MAX_COLUMS, MAX_OBSTACLES, MAX_ROWS
} from '../constants';
import { Configuration, ErrorConfiguration, SetErrorConfiguration } from '../types';

const App: React.FC = () => {
  const defaultConfiguration: Configuration = {
    cols: 20,
    rows: 30,
    numberOfObstacles: 50,
    yOrigin: 10,
    xOrigin: 15,
    directionOrigin: DIRECTIONS[0],
    commands: '',
    disabled: false
  };

  const defaultError: ErrorConfiguration = {
    numberOfObstacles: null,
    yOrigin: null,
    xOrigin: null,
    commands: null,
    totalValidation: false,
  };

  const [configuration, setConfiguration] = useState<Configuration>(defaultConfiguration);
  const [errorConfiguration, setErrorConfiguration] = useState<ErrorConfiguration>(defaultError);

  useEffect(() => {
    console.log('Dins useEffect', errorConfiguration);
    if (!errorConfiguration.totalValidation) {
      setConfiguration({ ...configuration, disabled: false });
    }
  }, [errorConfiguration]);

  const validateForm = (
    configuration_: Configuration,
    setErrorConfiguration_: SetErrorConfiguration
  ): void => {
    let newError: ErrorConfiguration = ({ ...defaultError, totalValidation: true });

    // Validate yOrigin
    if (configuration_.yOrigin > configuration_.cols) {
      newError = ({ ...newError, yOrigin: `Vertical position ${configuration_.yOrigin} out of dashboard ${configuration_.cols}`, totalValidation: false });

    }

    // Validate xOrigin
    if (configuration_.xOrigin > configuration_.rows) {
      newError = ({ ...newError, xOrigin: `Horizontal position ${configuration_.xOrigin} out of dashboard ${configuration_.cols}`, totalValidation: false });
    }

    // Validate number of obstacles
    if (configuration_.numberOfObstacles > (configuration_.cols * configuration_.rows - 1)) {
      newError = ({ ...newError, numberOfObstacles: `Too many obstacles for the dashboard ${configuration.cols}`, totalValidation: false });
    }

    // Validate command string
    const regex = /^[FRL]*$/gi;
    if (!regex.test(configuration_.commands)) {
      newError = ({ ...newError, commands: 'Fix your command string, only allow F, R and L', totalValidation: false });
    }
    setErrorConfiguration_(newError);

  };

  const handlerOnChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    event.preventDefault();
    setConfiguration({ ...configuration, [event?.target?.name]: event?.target?.value });
  };

  const handlerOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setConfiguration({ ...configuration, disabled: true });
    validateForm(configuration, setErrorConfiguration);
  };

  return (
    <div>
      <h1>Configuration</h1>
      <form onSubmit={handlerOnSubmit}>
        <h2>Area to explore</h2>
        <p>
          <label htmlFor="cols">
            Columns available
            <input name="cols" id="cols" type="number" min="10" max={MAX_COLUMS} step="1" placeholder="Colums" onChange={handlerOnChange} value={configuration.cols} disabled={configuration.disabled} />
          </label>
        </p>
        <p>
          <label htmlFor="rows">
            Rows available
            <input name="rows" id="rows" type="number" min="10" max={MAX_ROWS} step="1" placeholder="Rows" onChange={handlerOnChange} value={configuration.rows} disabled={configuration.disabled} />
          </label>
        </p>
        <p>
          <label htmlFor="numberOfObstacles">
            Number of obstacles
            <input name="numberOfObstacles" id="numberOfObstacles" type="number" min="10" max={MAX_OBSTACLES} step="1" placeholder="Obstacles" onChange={handlerOnChange} value={configuration.numberOfObstacles} disabled={configuration.disabled} />
          </label>
          {errorConfiguration.numberOfObstacles && (<span>{errorConfiguration.numberOfObstacles}</span>)}
        </p>
        <h2>Rover mars</h2>
        <h3>Original position</h3>
        <p>
          <label htmlFor="yOrigin">
            Vertical position
            <input name="yOrigin" id="yOrigin" type="number" min="1" max={MAX_COLUMS} step="1" placeholder="Y position" onChange={handlerOnChange} value={configuration.yOrigin} disabled={configuration.disabled} />
          </label>
          {errorConfiguration.yOrigin && (<span>{errorConfiguration.yOrigin}</span>)}

        </p>
        <p>
          <label htmlFor="xOrigin">
            Horizontal position
            <input name="xOrigin" id="xOrigin" type="number" min="1" max={MAX_ROWS} step="1" placeholder="X position" onChange={handlerOnChange} value={configuration.xOrigin} disabled={configuration.disabled} />
          </label>
          {errorConfiguration.xOrigin && (<span>{errorConfiguration.xOrigin}</span>)}

        </p>
        <p>
          <label htmlFor="directionOrigin">
            <select id="directionOrigin" name="directionOrigin" onChange={handlerOnChange} value={configuration.directionOrigin} disabled={configuration.disabled}>
              {DIRECTIONS.map((direction: string): JSX.Element => (
                <option value={direction} key={direction}>
                  {direction}
                </option>
              ))}
            </select>
          </label>
        </p>
        <h3>Commands</h3>
        <p>
          <label htmlFor="commands">
            Input (F/R/L)
            <input name="commands" id="commands" type="string" placeholder="commands" onChange={handlerOnChange} value={configuration.commands} disabled={configuration.disabled} />
          </label>
          {errorConfiguration.commands && (<span>{errorConfiguration.commands}</span>)}

        </p>
        <p>
          <button type="submit" onClick={handlerOnSubmit}>EXPLORE</button>
        </p>
      </form>
    </div>
  );
};

export default App;
