// ----API key
const apiKey = "cee2ae1aa644470e811142105242211";

function fetchWeatherData(city) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no`;


    fetch(url)
        .then(response => response.json())
        .then(data => {
           
            // Get the current weather data
            const temperature = data.current.temp_c;
            const condition = data.current.condition.text;
            const humidity = data.current.humidity;
            const windSpeed = data.current.wind_kph;
            const feelsLike = data.current.feelslike_c;
            const cityName = data.location.name;
            const icon = data.current.condition.icon;

            // Display current weather
            document.getElementById("City-Name").textContent = cityName;
            document.getElementById("Temperature").textContent = temperature;
            document.getElementById("Condition").textContent = condition;
            document.getElementById("Humidity").textContent = humidity;
            document.getElementById("Wind-speed").textContent = windSpeed;
            document.getElementById("Feels-like").textContent = feelsLike;

            // Display weekly forecast
            const forecastContainer = document.getElementById("forecast-container");
            forecastContainer.innerHTML = ''; // Clear previous forecast

            data.forecast.forecastday.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.classList.add('forecast-day');
                dayElement.innerHTML = `
                    <img src="https:${day.day.condition.icon}" alt="icon">
                    <p>${day.date}</p>
                    <p>${day.day.avgtemp_c}°C</p>
                    <p>${day.day.condition.text}</p>
                `;
                forecastContainer.appendChild(dayElement);
            });
        })
        .catch(error => {
            // Handle errors 
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again.");
        });
}

// Event listener for the search input
document.getElementById('search-input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const city = event.target.value;
        fetchWeatherData(city);
    }
});


fetchWeatherData('Algiers');
