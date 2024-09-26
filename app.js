const searchBtn = document.querySelector(".bxs-search i");
const temprature = document.querySelector(".temprature");
const infoHumadity = document.querySelector(".info-humadity span");
const infoWind = document.querySelector(".info-Wind span");
const description = document.querySelector(".description");
const image = document.querySelector(".weather img");
const error404 = document.querySelector(".not-found");
const container = document.querySelector(".container");
const weatherDetails = document.querySelector(".weather-details");
const weatherBox = document.querySelector(".weather-box");
// const cityHide = document.querySelector(".city-hide");


//Music
const audio = new Audio('path_to_audio_file.mp3');
// audio.play();




const input = document.querySelector("input");
searchBtn.addEventListener("click", () => {
  const city = input.value;
  if (city == "") {
    return;
  } else {
    fetchweather(city);
  }
});

async function fetchweather(city) {
  const apiKey = "ffb078ef947de05e9784dbdb118bf614";

  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      container.style.height = "480px";

      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      temprature.innerHTML = `${Math.floor(data.main.temp)}<span>°C </span>`;
      infoHumadity.innerText = `${data.main.humidity}%`;
      infoWind.innerText = `${Math.floor(data.wind.speed)}Km/h`;
      description.innerText = `${data.weather[0].description}`;
      console.log("data.weather[0].description: ", data.weather[0].description);
      console.log(data.weather[0].main);

      switch (data.weather[0].main) {
        case "Clear":
          image.src = "image/clear .png";
          break;
        case "Rain":
          image.src = "image/rain.png";
          break;
        case "Snow":
          image.src = "image/snow.png";
          break;
        case "Clouds":
          image.src = "image/cloud.png";
          break;
        case "Mist":
          image.src = "image/mist.png";
          break;
        case "Haze":
          image.src = "image/haze.png";
          break;
        case "Smoke":
          image.src = "image/somke.png";
          break;

        default:
          image.src = "image/somke.png";
          break;
      }
    })
    .catch((error) => {
      container.style.height = "350px";
      weatherBox.classList.remove("active");
      weatherDetails.classList.remove("active");
      error404.classList.add("active");

      console.log("error: ", error);
      return "NOt Found";
    });
}
