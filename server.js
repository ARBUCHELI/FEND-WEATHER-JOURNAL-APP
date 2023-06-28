// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware */
// Here we are configuring express to use body-parser as middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
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
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
