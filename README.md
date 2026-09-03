# Mit AU-afgangsprojekt

Offentlig projektapp til Ronnys AU-afgangsprojekt i informationsteknologi. Appen viser rapportens dele som store, farverige og taktile 3D-knapper inspireret af et elektronisk læringsspil.

## Start appen

**https://ronnykisbye.github.io/Afslutnings-Projekt/**

## Version 0.3

- 15 interaktive projektknapper
- knapper til bilag, endelig opgave og ekstra plads
- tydelig blank 3D-effekt og fysisk trykbevægelse
- mørkt og lyst tema
- responsivt layout til mobil, tablet og computer
- det øverste display viser indholdet for den valgte projektknap\n- tre aktive sideknapper: Tilbage, L/M og Menu\n- dokumentlinks vises kun, når filen må ligge offentligt\n- automatisk udgivelse med GitHub Pages
- ingen annoncer, sporing eller tredjepartsanalyse

Den offentlige version indeholder kun projektets ramme og overskrifter. Den egentlige rapporttekst tilføjes ikke offentligt uden Ronnys udtrykkelige godkendelse.

## Projektets områder

1. Indhold og indholdsfortegnelse
2. Indledning
3. Problemstilling
4. Problemformulering
5. Metodevalg og undersøgelsesdesign
6. Teori og modeller
7. Empiriske data
8. Analyse
9. Kritiske overvejelser
10. Konklusion
11. Perspektivering
12. Litteraturliste
13. Bilag
14. Den endelige projektopgave
15. Ekstra plads

## Teknisk opbygning

GitHub Pages-versionen bruger almindelig HTML, CSS og JavaScript:

- `index.html` – appens struktur
- `style.css` – farver, layout og 3D-effekter
- `app.js` – knapper og interaktion
- `.github/workflows/pages.yml` – automatisk udgivelse
- `MASTERPROMPT.md` – fast arbejdsinstruks
- `SECURITY.md` – sikkerhedsregler

Repositoryet indeholder også en mere avanceret React/TypeScript-version til eventuel senere privat hosting.

## Arbejdsgang

1. Undersøg de eksisterende filer.
2. Bevar funktioner, der allerede virker.
3. Opdater app, README og MASTERPROMPT sammen.
4. Kontrollér, at der ikke findes hemmelige oplysninger.
5. Test ændringerne.
6. Udgiv via GitHub Pages.

## Sikkerhed

- Koden og GitHub Pages-appen er offentligt tilgængelige.
- Kun repositoryets ejer og godkendte samarbejdspartnere kan redigere.
- API-nøgler, passwords, tokens og personfølsomme oplysninger må aldrig lægges i browserkode eller commits.
- Fremtidige API-kald skal gå gennem en serverfunktion, hvor nøglen ligger som en beskyttet miljøvariabel.
- GitHub Secrets må kun bruges under workflows eller serverbaseret udgivelse; de må aldrig bygges ind i offentlige JavaScript-filer.
- Hvis en hemmelig nøgle ved en fejl bliver committed, skal den straks tilbagekaldes og udskiftes.
- Se `SECURITY.md` for flere regler.

## Status

Version 0.3 – offentlig GitHub Pages-app med forbedrede legetøjsagtige 3D-knapper. Kun rammen fra Afgangsprojekt V1 er med; rapportens afsnitstekster er ikke offentliggjort.


## Visning og dokumentlinks

Når en projektknap vælges, viser skærmen afsnittets titel, forklaring, status og eventuelle dokumentlinks. Sideknapperne bruges til Tilbage, L/M (lyst/mørkt tema) og Menu. Den fundne arbejdsfil `Eksamen_Afgangsprojekt_v1.docx` ligger fortsat privat og er derfor ikke lagt i det offentlige repository.
