alert("select cities and click --Go On Lover--");
const options = {
  method: "GET",
  headers: { "X-Api-Key": "Z358lmXSAGwKr7Of+G3SMQ==JOuccJlfj0CuMotY" }, // Use your key here
};
const cityList = Object.keys(cityDatabase);
let yourCitySelect = document.getElementById("your-city");
let yourCity = yourCitySelect.value;
let yourLat;
let yourLon;
let yourCityLink = `https://api.api-ninjas.com/v1/weather?lat=24.8949&lon=91.8687`;
let janCitySelect = document.getElementById("jan-city");
let janCity = janCitySelect.value;
let janLat;
let janLon;
let janCityLink = `https://api.api-ninjas.com/v1/weather?lat=27.1500&lon=93.7500`;
let goButton = document.getElementById("go-button");

// iterating over cityList to create options for both city selects
cityList.forEach((city) => {
  let option1 = document.createElement("option");
  option1.value = city;
  option1.innerHTML = city.replace(/_/g, " ").toUpperCase();
  if (city === "sylhet") {
    option1.selected = true; // Set Sylhet as the default selected option
    yourCitySelect.appendChild(option1);
  } else if (city === "papum_pare") {
    option1.selected = true;
    janCitySelect.appendChild(option1);
  } else {
    yourCitySelect.appendChild(option1);
    let option2 = option1.cloneNode(true);
    janCitySelect.appendChild(option2);
  }
});

// getting city lat and lon
yourCitySelect.addEventListener("change", () => {
  yourCity = yourCitySelect.value;
  cityList.forEach((city) => {
    if (city === yourCity) {
      yourLat = cityDatabase[city].lat;
      yourLon = cityDatabase[city].lon;
      yourCityLink = `https://api.api-ninjas.com/v1/weather?lat=${yourLat}&lon=${yourLon}`;
      console.log(yourCityLink);
      goButton.style.backgroundColor = "#e4104cff";
    }
    // console.log("Your city changed to:", yourCity);
  });
});
janCitySelect.addEventListener("change", () => {
  janCity = janCitySelect.value;
  cityList.forEach((city) => {
    if (city === janCity) {
      janLat = cityDatabase[city].lat;
      janLon = cityDatabase[city].lon;
      janCityLink = `https://api.api-ninjas.com/v1/weather?lat=${janLat}&lon=${janLon}`;
      console.log("Janna's city changed to:", janCity);
      goButton.style.backgroundColor = "#e4104cff";
    }
    // console.log(janCityLink);
  });
});

// // getting html elements to display data
// let temp = document.getElementById("temp");
// let humidity = document.getElementById("humidity");
// let feels_like = document.getElementById("feels_like");
// let sunrise = document.getElementById("sunrise");
// let sunset = document.getElementById("sunset");

// api calling

// function fetchAllWeather() {
//   // Request 1: Papum Pare
//   fetch(yourCityLink, options)
//     .then((response) => response.json())
//     .then((response) => {
//       temp.innerHTML = `Temperature: ${response.temp} °C`;
//       humidity.innerHTML = `Humidity: ${response.humidity} %`;
//       feels_like.innerHTML = `Feels Like: ${response.feels_like} °C`;
//       sunrise.innerHTML = `Sunrise: ${new Date(
//         response.sunrise * 1000
//       ).toLocaleTimeString()}`;
//       sunset.innerHTML = `Sunset: ${new Date(
//         response.sunset * 1000
//       ).toLocaleTimeString()}`;
//     })
//     .catch((err) => console.error(err));

//   // Request 2: London
//   fetch(janCityLink, options)
//     .then((response) => response.json())
//     .then((response) => {
//       tempLove.innerHTML = `Temperature: ${response.temp} °C`;
//       humidityLove.innerHTML = `Humidity: ${response.humidity} %`;
//       feels_likeLove.innerHTML = `Feels Like: ${response.feels_like} °C`;
//       sunriseLove.innerHTML = `Sunrise: ${new Date(
//         response.sunrise * 1000
//       ).toLocaleTimeString()}`;
//       sunsetLove.innerHTML = `Sunset: ${new Date(
//         response.sunset * 1000
//       ).toLocaleTimeString()}`;
//     })
//     .catch((err) => console.error(err));
// }

goButton.addEventListener("click", async () => {
    // 1. Show the dimmer and block clicks before the fetch
    dimer.style.visibility = "visible";
    loader.style.visibility = "visible";
    dimer.style.opacity = "1";
    dimer.style.pointerEvents = "all"; // This prevents clicking while loading

    try {
        const [response1, response2] = await Promise.all([
        fetch(yourCityLink, options),
        fetch(janCityLink, options)
        ]);
        const data1 = await response1.json();
        const data2 = await response2.json();

        temp.innerHTML = `Temperature: ${data1.temp} °C`;
        humidity.innerHTML = `Humidity: ${data1.humidity} %`;
        feels_like.innerHTML = `Feels Like: ${data1.feels_like} °C`;
        sunrise.innerHTML = `Sunrise: ${new Date(data1.sunrise * 1000).toLocaleTimeString()}`;
        sunset.innerHTML = `Sunset: ${new Date(data1.sunset * 1000).toLocaleTimeString()}`;
        

        tempLove.innerHTML = `Temperature: ${data2.temp} °C`;
        humidityLove.innerHTML = `Humidity: ${data2.humidity} %`;
        feels_likeLove.innerHTML = `Feels Like: ${data2.feels_like} °C`;
        sunriseLove.innerHTML = `Sunrise: ${new Date(data2.sunrise * 1000).toLocaleTimeString()}`;
      sunsetLove.innerHTML = `Sunset: ${new Date(data2.sunset * 1000).toLocaleTimeString()}`;
        

        

    } catch (err) {
        console.error("Fetch error:", err);
    } finally {
        // 2. Hide the dimmer and allow clicks again (runs even if fetch fails)
        dimer.style.visibility = "hidden";
        loader.style.visibility = "hidden";
        dimer.style.opacity = "0";
        dimer.style.pointerEvents = "none";
    }
});