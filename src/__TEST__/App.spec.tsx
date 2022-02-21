/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('Given a RoverExpeditionComponent ', () => {
  let container : HTMLDivElement | null | any;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container = null;
  });

  describe('When is invoked', () => {
    test('Then should render an input element with id cols and value 20', () => {

      
      act(() => {
        render(<App />, container);
      });

      const input: HTMLFormElement | null | any = document.getElementById('cols');

      expect(input.value).toBe("20");
    });
  });

  describe('When is invoked and the button is press', () => {
    test('Then should render a summary table with a cell with the origin coordinates', () => {

      
      act(() => {
        render(<App />, container);
      });

      const button: HTMLButtonElement | null | any = document.getElementsByTagName('button');

      fireEvent.click(button[0]);

      const td: HTMLTableCellElement | null | any = document.getElementsByClassName('terrain-origin-coordinates');

      expect(td[0].innerHTML).toBe('15,10');
    });
  });

  describe('When is invoked and the vertical position is bigger than cols value', () => {
    test('Then should render an error', () => {

      
      act(() => {
        render(<App />, container);
      });


      const input : HTMLElement | null = document.getElementById('yOrigin');

      if(input) {
        fireEvent.change(input, {target: {value: '100'}});
        
        const error : HTMLCollection | null = document.getElementsByClassName('input-container__element--error');

        expect(error[0].innerHTML).toBe('Vertical position 100 out of dashboard 20');
      } else {
        expect(false).toBe(true);
      };
    });
  });

  describe('When is invoked and the horizontal position is bigger than rows value', () => {
    test('Then should render an error', () => {

      
      act(() => {
        render(<App />, container);
      });


      const input : HTMLElement | null = document.getElementById('xOrigin');

      if(input) {
        fireEvent.change(input, {target: {value: '150'}});
        
        const error : HTMLCollection | null = document.getElementsByClassName('input-container__element--error');

        expect(error[0].innerHTML).toBe('Horizontal position 150 out of dashboard 20');
      } else {
        expect(false).toBe(true);
      };
    });
  });

  describe('When is invoked and the number of obstacles are bigger than the surface available', () => {
    test('Then should render an error', () => {

      
      act(() => {
        render(<App />, container);
      });


      const input : HTMLElement | null = document.getElementById('numberOfObstacles');

      if(input) {
        fireEvent.change(input, {target: {value: '40000'}});
        
        const error : HTMLCollection | null = document.getElementsByClassName('input-container__element--error');

        expect(error[0].innerHTML).toBe('Too many obstacles for the dashboard');
      } else {
        expect(false).toBe(true);
      };
    });
  });
    
  describe('When is invoked and the commands contains not allowed characters', () => {
    test('Then should render an error', () => {
  
        
      act(() => {
        render(<App />, container);
      });
  
  
      const input : HTMLElement | null = document.getElementById('commands');
    
      if(input) {
        fireEvent.change(input, {target: {value: 'Y'}});
        
        const error : HTMLCollection | null = document.getElementsByClassName('input-container__element--error');

        expect(error[0].innerHTML).toBe('Fix your command string, only allow F, R and L');
      } else {
        expect(false).toBe(true);
      };
    });
  });
});