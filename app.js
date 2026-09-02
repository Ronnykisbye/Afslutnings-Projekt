"use strict";

const sections = [
  ["01", "Indhold", "Menu og indholdsfortegnelse", "📑", "red", "square"],
  ["02", "Indledning", "Indledning", "📘", "orange", "round"],
  ["03", "Problem", "Problemstilling", "🔍", "yellow", "soft"],
  ["04", "Spørgsmål", "Problemformulering", "🎯", "green", "square"],
  ["05", "Metodevalg", "Metodevalg og undersøgelsesdesign", "🧪", "cyan", "wide"],
  ["06", "Teori", "Teori og modeller", "🧠", "blue", "round"],
  ["07", "Empiri", "Empiriske data", "📋", "purple", "soft"],
  ["08", "Analyse", "Analyse", "📊", "pink", "square"],
  ["09", "Kritik", "Kritiske overvejelser", "⚠️", "amber", "round"],
  ["10", "Konklusion", "Konklusion", "✅", "lime", "wide"],
  ["11", "Perspektiv", "Perspektivering", "🧭", "teal", "soft"],
  ["12", "Kilder", "Litteraturliste", "📚", "indigo", "square"],
  ["13", "Bilag", "Bilagsoversigt", "📎", "violet", "round"],
  ["14", "Endelig opgave", "Den endelige projektopgave", "🏆", "gold", "wide"],
  ["+", "Ekstra", "Ekstra plads", "✨", "sky", "soft"]
];

const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");
const themeButton = document.querySelector("#themeButton");

function renderMenu() {
  buttons.replaceChildren();
  sections.forEach(([number, shortTitle, title, icon, color, shape]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `toy-button tone-${color} shape-${shape}`;
    button.setAttribute("aria-label", `Åbn ${title}`);
    button.innerHTML = `<span class="number">${number}</span><span class="emoji" aria-hidden="true">${icon}</span><strong>${shortTitle}</strong>`;
    button.addEventListener("click", () => openSection({ number, title, icon, color }));
    buttons.append(button);
  });
}

function openSection({ number, title, icon, color }) {
  display.innerHTML = "";
  const back = document.createElement("button");
  back.type = "button";
  back.className = "back-button";
  back.textContent = "‹ Menu";
  back.addEventListener("click", showWelcome);

  const iconElement = document.createElement("div");
  iconElement.className = `section-icon tone-${color}`;
  iconElement.textContent = icon;

  const kicker = document.createElement("p");
  kicker.className = "kicker";
  kicker.textContent = `Afsnit ${number}`;

  const heading = document.createElement("h1");
  heading.textContent = title;

  const paper = document.createElement("div");
  paper.className = "empty-paper";
  paper.innerHTML = '<i></i><i></i><i></i><p>Tom ramme – teksten indsættes senere</p>';

  display.append(back, iconElement, kicker, heading, paper);
  document.querySelector("#app")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showWelcome() {
  display.innerHTML = '<div class="welcome-icon">✏️</div><p class="kicker">Mit AU-afgangsprojekt</p><h1>Tryk på en knap</h1><p class="lead">Vælg den del af projektet, du vil arbejde med.</p><p class="display-note">🔒 Kun rammen er oprettet – teksten kommer senere</p>';
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = theme === "light" ? "🌙" : "☀️";
  localStorage.setItem("afgang_theme", theme);
}

themeButton.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light"));
setTheme(localStorage.getItem("afgang_theme") === "dark" ? "dark" : "light");
renderMenu();
