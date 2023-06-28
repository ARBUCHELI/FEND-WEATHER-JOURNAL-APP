// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
/**
 * Project Rubric Success Criteria - Node and Express Environment: Node and Express should be installed on the local machine. 
 * The project file server.js should require express(), and should create an instance of their app using express.
 */
const express = require('express');
/**
 * Project Rubric Success Criteria - Project Dependencies: The ‘cors’ package should be installed in the project from the command
 * line, required in the project file server.js, and the instance of the app should be setup to use cors().
 */
const cors = require('cors');
/**
 * Project Rubric Success Criteria - Project Dependencies: The body-parser package should be installed and included in the 
 * project.
 */
const bodyParser = require('body-parser');

// Start up an instance of app
/**
 * Project Rubric Success Criteria - Node and Express Environment: Node and Express should be installed on the local machine. 
 * The project file server.js should require express(), and should create an instance of their app using express.
 */
const app = express();

/* Middleware */
// Here we are configuring express to use body-parser as middleware.
/**
 * Project Rubric Success Criteria - Project Dependencies: The body-parser package should be installed and included in the 
 * project.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
/**
 * Project Rubric Success Criteria - Project Dependencies: The ‘cors’ package should be installed in the project from the command
 * line, required in the project file server.js, and the instance of the app should be setup to use cors().
 */
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// GET route to return projectData
app.get('/data', (req, res) => {
  res.send(projectData);
});

// POST route to add incoming data to projectData
app.post('/data', (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData = {
    temperature,
    date,
    userResponse
  };
  res.send('Data added successfully!');
});

// Setup Server
/**
 * Project Rubric Success Criteria - Local Server: Local server should be running and producing feedback to the Command Line 
 * through a working callback function.
 */
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
