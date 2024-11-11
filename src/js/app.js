console.log("Message");

// Naming the classes from the HTML Document
const millisecondsContainer = document.querySelector(".timer_milliseconds");
const secondsContainer = document.querySelector(".timer_seconds");
const minutesContainer = document.querySelector(".timer_minutes");
const hoursContainer = document.querySelector(".timer_hours");

// Selecting the buttons all together
const controlButtons = document.querySelectorAll("controls__button");

// Selecting the buttons separatly as well
const startButton = document.querySelector("controls__button--start");
const pauseButton = document.querySelector("controls__button--pause");
const resetButton = document.querySelector("controls__button--reset");

// Selecting the paragraph element
const controlsGuide = document.querySelector(".stopwatch__guide");

// Declearing variables
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerStatus = null;

// Function to handle the increment logic
const handleIncrement = ()=>{
    milliseconds+=10; //Millisekundene vil øke i intervaller på 10 av gangen, slik at den ikke laster inn hele tiden. 
    if(milliseconds === 1000){
        seconds++; // Der millisekundene når 1000, begynner sekunder å telle, og millisekunder resettes. 
        milliseconds= 0;
     if(seconds === 60){
        seconds= 0;
        minutes++;
        if(minutes === 60){
            hours++;
            minutes=0;
        }
    }
}

const formattedSeconds = seconds < 10 ? "0"+seconds: seconds; //Formaterte tider.
const formattedMinutes = seconds < 10 ? "0"+minutes: minutes; 
const formattedHours = seconds < 10 ? "0"+hours: hours; 

millisecondsContainer.textContent = milliseconds;
secondsContainer.textContent = formattedSeconds; // Henter inn de formaterte tidene vi lagde over. 
minutesContainer.textContent = formattedMinutes;
hoursContainer.textContent = formattedHours;
};

// Adding Event Listeners til buttons (hva som skjer når man trykker på knappene)
startButton.addEventListener("click", handleControls);
pauseButton.addEventListener("click", handleControls);
resetButton.addEventListener("click", handleControls);

// Passing the function ^ med hva som skjer når man trykker på knappene over. Samme funksjon for alle tre knapper. Bruker if statement for å vite hvilken knapp som er trykket.
const handleControls = (e)=>{
    if(e.target.classList.includes("controls__button-start")){ // Henter classname fra HTML
        if(timerStatus !== null){ // Sjekke om en intervall allerede løper. De kan ikke være i konflikt med hverandre. Man trenger alltid én aktiv intervall. Bruker if statement.
            clearInterval(timerStatus);
        }
       timerStatus = setInterval(handleIncrement, 10); //Setter intervall
    }
}
