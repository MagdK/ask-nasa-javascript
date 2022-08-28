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
            <div class="date_navigation_box">
                <button class="decrement">Previous day</button>
                <form>
                    <input 
                        id="datepicker" 
                        type="date"
                    > 
                </form>
                <button class="increment">Next day</button>
            </div>
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

function handleError(err) {
    console.log('Ohhhh nooo');
    console.log(err);
}

async function fetchJson(requestedDate) {
    // API key
    const nasaApiKey = "1mTCOFLk0Nof1ZPgSEShro6KaAHddyvNnq8rIoLT";

    // Fetch
    const apod = await (fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${requestedDate}`).catch(handleError));
    const apodJson = await apod.json();

    return apodJson;
};

// Datepicker
function updateContent(event) {
    const requestDate = event.target.value;
    console.log(event.target.value);
    replaceContent(requestDate);
};

// Place content in main tag after fetching it
async function replaceContent(requestDate) {
    const apodJSON = await fetchJson(requestDate);
    console.log("fetched data", apodJSON);

    const mainSection = document.querySelector("main");
    mainSection.innerHTML = pageContent(apodJSON);
};



// function renderPreviousDay() {
//     const datePicker = document.getElementById("datepicker");
//     // datePicker.value = "";

//     datePicker.dispatchEvent(new Event('change'));
// }

function renderNextDay() {
    const datePicker = document.getElementById("datepicker");
    

    datePicker.dispatchEvent(new Event('change'));
}


// ON PAGE LOAD
async function loadEvent() {
    // Root div -inserts the page header
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = pageHeader();

    const datePicker = document.getElementById("datepicker");
    datePicker.addEventListener("change", updateContent);
    console.log(typeof datePicker.value); //string

    let today = new Date();
    console.log("today", today)

    let date = today.toISOString().split('T')[0];
    console.log("date", date)

    datePicker.value = date;
    

    let oneDayInMillisec = 86400000;

    //  Previous day
    let prevDayButton = document.querySelector('.decrement');

    prevDayButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Date in milliseconds sinc 1-Jan-1970 midnight time
        let dateInMilliseconds = Date.parse(datePicker.value); // convert string to number

        let minusOneDayInMillisec = dateInMilliseconds - oneDayInMillisec;
        let yesterday = new Date(minusOneDayInMillisec); // create Date object
        let yesterdayAsString = yesterday.toISOString().split('T')[0];

        replaceContent(yesterdayAsString);
        datePicker.value = yesterdayAsString;
        updateContent;
    });

    //  Next day
    let nextDayButton = document.querySelector('.increment');

    nextDayButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Date in milliseconds sinc 1-Jan-1970 midnight time
        let dateInMilliseconds = Date.parse(datePicker.value); // convert string to number

        let plusOneDayInMillisec = dateInMilliseconds + oneDayInMillisec;
        let nextDay = new Date(plusOneDayInMillisec); // create Date object
        let nextDayAsString = nextDay.toISOString().split('T')[0];

        replaceContent(nextDayAsString);
        datePicker.value = nextDayAsString;
        updateContent;
    });
    
    replaceContent(date);
};

window.addEventListener("load", loadEvent);