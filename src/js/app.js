console.log("Message");

// Naming the classes from the HTML Document
const millisecondsContainer = document.querySelector(".timer_milliseconds");
const secondsContainer = document.querySelector(".timer_seconds");
const minutesContainer = document.querySelector(".timer_minutes");
const hoursContainer = document.querySelector(".timer_hours");

// Selecting the buttons all together
const controlButtons = document.querySelectorAll("controls__button");

// Selecting the buttons separatly as well
const startButton = document.querySelector(".controls__button--start");
const pauseButton = document.querySelector(".controls__button--pause");
const resetButton = document.querySelector(".controls__button--reset");

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


// Passing the function ^ med hva som skjer når man trykker på knappene over. Samme funksjon for alle tre knapper. Bruker if statement for å vite hvilken knapp som er trykket.
const handleControls = (e)=>{
    if(e.target.classList.contains("controls__button--start")){ // Henter classname fra HTML
        // startButton.classList.remove("controls__button--start");
        pauseButton.textContent = "Pause"; // Setter ordet tilbake til pause når den har vært på pause
        startButton.textContent = "Start"; // Setter ordet tilbake til start etter man har trykket på resume
        controlsGuide.style.visibility = "hidden"; // Skjuler resume melding

        if(timerStatus !== null){ // Sjekke om en intervall allerede løper. De kan ikke være i konflikt med hverandre. Man trenger alltid én aktiv intervall. Bruker if statement.
            clearInterval(timerStatus);
        }
       timerStatus = setInterval(handleIncrement, 10); //Setter intervall
    } else if (e.target.classList.contains("controls__button--pause")){ // Etter man er ferdig å sjekke om start knappen går, sjekker vi nå videre til neste knapp
        clearInterval(timerStatus); // Sier den nå stoppes dersom den går. 
        pauseButton.textContent = "Paused";
        startButton.textContent = "Resume";
        controlsGuide.style.visibility = "visible";
    } else if (e.target.classList.contains("controls__button--reset")){ // Sjekker her siste knapp
        clearInterval(timerStatus); // Stopper den
        hours = 0; // Resetter verdien til 0, slik at den ikke beholder det den allerede har telt opp
        minutes = 0; 
        seconds = 0; 
        milliseconds = 0; 

        millisecondsContainer.textContent = "000"; // Resetter det visuelle tallet som vises også
        secondsContainer.textContent = "00"; 
        minutesContainer.textContent = "00"; 
        hoursContainer.textContent = "00"; 

        pauseButton.textContent = "Pause";
        startButton.textContent = "Start";
        controlsGuide.style.visibility = "hidden";
    }
}

// Adding Event Listeners til buttons (hva som skjer når man trykker på knappene)
// Må ligge etter logikken
startButton.addEventListener("click", handleControls);
pauseButton.addEventListener("click", handleControls);
resetButton.addEventListener("click", handleControls);
