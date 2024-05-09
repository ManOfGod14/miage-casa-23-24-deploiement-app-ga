const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

// déclaration de la varibale mainWindow
let mainWindow;

// déclaration de la fonction permettant de créer interface Window
function createWindow() {
  // création d'une nouvelle fenêtre de navigateur
  mainWindow = new BrowserWindow({
    width: 800, // largeur par défaut
    height: 600, // hauteur par défaut
    webPreferences: {
      nodeIntegration: true, // permet l'intégration de Node.js dans le rendu de la page
      devTools: false, // permet de désactiver les outils de développement
    },
    icon: path.join(__dirname, "chrono.ico"), // chemin de l'icone de l'application
    titleBarStyle: "hiddenInset", // Masque de la barre de titre (pour macOS)
    frame: true, // Active la barre de titre (pour windows et linux)
  });

  // Maximiser la fenêtre pour qu'elle s'adapte à la taille de l'écran
  mainWindow.maximize();

  // charger le fichier HTML principal dans la fenêtre
  mainWindow.loadFile("app/index.html");

  // Ecoute d'évenement de fermeture de la fenêtre
  mainWindow.on("closed", () => {
    mainWindow = null; // mettre la référence de la fenêtre principale à null
  });

  // Suppression du menu de la fenêtre
  mainWindow.removeMenu();

  // Engistrement d'un raccourci clavier global pour la touche "Escape"
  globalShortcut.register("Escape", () => {
    if (mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false); // Quitter le mode plein écran
    }
  });

  // Interception des évènements clavier avant leur envoi à la page web
  mainWindow.webContents.on("before-input-event", (event, input) => {
    // Si la combinaison de touche Ctrl + Maj + I est détectée, empêche l'ouverture des outils de développement
    if (input.control && input.shift && input.key.toLocaleLowerCase() === "i") {
      event.preventDefault();
    }
  });
}

// Evènement déclenché lorsque Electron a terminé son initialisation et est prêt a créer des fenêtres de navigateur
app.on("ready", createWindow);

// Evènement déclenché lorsque toutes les fenêtres de l'application sont fermées
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Evènement déclenché lorsque l'application est activée (par exemple, clique sur l'icône dans la barre des tâches)
app.on("activate", () => {
  // Récrée la fenêtre si elle n'existe pas déjà
  if (mainWindow === null) {
    createWindow();
  }
});
