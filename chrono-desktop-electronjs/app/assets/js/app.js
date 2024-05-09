const heuresIdElt = document.querySelector("#heuresId");
const minutesIdElt = document.querySelector("#minutesId");
const secondesIdElt = document.querySelector("#secondesId");
const msecondesIdElt = document.querySelector("#msecondesId");

const startIdElt = document.querySelector("#startId");
const stopIdElt = document.querySelector("#stopId");
const resetIdElt = document.querySelector("#resetId");

let timerId; // stocker l'id du timer
let heures = 0;
let minutes = 0;
let secondes = 0;
let msecondes = 0;

// fonction pour afficher 2 chiffres lorsqu'on a 1 seul chiffre
function formatNumber(nbr) {
  return nbr.toString().padStart(2, "0");
}

// déclanchement de l'evenement du bouton start / demarrage
startIdElt.addEventListener("click", startChrono);
function startChrono() {
  timerId = setInterval(() => {
    // affichage du chrono
    heuresIdElt.textContent = formatNumber(heures);
    minutesIdElt.textContent = formatNumber(minutes);
    secondesIdElt.textContent = formatNumber(secondes);
    msecondesIdElt.textContent = formatNumber(msecondes);

    /**
     * logique de traitement
     */
    // traitement de msecondes et secondes
    msecondes += 1;
    if (msecondes >= 10) {
      msecondes = 0;
      secondes += 1;
    }

    // traitement de secondes et minutes
    if (secondes >= 60) {
      secondes = 0;
      minutes += 1;
    }

    // traitement de minutes et heures
    if (minutes >= 60) {
      minutes = 0;
      heures += 1;
    }

    // traitement de minutes et d'heures
  }, 100);

  // désactivation du bouton  en ajoutant l'attribut disabled
  startIdElt.setAttribute("disabled", "");
}

// déclanchement de l'evenement du bouton stop
stopIdElt.addEventListener("click", stopChono);
function stopChono() {
  // arrêter le timer
  clearInterval(timerId);

  // réactivation du bouton start en supprimant l'attribut disabled
  startIdElt.removeAttribute("disabled");
}

// déclanchement de l'evenement du bouton reset
resetIdElt.addEventListener("click", resetChono);
function resetChono() {
  // Réinitialisation des variables
  heures = 0;
  minutes = 0;
  secondes = 0;
  msecondes = 0;

  clearInterval(timerId);

  // affichage du chrono
  heuresIdElt.textContent = "00";
  minutesIdElt.textContent = "00";
  secondesIdElt.textContent = "00";
  msecondesIdElt.textContent = "00";

  // réactivation du bouton start en supprimant l'attribut disabled
  startIdElt.removeAttribute("disabled");
}
