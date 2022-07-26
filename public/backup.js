// COMPONENTS
const landingPage = (nasa) => {
    let media = "";
    if(nasa.media_type === "video"){
        media = videoSection(nasa)
    } else {
        media = imageSection(nasa)
    }

    return `
        <header>
            <h1>Nasa's Astronomical Picture of the Day</h1>
            <form >
                <input id="datepicker" type="date"> 
            </form>
        </header>
        <main>
            <section class="title-section">
                <h2 id="title">${nasa.title}</h2>
                <p id="date">${nasa.date}</p>
            </section>

            <section id="media-section">${media}</section>

            <div class="explanation-container">
                <p id="explanation">${nasa.explanation}</p>
            </div>
        </main>
    `;
};

const imageSection = (nasa) => {
    return`
    <a id="hdimg" href="" target="-blank">
        <div class="image-div">
        <img id="image_of_the_day" src="${nasa.hdurl}" alt="image-by-nasa"/>
        </div>
    </a>
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

// Date picker - content update
function updateContent(event) {
    const requestDate = event.target.value
    console.log(event.target.value);
}

// FETCH DATA
async function loadEvent() {

    // Root div
    const rootElement = document.getElementById("root");


    // API key
    const nasaApiKey = "1mTCOFLk0Nof1ZPgSEShro6KaAHddyvNnq8rIoLT";


    // DATE
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(date);

    let requestedDate = date;


    // Fetch
    const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${requestedDate}`);
    const apodJson = await apod.json();
    // console.log(apodJson);


    // Page content
    rootElement.insertAdjacentHTML("beforeend", landingPage(apodJson));


    // Datepicker - coming soon
    const datePicker = document.getElementById("datepicker");
    datePicker.addEventListener("change", updateContent);
    // console.log(datePicker);

    // function updateContent(e) {
    //     const dateValues = []
        
    // }
    
    
}

// window.addEventListener("load", loadEvent);