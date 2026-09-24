// =====================================
// AERO VISION
// Air Pollution - Weather Coupled Forecasting System
// =====================================

const API_URL = "";


// =====================================
// GET SENSOR DATA
// =====================================

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


// =====================================
// UPDATE DASHBOARD
// =====================================

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


// =====================================
// CHECK BACKEND CONNECTION
// =====================================

async function checkSystem() {

    const data = await getSensorData();

    updateDashboard(data);

}


// =====================================
// PAGE LOAD
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // Start sensor check
    checkSystem();

    // Check every 30 seconds
    setInterval(checkSystem, 30000);


    // =====================================
    // HAMBURGER MENU
    // =====================================

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (menuToggle && mainNav) {

        // Open / Close menu
        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");

            mainNav.classList.toggle("menu-open");

        });


        // Close menu when selecting a page
        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                mainNav.classList.remove("menu-open");

            });

        });

    }


    // =====================================
    // PAGE TO PAGE ANIMATION
    // =====================================

    const links =
        document.querySelectorAll("a[href]");


    links.forEach(link => {

        const url =
            link.getAttribute("href");


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


                // Close menu
                if (menuToggle && mainNav) {

                    menuToggle.classList.remove("active");

                    mainNav.classList.remove("menu-open");

                }


                // Page exit animation
                document.body.classList.add("page-exit");


                setTimeout(() => {

                    window.location.href = target;

                }, 400);

            });

        }

    });

});
