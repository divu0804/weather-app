const loadTemperatureData = () => {
    const key = "a1d9c445802e1d4ceb6f9b29e5cb97cd";
    const inputValue = document.querySelector('#input-value'); 
    const weatherStatus = document.getElementById('weather-status');

    if (!inputValue.value) {
        console.log('Input city name');
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${key}`)
            .then((response) => response.json())
            .then(data => displayTemperature(data));
    }
    inputValue.value = '';
    weatherStatus.innerHTML = '';
}
const displayTemperature = (data) => {
    console.log(data);
    const weatherStatus = document.getElementById('weather-status');
    const weatherInfo = document.createElement('div');

    const sunriseCode = data.sys.sunrise;
    const sunriseTime = new Date(sunriseCode * 1000);
    const sunsetCode = data.sys.sunset;
    const sunsetTime = new Date(sunsetCode * 1000);

    // Add styles to the weatherInfo element
    weatherInfo.style.background = 'rgba(255, 255, 255, 0.8)';
    weatherInfo.style.padding = '10px'; 
    weatherInfo.style.borderRadius = '10px';
    weatherInfo.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    weatherInfo.style.color = 'black';

    // Change the image color to black
    weatherInfo.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" style="filter: invert(100%);" alt="smart weather info icon">
    <h1 id="city-name">${data.name}</h1>
    <h3><span id="celcius-number">${((data.main.temp) - 273.15).toFixed(2)}</span>&deg;C</h3>
    <h1 class="lead">Sunrise : ${sunriseTime}</h1>
    <h1 class="lead">Sunset : ${sunsetTime}</h1>
    `;

    weatherStatus.appendChild(weatherInfo);
}

