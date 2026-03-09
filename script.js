document.addEventListener("DOMContentLoaded", function() {
  const cityInput = document.getElementById("city-input");
  const searchButton = document.getElementById("get-weather-btn");
  const weatherinfo = document.getElementById("weather-info");
  const citynamedisplay = document.getElementById("city-name");
  const temperaturedisplay = document.getElementById("temperature");
  const discriptiondisplay = document.getElementById("description");
  const humiditydisplay = document.getElementById("humidity");
  const windspeeddisplay = document.getElementById("windspeed");
  const errormsg = document.getElementById("error-message");

  const API_KEY = "9d8128a3870a32e04a84ea1cc68746cb";

searchButton.addEventListener("click", async () => {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    return;
  }
  try {
      const weatherdata = await fetchweather(cityName)
      displayweather(weatherdata)

  } catch (error) {
    displayerror()
    
  }
});
 async function fetchweather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
   const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const ata = await response.json();
    return ata;


 }
 function displayweather(data) {
  console.log(data);
    const { name, main, weather } = data;
    citynamedisplay.textContent = name;
    temperaturedisplay.textContent = `Temperature : ${main.temp}`;
    discriptiondisplay.textContent = `Weather : ${weather[0].description}`;
    humiditydisplay.textContent = `Humidity : ${main.humidity}`;
    windspeeddisplay.textContent = `Wind Speed : ${data.wind.speed}`;

    weatherinfo.classList.remove("hidden");
    errormsg.classList.add("hidden");

 }
 function displayerror() {
  weatherinfo.classList.remove("hidden");
  errormsg.classList.add("hidden");
 }

})