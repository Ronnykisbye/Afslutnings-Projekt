"use client";

import {
  Archive,
  BarChart3,
  BookOpen,
  BookText,
  BrainCircuit,
  ChevronLeft,
  CircleHelp,
  ClipboardList,
  Compass,
  FileCheck2,
  FileStack,
  FlaskConical,
  FolderArchive,
  Home,
  Lightbulb,
  ListTree,
  LockKeyhole,
  Menu,
  Moon,
  PencilRuler,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

type Section = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  color: string;
  shape: "round" | "square" | "soft" | "wide";
  icon: LucideIcon;
};

const sections: Section[] = [
  { id: "menu", number: "01", title: "Menu og indholdsfortegnelse", shortTitle: "Indhold", color: "red", shape: "square", icon: ListTree },
  { id: "introduction", number: "02", title: "Indledning", shortTitle: "Indledning", color: "orange", shape: "round", icon: BookOpen },
  { id: "problem", number: "03", title: "Problemstilling", shortTitle: "Problem", color: "yellow", shape: "soft", icon: SearchCheck },
  { id: "question", number: "04", title: "Problemformulering", shortTitle: "Spørgsmål", color: "green", shape: "square", icon: Target },
  { id: "method", number: "05", title: "Metodevalg og undersøgelsesdesign", shortTitle: "Metodevalg", color: "cyan", shape: "wide", icon: FlaskConical },
  { id: "theory", number: "06", title: "Teori og modeller", shortTitle: "Teori", color: "blue", shape: "round", icon: BrainCircuit },
  { id: "data", number: "07", title: "Empiriske data", shortTitle: "Empiri", color: "purple", shape: "soft", icon: ClipboardList },
  { id: "analysis", number: "08", title: "Analyse", shortTitle: "Analyse", color: "pink", shape: "square", icon: BarChart3 },
  { id: "critical", number: "09", title: "Kritiske overvejelser", shortTitle: "Kritik", color: "amber", shape: "round", icon: CircleHelp },
  { id: "conclusion", number: "10", title: "Konklusion", shortTitle: "Konklusion", color: "lime", shape: "wide", icon: FileCheck2 },
  { id: "perspective", number: "11", title: "Perspektivering", shortTitle: "Perspektiv", color: "teal", shape: "soft", icon: Compass },
  { id: "sources", number: "12", title: "Litteraturliste", shortTitle: "Kilder", color: "indigo", shape: "square", icon: BookText },
  { id: "appendices", number: "13", title: "Bilagsoversigt", shortTitle: "Bilag", color: "violet", shape: "round", icon: FolderArchive },
  { id: "final", number: "14", title: "Den endelige projektopgave", shortTitle: "Endelig opgave", color: "gold", shape: "wide", icon: FileStack },
  { id: "extra", number: "+", title: "Ekstra plads", shortTitle: "Ekstra", color: "sky", shape: "soft", icon: Sparkles },
];

export default function Home() {
  const [active, setActive] = useState<Section | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("afgang_theme");
    const restore = window.setTimeout(() => {
      if (saved === "light" || saved === "dark") setTheme(saved);
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("afgang_theme", theme);
  }, [theme]);

  return (
    <main className="playroom">
      <div className="bubble bubble-one" />
      <div className="bubble bubble-two" />

      <header className="mini-header">
        <a href="#app" className="mini-brand">
          <Archive size={21} />
          <span>AU Afgangsprojekt</span>
        </a>
        <div className="mini-actions">
          <span className="private-pill"><LockKeyhole size={15} /> Privat</span>
          <button
            type="button"
            className="theme-button"
            aria-label={theme === "light" ? "Skift til mørkt tema" : "Skift til lyst tema"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </button>
        </div>
      </header>

      <section className="toy-console" id="app" aria-label="Mit afgangsprojekt">
        <div className="screen-shell">
          <span className="screen-screw screw-left" />
          <span className="screen-screw screw-right" />
          <div className="screen">
            {!active ? (
              <div className="screen-home">
                <div className="screen-mascot"><PencilRuler size={43} /></div>
                <div>
                  <p className="screen-kicker">Mit AU-afgangsprojekt</p>
                  <h1>Tryk på en knap</h1>
                  <p>Vælg den del af projektet, du vil arbejde med.</p>
                </div>
                <div className="screen-status"><ShieldCheck size={18} /><span>Rammen er klar · indhold tilføjes senere</span></div>
              </div>
            ) : (
              <div className="section-screen">
                <button type="button" className="screen-back" onClick={() => setActive(null)}>
                  <ChevronLeft size={19} /> Menu
                </button>
                <div className={`screen-section-icon tone-${active.color}`}><active.icon size={42} /></div>
                <p className="screen-kicker">Afsnit {active.number}</p>
                <h1>{active.title}</h1>
                <div className="empty-paper">
                  <span className="paper-line long" />
                  <span className="paper-line" />
                  <span className="paper-line short" />
                  <p>Tom ramme – teksten indsættes senere</p>
                </div>
              </div>
            )}
          </div>
          <div className="screen-side-buttons" aria-hidden="true">
            <span><Home size={18} /></span>
            <span><Lightbulb size={18} /></span>
            <span><Menu size={18} /></span>
          </div>
        </div>

        <div className="hinge"><span /><span /><span /></div>

        <div className="control-deck">
          <div className="speaker" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
          </div>
          <div className="button-grid">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  type="button"
                  className={`toy-button tone-${section.color} shape-${section.shape}${active?.id === section.id ? " is-active" : ""}`}
                  onClick={() => {
                    setActive(section);
                    document.getElementById("app")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  aria-label={`Åbn ${section.title}`}
                >
                  <span className="button-number">{section.number}</span>
                  <Icon size={27} strokeWidth={2.4} />
                  <strong>{section.shortTitle}</strong>
                </button>
              );
            })}
          </div>
          <div className="toy-dial" aria-hidden="true"><span /></div>
        </div>
      </section>

      <section className="frame-note">
        <ShieldCheck size={24} />
        <div>
          <strong>Kun rammen er lagt ind</strong>
          <p>Overskrifterne kommer fra Afgangsprojekt V1. Teksten i dokumentets afsnit er ikke overført til appen.</p>
        </div>
      </section>

      <footer>
        <span>Mit AU-afgangsprojekt · Version 0.2</span>
        <span>Design inspireret af et elektronisk læringsspil</span>
      </footer>
    </main>
  );
}
