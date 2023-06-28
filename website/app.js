/* Global Variables */
// Global Variables
const apiKey = 'adb41019c34f749ea04e98d59b8c7561';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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
