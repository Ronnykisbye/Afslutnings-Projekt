"use strict";

const sections = [
  { number:"01", shortTitle:"Indhold", title:"Menu og indholdsfortegnelse", icon:"📑", color:"red", shape:"square", text:"Her samles projektets indholdsfortegnelse og overblik over alle afsnit.", resource:{label:"Åbn projektgrundlaget",href:"docs/PROJEKTGRUNDLAG.md"} },
  { number:"02", shortTitle:"Indledning", title:"Indledning", icon:"📘", color:"orange", shape:"round", text:"Her beskrives projektets emne, baggrund, relevans og den sammenhæng, projektet indgår i." },
  { number:"03", shortTitle:"Problem", title:"Problemstilling", icon:"🔍", color:"yellow", shape:"soft", text:"Her beskrives den fagligt væsentlige udfordring, som projektet undersøger." },
  { number:"04", shortTitle:"Spørgsmål", title:"Problemformulering", icon:"🎯", color:"green", shape:"square", text:"Her placeres det præcise hovedspørgsmål og eventuelle underspørgsmål, som konklusionen senere skal besvare." },
  { number:"05", shortTitle:"Metodevalg", title:"Metodevalg og undersøgelsesdesign", icon:"🧪", color:"cyan", shape:"wide", text:"Her begrundes projektets metode, dataindsamling, fremgangsmåde og undersøgelsesdesign." },
  { number:"06", shortTitle:"Teori", title:"Teori og modeller", icon:"🧠", color:"blue", shape:"round", text:"Her samles de teorier, modeller og faglige begreber, der bruges i analysen." },
  { number:"07", shortTitle:"Empiri", title:"Empiriske data", icon:"📋", color:"purple", shape:"soft", text:"Her samles dokumenterede målinger, observationer, tests og andet datagrundlag." },
  { number:"08", shortTitle:"Analyse", title:"Analyse", icon:"📊", color:"pink", shape:"square", text:"Her kobles teori og praksis, så undersøgelsen skaber ny faglig indsigt." },
  { number:"09", shortTitle:"Kritik", title:"Kritiske overvejelser", icon:"⚠️", color:"amber", shape:"round", text:"Her vurderes metode, kilder, begrænsninger, usikkerheder og mulige fejlkilder." },
  { number:"10", shortTitle:"Konklusion", title:"Konklusion", icon:"✅", color:"lime", shape:"wide", text:"Her besvares problemformuleringen klart og uden at introducere nyt stof." },
  { number:"11", shortTitle:"Perspektiv", title:"Perspektivering", icon:"🧭", color:"teal", shape:"soft", text:"Her sættes projektets resultater ind i en større faglig eller praktisk sammenhæng." },
  { number:"12", shortTitle:"Kilder", title:"Litteraturliste", icon:"📚", color:"indigo", shape:"square", text:"Her samles alle anvendte bøger, artikler, hjemmesider og øvrige kilder." },
  { number:"13", shortTitle:"Bilag", title:"Bilagsoversigt", icon:"📎", color:"violet", shape:"round", text:"Her samles projektets bilag og en oversigt, der gør dem nemme at finde." },
  { number:"14", shortTitle:"Endelig opgave", title:"Den endelige projektopgave", icon:"🏆", color:"gold", shape:"wide", text:"Her kommer linket til den samlede, endelige Word- eller PDF-opgave.", privateFile:"Eksamen_Afgangsprojekt_v1.docx findes i dit private bibliotek og er ikke offentliggjort på GitHub." },
  { number:"+", shortTitle:"Ekstra", title:"Ekstra plads", icon:"✨", color:"sky", shape:"soft", text:"Reserveområde til et nyt afsnit, en funktion eller et dokument, som vi får brug for senere." }
];

const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");
const themeButton = document.querySelector("#themeButton");
const backControl = document.querySelector("#backControl");
const modeControl = document.querySelector("#modeControl");
const menuControl = document.querySelector("#menuControl");
let activeSection = null;
let history = [];

function renderMenu() {
  buttons.replaceChildren();
  sections.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `toy-button tone-${section.color} shape-${section.shape}`;
    button.setAttribute("aria-label", `Åbn ${section.title}`);
    button.innerHTML = `<span class="number">${section.number}</span><span class="emoji" aria-hidden="true">${section.icon}</span><strong>${section.shortTitle}</strong>`;
    button.addEventListener("click", () => openSection(section));
    buttons.append(button);
  });
}

function openSection(section, remember = true) {
  if (remember && activeSection) history.push(activeSection);
  activeSection = section;
  display.innerHTML = "";

  const iconElement = document.createElement("div");
  iconElement.className = `section-icon tone-${section.color}`;
  iconElement.textContent = section.icon;

  const kicker = document.createElement("p");
  kicker.className = "kicker";
  kicker.textContent = `Afsnit ${section.number}`;

  const heading = document.createElement("h1");
  heading.textContent = section.title;

  const content = document.createElement("div");
  content.className = "section-content";
  const description = document.createElement("p");
  description.textContent = section.text;
  content.append(description);

  if (section.resource) {
    const link = document.createElement("a");
    link.className = "file-link";
    link.href = section.resource.href;
    link.textContent = `📄 ${section.resource.label}`;
    content.append(link);
  }

  if (section.privateFile) {
    const fileNotice = document.createElement("p");
    fileNotice.className = "private-file-note";
    fileNotice.textContent = `🔒 ${section.privateFile}`;
    content.append(fileNotice);
  }

  const status = document.createElement("span");
  status.className = "content-status";
  status.textContent = "Klar til indhold";
  content.append(status);

  display.append(iconElement, kicker, heading, content);
  updateSideControls();
  document.querySelector("#app")?.scrollIntoView({ behavior:"smooth", block:"start" });
}

function showWelcome() {
  activeSection = null;
  history = [];
  display.innerHTML = '<div class="welcome-icon">✏️</div><p class="kicker">Mit AU-afgangsprojekt</p><h1>Tryk på en knap</h1><p class="lead">Vælg den del af projektet, du vil arbejde med.</p><p class="display-note">🔒 Kun rammen er oprettet – teksten kommer senere</p>';
  updateSideControls();
}

function goBack() {
  const previous = history.pop();
  if (previous) openSection(previous, false);
  else showWelcome();
}

function updateSideControls() {
  backControl.disabled = !activeSection;
  backControl.setAttribute("aria-disabled", String(!activeSection));
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = theme === "light" ? "🌙" : "☀️";
  modeControl.querySelector("span").textContent = theme === "light" ? "◐" : "☀";
  localStorage.setItem("afgang_theme", theme);
}

themeButton.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light"));
modeControl.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light"));
backControl.addEventListener("click", goBack);
menuControl.addEventListener("click", showWelcome);
setTheme(localStorage.getItem("afgang_theme") === "dark" ? "dark" : "light");
renderMenu();
updateSideControls();
