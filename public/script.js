// Step 1 - without JS Header and datepicker is visible

// Step 2 - when date picked, log date

// Step 3 - when date has been picked, show picture of the day
// 3A - log in console data from nasa
// 3B - show the data in window

// Step 4 - When the page loads, automatically display the picture of the day


function pageHeader() {
    return `
        <header>
            <h1>Astronomical Picture of the Day</h1>
            <form >
                <input id="datepicker" type="date"> 
            </form>
        </header>
        <main></main>
    `;
};

function pageContent(nasa) {
    let media = "";
    if(nasa.media_type === "video") {
        media = videoSection(nasa)
    } else {
        media = imageSection(nasa)
    }
    return `
        <section id="media-section">${media}</section>
    
        <section class="description-section">
            <h2 id="title">${nasa.title}</h2>
            <p id="date">${nasa.date}</p>
            <p id="explanation">${nasa.explanation}</p>
        </section>
    `;
};

const imageSection = (nasa) => {
    return`
        <div class="image-div">
            <img id="image_of_the_day" src="${nasa.hdurl}" alt="image-by-nasa"/>
        </div>
    `;
};

const videoSection = (nasa) => {
    return`
    <div class="video-div"> 
        <iframe id="videoLink" src="${nasa.url}" frameborder="0">
        </iframe>
    </div>
    `;
};

async function fetchJson(requestedDate) {
    // API key
    const nasaApiKey = "1mTCOFLk0Nof1ZPgSEShro6KaAHddyvNnq8rIoLT";

    // Fetch
    const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${requestedDate}`);
    const apodJson = await apod.json();

    return apodJson;
};

// Datepicker
function updateContent(event) {
    const requestDate = event.target.value
    console.log(event.target.value);
    replaceContent(requestDate);
};

async function replaceContent(requestDate) {
    const apodJSON = await fetchJson(requestDate);
    console.log(apodJSON);

    const mainSection = document.querySelector("main");
    mainSection.innerHTML = pageContent(apodJSON);
};

async function loadEvent() {
    // Root div -inserts the page header
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = pageHeader();

    const datePicker = document.getElementById("datepicker");
    datePicker.addEventListener("change", updateContent);

    let today = new Date();
    let date = today.toISOString().split('T')[0]

    datePicker.value = date;
    console.log(date);
    replaceContent(date);
};

window.addEventListener("load", loadEvent);