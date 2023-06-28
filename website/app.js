/* Global Variables */
const apiKey = 'adb41019c34f749ea04e98d59b8c7561';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Async function to get weather data from OpenWeatherMap API
async function getWeatherData(baseUrl, zipCode, apiKey) {
  const apiUrl = `${baseUrl}?zip=${zipCode}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  try {
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
  const zipCode = document.getElementById('zip').value;
  const userResponse = document.getElementById('feelings').value;

  getWeatherData(baseUrl, zipCode, apiKey)
    .then((data) => {
      postData('/data', { temperature: data.main.temp, date: newDate, userResponse });
    })
    .then(() => {
      updateUI();
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
    }),
  });

  try {
    if (response.ok) {
      const responseData = await response.json();
      console.log('Data added successfully!', responseData);
      return responseData;
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

async function updateUI() {
  const response = await fetch('/data');

  try {
    if (response.ok) {
      const data = await response.json();
      document.getElementById('date').textContent = `Date: ${data.date}`;
      document.getElementById('temp').textContent = `Temperature: ${data.temperature}`;
      document.getElementById('content').textContent = `User Response: ${data.userResponse}`;
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

  