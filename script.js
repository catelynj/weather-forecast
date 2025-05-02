//sanitize user input
function sanitize(input) {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`/g, "&#x60;")
    .replace(/;/g, "&#59;")
    .replace(/&/g, "&amp;");
}

document.getElementById("zipcodeForm").addEventListener("submit", function (event)
  {
    event.preventDefault();
    const zipcode = document.getElementById("zipcode").value;
    const cleanzip = sanitize(zipcode);
    getWeatherForecast(cleanzip);
  });

async function getWeatherForecast(zipcode) {
  try {
    const res = await fetch(`http://localhost:3000/api/weather?zip=${zipcode}`);
    const data = await res.json();

    displayForecast(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    const apiError = document.querySelector(".forecastErrorInfo");
    apiError.innerText = "Error fetching weather data. Try again later";
  }
}

function displayForecast(data) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";
  const forecastError = document.querySelector(".forecastErrorInfo");
  forecastError.innerText = "";

  if (data && data.forecast && data.forecast.forecastday) {
    const forecastStrong = document.createElement("strong");
    forecastStrong.classList.add("forecastInfo");
    forecastStrong.innerText = `${data.location.name}`;
    forecastDiv.appendChild(forecastStrong);
    forecastDiv.style.backgroundColor = "#f0f0f0";
    forecastDiv.style.border = "1px solid #1f2635";
    forecastDiv.style.borderRadius = "10px";
    forecastDiv.style.boxShadow = "5px 5px 5px #3d4961";
    forecastDiv.style.display = "flex";

    data.forecast.forecastday.forEach((day) => {
      const date = new Date(day.date).toDateString();
      const condition = day.day.condition.text;
      const temp = day.day.avgtemp_f;
      const forecastItem = document.createElement("p");
      forecastItem.innerText = `${date}: ${condition}, ${temp}°F`;
      forecastDiv.appendChild(forecastItem);
    });
  } else {
    forecastDiv.style.display = "none";
    forecastError.innerText = "Error: Invalid ZIP";
  }
}
