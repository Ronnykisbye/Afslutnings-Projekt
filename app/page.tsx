"use client";

import {
  Archive, BarChart3, BookOpenText, BrainCircuit, CheckCircle2, ChevronLeft,
  ClipboardList, Compass, FileCheck2, FileStack, FlaskConical, FolderArchive,
  HelpCircle, Lightbulb, ListTree, LockKeyhole, Menu, Moon, PencilRuler,
  SearchCheck, ShieldCheck, Sparkles, Sun, Target, X, type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Status = "not-started" | "working" | "done";
type ProjectSection = {
  id: string; number: string; title: string; shortTitle: string; description: string;
  guidance: string[]; color: string; icon: LucideIcon; reserved?: boolean;
};

const sections: ProjectSection[] = [
  { id: "plan", number: "01", title: "Planlægning og projektstyring", shortTitle: "Planlægning", description: "Tidsplan, milepæle, aftaler og løbende beslutninger.", guidance: ["Lav en foreløbig plan tidligt.", "Juster planen, når projektet udvikler sig.", "Gem vigtige valg og begrundelser undervejs."], color: "cyan", icon: ClipboardList },
  { id: "introduction", number: "02", title: "Indledning", shortTitle: "Indledning", description: "Motivation, baggrund og optakt til projektets problem.", guidance: ["Forklar hvorfor emnet er aktuelt og fagligt vigtigt.", "Præsenter den situation eller case, projektet udspringer af.", "Led læseren naturligt frem mod problemstillingen."], color: "blue", icon: BookOpenText },
  { id: "problem", number: "03", title: "Problemstilling", shortTitle: "Problemstilling", description: "Det fagligt væsentlige problem, som projektet undersøger.", guidance: ["Beskriv problemet før du foreslår løsningen.", "Dokumentér hvorfor problemet er relevant.", "Hold rå idéer adskilt fra dokumenterede fund."], color: "violet", icon: SearchCheck },
  { id: "research-question", number: "04", title: "Problemformulering", shortTitle: "Problemformulering", description: "Hovedspørgsmålet og eventuelt op til tre underspørgsmål.", guidance: ["Formulér et spørgsmål, der faktisk kan besvares.", "Afgræns formuleringen til et realistisk projekt.", "Konklusionen skal senere svare direkte på spørgsmålet."], color: "pink", icon: Target },
  { id: "scope", number: "05", title: "Afgrænsning og definitioner", shortTitle: "Afgrænsning", description: "Hvad projektet undersøger – og hvad det bevidst udelader.", guidance: ["Forklar til- og fravalg tydeligt.", "Definér særlige fagbegreber, når det er nødvendigt.", "Prioritér dybde frem for at dække for mange fag."], color: "orange", icon: ListTree },
  { id: "method", number: "06", title: "Metode", shortTitle: "Metode", description: "Undersøgelsesdesign, fremgangsmåde og kildekritik.", guidance: ["Begrund valget af metode.", "Beskriv hvordan empiri indsamles og vurderes.", "Dokumentér ændringer i metoden undervejs."], color: "yellow", icon: FlaskConical },
  { id: "theory-data", number: "07", title: "Teori og empiri", shortTitle: "Teori & empiri", description: "Faglige teorier, kilder, egne forsøg og indsamlede data.", guidance: ["Vælg teori, der hjælper med at besvare problemformuleringen.", "Gør egne forsøg gennemsigtige og efterprøvelige.", "Gem prompts, svar, versioner, kriterier og resultater."], color: "lime", icon: BrainCircuit },
  { id: "analysis", number: "08", title: "Analyse", shortTitle: "Analyse", description: "Teori og praksis kobles, så der skabes ny indsigt.", guidance: ["Sammenhold empiri med teori og faglig viden.", "Vurder fejl, begrænsninger og alternative forklaringer.", "Undgå kun at beskrive – analysér hvad resultaterne betyder."], color: "green", icon: BarChart3 },
  { id: "solution", number: "09", title: "Løsningsforslag og implementering", shortTitle: "Løsningsforslag", description: "Strategi, prototype eller løsning, når det er relevant.", guidance: ["Knyt løsningen til analysens fund.", "Begrund tekniske og designmæssige valg fagligt.", "Beskriv funktionelle og ikke-funktionelle krav."], color: "teal", icon: PencilRuler },
  { id: "conclusion", number: "10", title: "Konklusion", shortTitle: "Konklusion", description: "Det tydelige svar på problemformuleringen.", guidance: ["Svar direkte på hoved- og underspørgsmål.", "Byg kun på resultater fra analysen.", "Introducér ikke nyt stof i konklusionen."], color: "emerald", icon: CheckCircle2 },
  { id: "perspective", number: "11", title: "Perspektivering og refleksion", shortTitle: "Perspektivering", description: "Videre perspektiver, læring og fremtidige handlemuligheder.", guidance: ["Byg videre på projektets resultater.", "Vurdér styrker, svagheder og begrænsninger.", "Beskriv relevant videreudvikling eller anvendelse."], color: "sky", icon: Compass },
  { id: "sources", number: "12", title: "Kilder og litteraturliste", shortTitle: "Kilder", description: "Officielle krav, teori, dokumentation og øvrige kilder.", guidance: ["Brug gældende studieordning som øverste kilde.", "Kontrollér kildernes troværdighed og aktualitet.", "Hold en ensartet referenceform gennem hele rapporten."], color: "indigo", icon: FileStack },
  { id: "appendices", number: "13", title: "Bilag", shortTitle: "Bilag", description: "Forsøgsdata, prompts, kode, skærmbilleder og dokumentation.", guidance: ["Nummerér og navngiv bilag tydeligt.", "Henvis til hvert relevant bilag fra rapporten.", "Undgå persondata, adgangskoder og andre hemmeligheder."], color: "purple", icon: FolderArchive },
  { id: "final-report", number: "14", title: "Den endelige projektopgave", shortTitle: "Endelig opgave", description: "Den samlede, kvalitetssikrede og afleveringsklare rapport.", guidance: ["Kontrollér den røde tråd fra problem til konklusion.", "Tjek formalia, kilder, bilag, sprog og layout.", "Gem kun den godkendte afleveringsversion her."], color: "gold", icon: FileCheck2 },
  { id: "reserve", number: "+", title: "Ekstra plads", shortTitle: "Ekstra knap", description: "Klar til et nyt afsnit eller værktøj, vi finder på senere.", guidance: ["Denne plads er bevidst reserveret.", "Navn og funktion besluttes senere.", "Eksisterende struktur ændres ikke, før behovet er klart."], color: "slate", icon: Sparkles, reserved: true },
];

const statusLabels: Record<Status, string> = {
  "not-started": "Ikke startet", working: "I gang", done: "Færdig",
};

export default function Home() {
  const [selected, setSelected] = useState<ProjectSection | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("afgang_theme");
    const savedStatuses = window.localStorage.getItem("afgang_statuses");
    const restore = window.setTimeout(() => {
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
      if (savedStatuses) {
        try { setStatuses(JSON.parse(savedStatuses)); }
        catch { window.localStorage.removeItem("afgang_statuses"); }
      }
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("afgang_theme", theme);
  }, [theme]);

  const completed = useMemo(
    () => sections.filter((section) => !section.reserved && statuses[section.id] === "done").length,
    [statuses],
  );
  const total = sections.filter((section) => !section.reserved).length;
  const progress = Math.round((completed / total) * 100);

  function updateStatus(id: string, status: Status) {
    const next = { ...statuses, [id]: status };
    setStatuses(next);
    window.localStorage.setItem("afgang_statuses", JSON.stringify(next));
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Gå til toppen">
          <span className="brand-mark"><Archive size={22} /></span>
          <span><strong>Mit afgangsprojekt</strong><small>AU · Informationsteknologi</small></span>
        </a>
        <nav className={menuOpen ? "topnav is-open" : "topnav"} aria-label="Hovedmenu">
          <a href="#projekt" onClick={() => setMenuOpen(false)}>Projekt</a>
          <a href="#status" onClick={() => setMenuOpen(false)}>Status</a>
          <a href="#sikkerhed" onClick={() => setMenuOpen(false)}>Sikkerhed</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? "Skift til lyst tema" : "Skift til mørkt tema"}>
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Åbn menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15} /> Projektværksted 2026</p>
          <h1>Byg opgaven<br /><span>ét tryk ad gangen.</span></h1>
          <p className="hero-text">Dit private arbejdsrum til at samle idéer, metode, analyse, bilag og den endelige AU-projektopgave.</p>
          <div className="hero-actions">
            <a className="primary-action" href="#projekt">Åbn projektet</a>
            <span className="privacy-note"><LockKeyhole size={17} /> Privat adgang</span>
          </div>
        </div>
        <div className="progress-orb" id="status" aria-label={`${progress} procent færdig`}>
          <div className="orb-ring" style={{ "--progress": `${progress * 3.6}deg` } as React.CSSProperties}>
            <div className="orb-core"><span>{progress}%</span><small>samlet status</small></div>
          </div>
          <p>{completed} af {total} dele markeret færdige</p>
        </div>
      </section>

      <section className="project-section" id="projekt">
        <div className="section-heading">
          <div><p className="eyebrow"><Lightbulb size={15} /> Projektets byggeklodser</p><h2>Vælg et område</h2></div>
          <p>Tryk på en 3D-knap for at åbne området. Din status gemmes kun på din egen enhed.</p>
        </div>
        <div className="project-grid">
          {sections.map((section) => {
            const Icon = section.icon;
            const status = statuses[section.id] ?? "not-started";
            return (
              <button type="button" className={`project-card tone-${section.color}${section.reserved ? " reserved" : ""}`} key={section.id} onClick={() => setSelected(section)} aria-label={`Åbn ${section.title}. Status: ${statusLabels[status]}`}>
                <span className="card-number">{section.number}</span>
                <span className="card-icon"><Icon size={27} strokeWidth={2.2} /></span>
                <span className="card-copy"><strong>{section.shortTitle}</strong><small>{section.description}</small></span>
                {!section.reserved && <span className={`status-dot status-${status}`}>{statusLabels[status]}</span>}
              </button>
            );
          })}
        </div>
      </section>

      <section className="security-panel" id="sikkerhed">
        <div className="security-icon"><ShieldCheck size={29} /></div>
        <div><p className="eyebrow">Sikkerhed fra starten</p><h2>Projektet er bygget som et privat arbejdsrum</h2><p>Ingen annoncer, sporing eller tredjepartsanalyse. Hemmeligheder og følsomme personoplysninger skal aldrig lægges i rapportfiler eller bilag.</p></div>
        <span className="security-badge"><LockKeyhole size={16} /> Beskyttet</span>
      </section>
      <footer><span>Mit AU-afgangsprojekt</span><span>Version 0.1 · Første prototype</span></footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <section className={`detail-modal tone-${selected.color}`} role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-topline">
              <button className="back-button" type="button" onClick={() => setSelected(null)}><ChevronLeft size={18} /> Tilbage</button>
              <span className="modal-number">{selected.number}</span>
            </div>
            <div className="modal-title-row"><span className="modal-icon"><selected.icon size={30} /></span><div><p className="eyebrow">Projektområde</p><h2 id="detail-title">{selected.title}</h2></div></div>
            <p className="modal-lead">{selected.description}</p>
            <div className="guidance-box"><h3><HelpCircle size={18} /> Husk dette</h3><ul>{selected.guidance.map((item) => <li key={item}>{item}</li>)}</ul></div>
            {selected.reserved ? (
              <div className="empty-state"><Sparkles size={22} /><span>Pladsen er klar, når vi får den næste gode idé.</span></div>
            ) : (
              <div className="status-controls">
                <span>Min status</span>
                <div role="group" aria-label={`Status for ${selected.title}`}>
                  {(Object.keys(statusLabels) as Status[]).map((status) => (
                    <button type="button" key={status} className={(statuses[selected.id] ?? "not-started") === status ? "active" : ""} onClick={() => updateStatus(selected.id, status)}>{statusLabels[status]}</button>
                  ))}
                </div>
              </div>
            )}
            <p className="coming-note">Indhold og filer bliver koblet på dette område, efterhånden som projektet vokser.</p>
          </section>
        </div>
      )}
    </main>
  );
}
