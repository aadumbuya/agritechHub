const API_KEY = 'dd87517a20c9aae27dec177027893a43';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const CITY_ID = '2409306';

function fetchWeather() {
    const url = `${BASE_URL}/weather?id=${CITY_ID}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            document.getElementById('current-weather-content').innerHTML = 'Error fetching weather data.';
        });

    const forecastUrl = `${BASE_URL}/forecast?id=${CITY_ID}&appid=${API_KEY}&units=metric`;
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            document.getElementById('forecast-content').innerHTML = 'Error fetching forecast data.';
        });
}

function displayCurrentWeather(data) {
    if (!data || !data.main || !data.weather) {
        document.getElementById('current-weather-content').innerHTML = 'No weather data available.';
        return;
    }

    const content = `
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    document.getElementById('current-weather-content').innerHTML = content;
}

function displayForecast(data) {
    if (!data || !data.list) {
        document.getElementById('forecast-content').innerHTML = 'No forecast data available.';
        return;
    }

    let content = '<div class="grid grid-cols-3 gap-4">';
    data.list.forEach((item, index) => {
        if (index < 9) {
            content += `
                <div class="forecast-item">
                    <p>${new Date(item.dt * 1000).toLocaleTimeString()}</p>
                    <p>Temp: ${item.main.temp} °C</p>
                    <p>${item.weather[0].description}</p>
                </div>
            `;
        }
    });
    content += '</div>';
    document.getElementById('forecast-content').innerHTML = content;
}

document.addEventListener('DOMContentLoaded', fetchWeather);
