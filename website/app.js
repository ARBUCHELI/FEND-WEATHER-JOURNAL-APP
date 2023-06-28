/* Global Variables */
const apiKey = 'adb41019c34f749ea04e98d59b8c7561&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Async function to get weather data from OpenWeatherMap API
async function getWeatherData(zipCode) {
  const apiUrl = `${baseUrl}?zip=${zipCode}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

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

