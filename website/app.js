/* Global Variables */
/**
 * Project Rubric PROJECT ENVIRONMENT SETUP. Success Criteria - API Credentials: Create API credentials on OpenWeatherMap.com
 * Note: The following line of code should be at the top of the app.js file:
 * // Personal API Key for OpenWeatherMap API
 * const apiKey = '<your_api_key>&units=imperial';
 * The actual API key itself will be different for everyone.
 * Notice the last part ‘&units=imperial’-- this should be included in the saved variable.
 */

/**
 * Project Rubric APIs AND ROUTES. Success Criteria - Integrating OpenWeatherMap API: The personal API Key for OpenWeatherMap API 
 * is saved in a named const variable.
 * The API Key variable is passed as a parameter to fetch(). Data is successfully returned from the external API.
 * In the file app.js, there should be a line of code near the top:
 * // Personal API Key for OpenWeatherMap API
 * const apiKey = '<your_api_key>&units=imperial';
 * Note: The personal API key must be stored in a const variable.
 */
const apiKey = 'adb41019c34f749ea04e98d59b8c7561&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Async function to get weather data from OpenWeatherMap API

/**
 * Project Rubric APIs AND ROUTES. Success Criteria - Return Endpoint Data - GET Route II: Client Side: There should be an 
 * asynchronous function to fetch the data from the app endpoint
 */
async function getWeatherData(zipCode) {
  const apiUrl = `${baseUrl}?zip=${zipCode}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  try {
    const data = await response.json();
     // Check if the API response indicates an error
     if (data.cod === '404') {
      alert('Weather information not found for the provided zip code.');
    }
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

/**
 * Project Rubric DYNAMIC UI. Success Criteria - Event Listeners: Adds an event listener to an existing HTML button from DOM 
 * using Vanilla JS.
 * In the file app.js, the element with the id of generate should have an addEventListener() method called on it, with click as 
 * the first parameter, and a named callback function as the second parameter.
 */
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
  const zipCode = document.getElementById('zip').value;
  getWeatherData(zipCode)
    .then((data) => {
      // Handle the received weather data
      console.log(data); // Example: log the data to the console
      const userResponse = document.getElementById('feelings').value;
      const temperature = data.main.temp;

      postData('/data', { temperature, date: newDate, userResponse })
        .then(() => {
          updateUI();
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

/**
 * Project Rubric APIs AND ROUTES. Success Criteria - POST Route: You should be able to add an entry to the project endpoint 
 * using a POST route setup on the server side and executed on the client side as an asynchronous function.
 * 
 * The client side function should take two arguments, the URL to make a POST to, and an object holding the data to POST.
 * 
 * The server side function should create a new entry in the apps endpoint (the named JS object) consisting of the data received 
 * from the client side POST.
 */
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const responseData = await response.json();
    console.log('Data added successfully!', responseData);
    return responseData;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

/**
 * Project Rubric DYNAMIC UI. Success Criteria - Dynamically Update UI: Sets the properties of existing HTML elements from the 
 * DOM using Vanilla JavaScript.
 * Included in the async function to retrieve that app’s data on the client side, existing DOM elements should have their 
 * innerHTML properties dynamically set according to data returned by the app route.
 */

async function updateUI() {
  const response = await fetch('/data');

  try {
    const data = await response.json();
    document.getElementById('date').textContent = `Date: ${data.date}`;
    document.getElementById('temp').textContent = `Temperature: ${data.temperature}`;
    document.getElementById('content').textContent = `User Response: ${data.userResponse}`;
  } catch (error) {
    console.log('Error:', error);
  }
}

