# Rover Mars Exploration.

![image](https://user-images.githubusercontent.com/71487285/154846262-138225df-d966-4625-b5cf-0a2dfbf9d40a.png)

This little project was coded during a weekend. It simulates sending a Rover to explore Mars.

You can visit live at: [Rover explores Mars](https://rover-mars-expedition.web.app/)

## How it works

In the form you can select the dimensions of the planet Mars (columns and rows) and how many obstacles you can find in it. You can pick the position of the landing, assuming that (1,1) is the left top corner. x axis grows to the right, y axis grows going down. The program assume that the landing position is free of obstacles, because the NASA people check it before. 

You can choose the direction that the Rover will follow (North,East,South or West) and the sequence of commands it will follow:
- F moves forward
- R moves to the right
- L moves to the left

If the Rover founds an obstacle in its path it will stop before crashing and aborting the rest of movements.

When you send a Rover you will see graphically the Rover path, from its landing position marked with blue background. Then there is a summary where you can see the commands sended and the ones that the Rover was able to perform.

## Technologies

This app was coded using React, functional components and hooks. I used Typescript and for styling I used SASS.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\


### `npm run build`

Builds the app for production to the `build` folder.\
