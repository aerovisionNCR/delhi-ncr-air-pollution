// =====================================
// AERO VISION
// Air Pollution - Weather Coupled
// Forecasting System
// =====================================


// =====================================
// SENSOR API
// =====================================

const API_URL = "";


// =====================================
// WEATHER API
// DELHI NCR
// =====================================

const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=28.6139" +
    "&longitude=77.2090" +
    "&current=" +
    "temperature_2m," +
    "relative_humidity_2m," +
    "rain," +
    "pressure_msl," +
    "wind_speed_10m," +
    "wind_direction_10m," +
    "cloud_cover," +
    "visibility," +
    "weather_code" +
    "&hourly=" +
    "temperature_2m," +
    "relative_humidity_2m," +
    "rain," +
    "cloud_cover," +
    "visibility," +
    "weather_code" +
    "&timezone=Asia%2FKolkata" +
    "&forecast_days=2";


// =====================================
// GET SENSOR DATA
// =====================================

async function getSensorData() {

    if (!API_URL) {
        return null;
    }

    try {

        const response =
            await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                "Sensor API request failed"
            );
        }

        return await response.json();

    } catch (error) {

        console.error(
            "Sensor API Error:",
            error
        );

        return null;
    }
}


// =====================================
// UPDATE DASHBOARD
// =====================================

function updateDashboard(data) {

    if (!data) {
        return;
    }

    const elements = {

        aqi:
            document.querySelector("[data-aqi]"),

        pm25:
            document.querySelector("[data-pm25]"),

        pm10:
            document.querySelector("[data-pm10]"),

        temperature:
            document.querySelector("[data-temperature]"),

        humidity:
            document.querySelector("[data-humidity]"),

        wind:
            document.querySelector("[data-wind]")
    };


    if (
        elements.aqi &&
        data.aqi !== undefined
    ) {
        elements.aqi.textContent =
            data.aqi;
    }


    if (
        elements.pm25 &&
        data.pm25 !== undefined
    ) {
        elements.pm25.textContent =
            data.pm25;
    }


    if (
        elements.pm10 &&
        data.pm10 !== undefined
    ) {
        elements.pm10.textContent =
            data.pm10;
    }


    if (
        elements.temperature &&
        data.temperature !== undefined
    ) {
        elements.temperature.textContent =
            data.temperature + " °C";
    }


    if (
        elements.humidity &&
        data.humidity !== undefined
    ) {
        elements.humidity.textContent =
            data.humidity + " %";
    }


    if (
        elements.wind &&
        data.wind !== undefined
    ) {
        elements.wind.textContent =
            data.wind + " km/h";
    }

}


// =====================================
// CHECK SENSOR SYSTEM
// =====================================

async function checkSystem() {

    const data =
        await getSensorData();

    updateDashboard(data);
}


// =====================================
// WEATHER DESCRIPTION
// =====================================

function getWeatherDescription(code) {

    const weatherCodes = {

        0: ["Clear Sky", "☀️"],

        1: ["Mainly Clear", "🌤️"],

        2: ["Partly Cloudy", "⛅"],

        3: ["Overcast", "☁️"],

        45: ["Fog", "🌫️"],

        48: ["Fog", "🌫️"],

        51: ["Light Drizzle", "🌦️"],

        53: ["Drizzle", "🌦️"],

        55: ["Heavy Drizzle", "🌧️"],

        61: ["Light Rain", "🌦️"],

        63: ["Moderate Rain", "🌧️"],

        65: ["Heavy Rain", "🌧️"],

        71: ["Light Snow", "🌨️"],

        73: ["Snow", "❄️"],

        75: ["Heavy Snow", "❄️"],

        80: ["Rain Showers", "🌦️"],

        81: ["Rain Showers", "🌧️"],

        82: ["Heavy Rain Showers", "⛈️"],

        95: ["Thunderstorm", "⛈️"],

        96: ["Thunderstorm + Hail", "⛈️"],

        99: ["Thunderstorm + Hail", "⛈️"]
    };


    return (
        weatherCodes[code] ||
        ["Weather", "🌤️"]
    );
}


// =====================================
// WIND DIRECTION
// =====================================

function getWindDirection(degrees) {

    const directions = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SW",
        "W",
        "NW"
    ];


    const index =
        Math.round(degrees / 45) % 8;


    return directions[index];
}


// =====================================
// GET WEATHER DATA
// =====================================

async function getWeatherData() {

    try {

        const response =
            await fetch(WEATHER_API);


        if (!response.ok) {

            throw new Error(
                "Weather API request failed"
            );
        }


        return await response.json();

    } catch (error) {

        console.error(
            "Weather API Error:",
            error
        );

        return null;
    }
}


// =====================================
// UPDATE CURRENT WEATHER
// =====================================

function updateCurrentWeather(data) {

    if (
        !data ||
        !data.current
    ) {
        return;
    }


    const current =
        data.current;


    // Temperature

    const temperature =
        document.getElementById(
            "weatherTemperature"
        );


    if (temperature) {

        temperature.textContent =
            Math.round(
                current.temperature_2m
            );
    }


    // Humidity

    const humidity =
        document.getElementById(
            "weatherHumidity"
        );


    if (humidity) {

        humidity.textContent =
            Math.round(
                current.relative_humidity_2m
            );
    }


    // Wind

    const wind =
        document.getElementById(
            "weatherWind"
        );


    if (wind) {

        wind.textContent =
            Math.round(
                current.wind_speed_10m
            );
    }


    // Wind direction

    const windDirection =
        document.getElementById(
            "weatherWindDirection"
        );


    if (windDirection) {

        windDirection.textContent =
            getWindDirection(
                current.wind_direction_10m
            );
    }


    const windDegree =
        document.getElementById(
            "weatherWindDegree"
        );


    if (windDegree) {

        windDegree.textContent =
            Math.round(
                current.wind_direction_10m
            ) + "°";
    }


    // Cloud cover

    const cloud =
        document.getElementById(
            "weatherCloud"
        );


    if (cloud) {

        cloud.textContent =
            Math.round(
                current.cloud_cover
            ) + " %";
    }


    // Rain

    const rain =
        document.getElementById(
            "weatherRain"
        );


    if (rain) {

        rain.textContent =
            Number(
                current.rain
            ).toFixed(1) +
            " mm";
    }


    // Pressure

    const pressure =
        document.getElementById(
            "weatherPressure"
        );


    if (pressure) {

        pressure.textContent =
            Math.round(
                current.pressure_msl
            ) + " hPa";
    }


    // Visibility

    const visibility =
        document.getElementById(
            "weatherVisibility"
        );


    if (visibility) {

        visibility.textContent =
            (
                current.visibility /
                1000
            ).toFixed(1) +
            " km";
    }
}


// =====================================
// HOURLY WEATHER
// =====================================

function updateHourlyWeather(data) {

    const container =
        document.getElementById(
            "hourlyWeather"
        );


    if (
        !container ||
        !data ||
        !data.hourly
    ) {
        return;
    }


    const hourly =
        data.hourly;


    container.innerHTML = "";


    const count = 12;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const date =
            new Date(
                hourly.time[i]
            );


        const weather =
            getWeatherDescription(
                hourly.weather_code[i]
            );


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "weather-hour-card";


        card.innerHTML = `

            <div class="weather-hour-time">

                ${date.toLocaleTimeString(
                    "en-IN",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                )}

            </div>


            <div class="weather-hour-icon">

                ${weather[1]}

            </div>


            <div class="weather-hour-temp">

                ${Math.round(
                    hourly.temperature_2m[i]
                )}°C

            </div>


            <div class="weather-hour-info">

                💧 ${Math.round(
                    hourly.relative_humidity_2m[i]
                )}%

            </div>


            <div class="weather-hour-info">

                ☁️ ${Math.round(
                    hourly.cloud_cover[i]
                )}%

            </div>

        `;


        container.appendChild(card);
    }
}


// =====================================
// LOAD WEATHER
// =====================================

async function loadWeather() {

    const status =
        document.getElementById(
            "weatherStatus"
        );


    const apiTitle =
        document.getElementById(
            "apiTitle"
        );


    const apiMessage =
        document.getElementById(
            "apiMessage"
        );


    if (status) {

        status.textContent =
            "CONNECTING...";
    }


    const data =
        await getWeatherData();


    if (!data) {

        if (status) {

            status.textContent =
                "CONNECTION FAILED";
        }


        if (apiTitle) {

            apiTitle.textContent =
                "Weather API Connection Failed";
        }


        if (apiMessage) {

            apiMessage.textContent =
                "Unable to retrieve weather data. Please check your internet connection.";
        }


        return;
    }


    updateCurrentWeather(data);

    updateHourlyWeather(data);


    if (status) {

        status.textContent =
            "LIVE DATA CONNECTED";
    }


    if (apiTitle) {

        apiTitle.textContent =
            "Weather API Connected";
    }


    if (apiMessage) {

        apiMessage.textContent =
            "Live Delhi NCR weather data is being retrieved from Open-Meteo.";
    }
}


// =====================================
// PAGE LOAD
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // Sensor system

        checkSystem();


        setInterval(
            checkSystem,
            30000
        );


        // Weather page

        if (
            document.getElementById(
                "weatherTemperature"
            )
        ) {

            loadWeather();


            // Refresh every 10 minutes

            setInterval(
                loadWeather,
                600000
            );
        }


        // =================================
        // HAMBURGER MENU
        // =================================

        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        const mainNav =
            document.getElementById(
                "mainNav"
            );


        if (
            menuToggle &&
            mainNav
        ) {

            menuToggle.addEventListener(
                "click",
                () => {

                    menuToggle.classList.toggle(
                        "active"
                    );


                    mainNav.classList.toggle(
                        "menu-open"
                    );
                }
            );


            mainNav
                .querySelectorAll("a")
                .forEach(
                    link => {

                        link.addEventListener(
                            "click",
                            () => {

                                menuToggle.classList.remove(
                                    "active"
                                );


                                mainNav.classList.remove(
                                    "menu-open"
                                );
                            }
                        );

                    }
                );
        }


        // =================================
        // PAGE TRANSITION
        // =================================

        document
            .querySelectorAll("a[href]")
            .forEach(
                link => {

                    const url =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        url &&
                        url.endsWith(".html") &&
                        !url.startsWith("http") &&
                        !url.startsWith("#")
                    ) {

                        link.addEventListener(
                            "click",
                            function(e) {

                                e.preventDefault();


                                const target =
                                    this.href;


                                if (
                                    menuToggle &&
                                    mainNav
                                ) {

                                    menuToggle.classList.remove(
                                        "active"
                                    );


                                    mainNav.classList.remove(
                                        "menu-open"
                                    );
                                }


                                document.body.classList.add(
                                    "page-exit"
                                );


                                setTimeout(
                                    () => {

                                        window.location.href =
                                            target;

                                    },
                                    400
                                );

                            }
                        );
                    }

                }
            );

    }
);


// =====================================
// BROWSER BACK BUTTON
// =====================================

window.addEventListener(
    "pageshow",
    () => {

        document.body.classList.remove(
            "page-exit"
        );


        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        const mainNav =
            document.getElementById(
                "mainNav"
            );


        if (
            menuToggle &&
            mainNav
        ) {

            menuToggle.classList.remove(
                "active"
            );


            mainNav.classList.remove(
                "menu-open"
            );
        }

    }
);
