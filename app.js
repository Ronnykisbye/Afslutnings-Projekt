"use strict";

const sections = [
  { number:"01", shortTitle:"Indhold", title:"Menu og indholdsfortegnelse", icon:"📑", color:"red", shape:"square", text:"Her samles projektets indholdsfortegnelse og overblik over alle afsnit.", resource:{label:"Læs projektgrundlaget",href:"docs/PROJEKTGRUNDLAG.md",format:"markdown"} },
  { number:"02", shortTitle:"Indledning", title:"Indledning", icon:"📘", color:"orange", shape:"round", text:"Min vej fra elektriker til IT-studerende og mine erfaringer med AI.", paragraphs:["Jeg har arbejdet omkring 40 år som elektriker og har derfor en lang praktisk og teknisk baggrund, hvor problemløsning, fejlfinding og forståelse af tekniske systemer har været en naturlig del af mit arbejdsliv. Desværre måtte jeg af helbredsmæssige årsager vælge at omskole mig. Det blev inden for IT og igennem min akademiuddannelse har jeg arbejdet blandt andet med systemdrift, IT-sikkerhed, programmering i Python, cloud, databaser, automatisering, forretningsmæssig IT og anvendelse af kunstig intelligens.","Uddannelsen har været både spændende og krævende. Flere af fagene indeholder meget teori, og en del af undervisningsmaterialet er på engelsk. For mig betyder det meget arbejde med at oversætte og forstå de faglige begreber og omsætte teorien til noget, jeg forstår.","Efter at jeg havde kurset i Anvendelse af kunstig intelligens, begyndte jeg i stigende grad at bruge ChatGPT (AI) som min assistent. I starten var det mest til at oversætte og forklare begreberne i et tempo, som bedre passede til mig. Efterhånden begyndte jeg også at anvende AI til at rette mine opgaver og gennemlæse mine skriftlige opgaver på et mere teknisk niveau.","Jeg har blandt andet i mine senere kurser brugt AI til at hjælpe med programmering som eksempler for de opgaver, jeg skulle løse, eller den har vist mig, hvordan jeg kunne lave normaliserede databaser. Den har hjulpet mig med opsætningen af lokale netværk og med at automatisere processer. Jeg har også brugt AI til sparring til mine skriftlige opgaver, hvor den er kommet med idéer, kritik, struktur og sproglige formuleringer.","Det har vist mig en udvikling, som jeg synes er ret interessant. Opgaver, som tidligere krævede lang tid og faglig fordybelse at løse, kan i dag løses eller understøttes af AI på relativt kort tid. Det gælder for eksempel programmering, databaseopbygning og automatisering.","Men samtidig kan der opstå et dilemma. AI kan være et meget effektivt hjælpemiddel, men det kan også være fristende at overlade en stor del af arbejdet til den slags teknologi. Derfor dukker spørgsmålet op om, hvilke kompetencer der fortsat er brug for eller er nødvendige, når AI i stigende grad kan løse opgaverne, og om det er noget, vi skal være bange for.","Som studerende og med mange års teknisk erfaring og baggrund bliver jeg interesseret i denne udvikling. Hvor jeg tidligere selv skulle løse alle de tekniske udfordringer, føler jeg, at mit fokus er ændret til i højere grad at skulle beskrive det ønskede resultat, opstille krav og kvalitetssikre den løsning, som AI bidrager til at skabe."] },
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
  { number:"14", shortTitle:"Endelig opgave", title:"Eksamen_Afgangsprojekt arbejds udgave", icon:"🏆", color:"gold", shape:"wide", text:"Her åbner du den opdaterede arbejdsudgave direkte og sikkert i OneDrive.", oneDrive:true },
  { number:"+", shortTitle:"Ekstra", title:"Ekstra plads", icon:"✨", color:"sky", shape:"soft", text:"Reserveområde til et nyt afsnit, en funktion eller et dokument, som vi får brug for senere." }
];

const DEFAULT_ONEDRIVE_URL = "https://1drv.ms/w/c/ece7ebdbe34590e4/IQDIPhkvBgsUSad7B1YBEv8rASpACKXzm81zi7SU3ZaeRXo?e=VfPOqe";

const display = document.querySelector("#display");
const displayCase = document.querySelector(".display-case");
const buttons = document.querySelector("#buttons");
const themeButton = document.querySelector("#themeButton");
const backControl = document.querySelector("#backControl");
const modeControl = document.querySelector("#modeControl");
const menuControl = document.querySelector("#menuControl");
let activeSection = null;
let history = [];
let readerOpen = false;

function makeButton(label, className, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.addEventListener("click", handler);
  return button;
}

function renderMenu() {
  buttons.replaceChildren();
  sections.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `toy-button tone-${section.color} shape-${section.shape}`;
    button.setAttribute("aria-label", `Åbn ${section.title}`);
    button.innerHTML = `<span class="number">${section.number}</span><span class="emoji" aria-hidden="true">${section.icon}</span><strong>${section.shortTitle}</strong>`;
    if (section.oneDrive) {
      const badge = document.createElement("span");
      badge.className = "important-badge";
      badge.textContent = "VIGTIG";
      button.append(badge);
    }
    button.addEventListener("click", () => openSection(section));
    buttons.append(button);
  });
}

function openSection(section, remember = true) {
  closeReaderFrame();
  if (remember && activeSection && activeSection.number !== section.number) history.push(activeSection);
  activeSection = section;
  display.replaceChildren();

  const back = makeButton("‹ Tilbage", "screen-back", goBack);
  back.setAttribute("aria-label", "Gå tilbage");

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
  if (section.paragraphs) {
    const article = document.createElement("article");
    article.className = "section-article";
    section.paragraphs.forEach((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      article.append(paragraph);
    });
    content.append(article);
  }

  if (section.resource) {
    const readButton = makeButton(`📖 ${section.resource.label}`, "file-link", () => openDocument(section.resource, section.title));
    content.append(readButton);
  }

  if (section.oneDrive) addOneDriveControls(content);

  const status = document.createElement("span");
  status.className = "content-status";
  status.textContent = section.resource || section.oneDrive ? "Dokumentområde" : "Klar til indhold";
  content.append(status);

  display.append(back, iconElement, kicker, heading, content);
  updateSideControls();
  document.querySelector("#app")?.scrollIntoView({ behavior:"smooth", block:"start" });
}

function addOneDriveControls(container) {
  const url = localStorage.getItem("afgang_onedrive_url") || DEFAULT_ONEDRIVE_URL;
  const openButton = makeButton("🔐 Åbn sikkert i OneDrive", "file-link final-file-link", () => {
    window.open(url, "_blank", "noopener,noreferrer");
  });
  const changeButton = makeButton("Brug et andet OneDrive-link", "link-settings-button", () => showOneDriveLinkSetup(container));
  const note = document.createElement("p");
  note.className = "private-file-note";
  note.textContent = "Dokumentet bliver i OneDrive og åbnes med Microsofts adgangskontrol.";
  container.append(openButton, changeButton, note);
}

function showOneDriveLinkSetup(container) {
  container.querySelector(".onedrive-setup")?.remove();
  const setup = document.createElement("div");
  setup.className = "onedrive-setup";
  const label = document.createElement("label");
  label.htmlFor = "onedriveUrl";
  label.textContent = "Indsæt et andet OneDrive-link på denne enhed:";
  const input = document.createElement("input");
  input.id = "onedriveUrl";
  input.type = "url";
  input.inputMode = "url";
  input.placeholder = "https://1drv.ms/...";
  input.autocomplete = "off";
  const save = makeButton("Gem link på denne enhed", "file-link", () => {
    const value = input.value.trim();
    if (!isAllowedOneDriveUrl(value)) {
      message.textContent = "Indsæt et gyldigt HTTPS-link fra OneDrive eller SharePoint.";
      return;
    }
    localStorage.setItem("afgang_onedrive_url", value);
    openSection(activeSection, false);
  });
  const reset = makeButton("Brug den faste projektfil igen", "link-settings-button", () => {
    localStorage.removeItem("afgang_onedrive_url");
    openSection(activeSection, false);
  });
  const message = document.createElement("p");
  message.className = "input-message";
  message.setAttribute("aria-live", "polite");
  setup.append(label, input, save, reset, message);
  container.append(setup);
}

function isAllowedOneDriveUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return url.protocol === "https:" && (
      host === "1drv.ms" ||
      host === "onedrive.live.com" ||
      host.endsWith(".sharepoint.com")
    );
  } catch {
    return false;
  }
}

async function openDocument(resource, title) {
  readerOpen = true;
  displayCase.classList.add("is-expanded");
  display.classList.add("document-view");
  document.body.classList.add("reader-open");
  display.replaceChildren();

  const toolbar = document.createElement("div");
  toolbar.className = "reader-toolbar";
  const back = makeButton("‹ Tilbage", "reader-back", closeDocument);
  const heading = document.createElement("strong");
  heading.textContent = title;
  const close = makeButton("Luk ✕", "reader-close", closeDocument);
  toolbar.append(back, heading, close);

  const paper = document.createElement("article");
  paper.className = "word-paper";
  paper.setAttribute("aria-live", "polite");
  const loading = document.createElement("p");
  loading.className = "reader-loading";
  loading.textContent = "Henter dokumentet …";
  paper.append(loading);
  display.append(toolbar, paper);
  updateSideControls();

  try {
    const response = await fetch(resource.href, { cache:"no-store" });
    if (!response.ok) throw new Error("Dokumentet kunne ikke hentes");
    const text = await response.text();
    paper.replaceChildren();
    if (resource.format === "markdown") renderMarkdown(text, paper);
    else {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      paper.append(paragraph);
    }
  } catch {
    paper.replaceChildren();
    const error = document.createElement("p");
    error.className = "reader-error";
    error.textContent = "Dokumentet kunne ikke åbnes. Prøv igen senere.";
    paper.append(error);
  }
}

function renderMarkdown(markdown, target) {
  let list = null;
  const finishList = () => { list = null; };
  markdown.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) { finishList(); return; }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      finishList();
      const level = Math.min(headingMatch[1].length + 1, 4);
      const element = document.createElement(`h${level}`);
      element.textContent = headingMatch[2];
      target.append(element);
      return;
    }

    const listMatch = line.match(/^(?:[-*]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const ordered = /^\d+\./.test(line);
      if (!list || list.tagName !== (ordered ? "OL" : "UL")) {
        list = document.createElement(ordered ? "ol" : "ul");
        target.append(list);
      }
      const item = document.createElement("li");
      item.textContent = listMatch[1];
      list.append(item);
      return;
    }

    finishList();
    const paragraph = document.createElement("p");
    paragraph.textContent = line.replace(/^\*\*(.+)\*\*$/, "$1");
    target.append(paragraph);
  });
}

function closeDocument() {
  if (!readerOpen) return;
  const section = activeSection;
  closeReaderFrame();
  if (section) openSection(section, false);
  else showWelcome();
}

function closeReaderFrame() {
  readerOpen = false;
  displayCase.classList.remove("is-expanded");
  display.classList.remove("document-view");
  document.body.classList.remove("reader-open");
}

function showWelcome() {
  closeReaderFrame();
  activeSection = null;
  history = [];
  display.innerHTML = '<button type="button" class="screen-back home-back" disabled aria-disabled="true">‹ Tilbage</button><div class="welcome-icon">✏️</div><p class="kicker">Mit AU-afgangsprojekt</p><h1>Tryk på en knap</h1><p class="lead">Vælg den del af projektet, du vil arbejde med.</p><p class="display-note">Kun rammen er offentlig – dokumenter åbnes sikkert</p>';
  updateSideControls();
}

function goBack() {
  if (readerOpen) { closeDocument(); return; }
  const previous = history.pop();
  if (previous) openSection(previous, false);
  else showWelcome();
}

function updateSideControls() {
  backControl.disabled = !activeSection && !readerOpen;
  backControl.setAttribute("aria-disabled", String(backControl.disabled));
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
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && readerOpen) closeDocument();
});
setTheme(localStorage.getItem("afgang_theme") === "dark" ? "dark" : "light");
renderMenu();
showWelcome();


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
