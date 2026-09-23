// AERO VISION
// Air Pollution - Weather Coupled Forecasting System


const API_URL = "";


// Get sensor data from backend API
async function getSensorData() {

    if (!API_URL) {
        return null;
    }

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        return await response.json();

    } catch (error) {

        console.error("Sensor API Error:", error);

        return null;
    }
}


// Update dashboard values
function updateDashboard(data) {

    if (!data) {
        return;
    }

    const elements = {

        aqi: document.querySelector("[data-aqi]"),

        pm25: document.querySelector("[data-pm25]"),

        pm10: document.querySelector("[data-pm10]"),

        temperature:
            document.querySelector("[data-temperature]"),

        humidity:
            document.querySelector("[data-humidity]"),

        wind:
            document.querySelector("[data-wind]")

    };


    if (elements.aqi && data.aqi !== undefined) {
        elements.aqi.textContent = data.aqi;
    }


    if (elements.pm25 && data.pm25 !== undefined) {
        elements.pm25.textContent = data.pm25;
    }


    if (elements.pm10 && data.pm10 !== undefined) {
        elements.pm10.textContent = data.pm10;
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


// Check backend connection
async function checkSystem() {

    const data = await getSensorData();

    updateDashboard(data);

}


// Start application
document.addEventListener("DOMContentLoaded", () => {

    checkSystem();

    // Check for new sensor data every 30 seconds
    setInterval(checkSystem, 30000);

});
// =====================================
// AERO VISION PAGE TRANSITION
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll("a[href]");

    links.forEach(link => {

        const url = link.getAttribute("href");

        // Only internal HTML pages
        if (
            url &&
            url.endsWith(".html") &&
            !url.startsWith("http") &&
            !url.startsWith("#")
        ) {

            link.addEventListener("click", function (e) {

                e.preventDefault();

                const target = this.href;

                document.body.classList.add("page-exit");

                setTimeout(() => {
                    window.location.href = target;
                }, 400);

            });

        }
        // =====================================
// HAMBURGER MENU
// =====================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("menu-open");
    });

    // Close menu after selecting a page
    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("menu-open");
        });
    });

}

    });

});
