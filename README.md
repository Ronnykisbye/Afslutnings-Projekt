# Mit AU-afgangsprojekt

Privat arbejdsapp til Ronnys AU-afgangsprojekt i informationsteknologi. Appen gør rapportens dele til store, taktile 3D-knapper og giver et enkelt overblik over fremdriften.

## Første version

- 15 interaktive projektknapper, inklusive bilag, den endelige opgave og en reserveknap
- vejledning til hvert rapportafsnit baseret på projektets samlede arbejdsgrundlag
- lokal status: **Ikke startet**, **I gang** eller **Færdig**
- samlet fremdriftsmåler
- mørkt og lyst tema
- responsivt layout til mobil, tablet og computer
- privat Sites-udgivelse med adgangskontrol
- ingen annoncer, sporing eller tredjepartsanalyse

Status og temavalg gemmes lokalt i browseren. Rapportens egentlige tekst og filer lægges senere ind i repositoryet og versionsstyres.

## Projektets områder

1. Planlægning og projektstyring
2. Indledning
3. Problemstilling
4. Problemformulering
5. Afgrænsning og definitioner
6. Metode
7. Teori og empiri
8. Analyse
9. Løsningsforslag og implementering
10. Konklusion
11. Perspektivering og refleksion
12. Kilder og litteraturliste
13. Bilag
14. Den endelige projektopgave
15. Ekstra plads

## Udvikling

Projektet bruger React, TypeScript, Vinext/Vite og Cloudflare Workers. De vigtigste kommandoer er npm run install:ci, npm run build og npm test.

## Arbejdsgang

1. Opret en særskilt feature-branch til større ændringer.
2. Opdater app, README og MASTERPROMPT.md sammen.
3. Kør build og test.
4. Opret Pull Request.
5. Merge først efter grønne sikkerheds- og kvalitetskontroller.

## Sikkerhed og privatliv

- Repositoryet skal forblive **private**.
- Appen må ikke udgives med almindelig offentlig GitHub Pages.
- Adgang til den kørende app styres af den private hostingløsning.
- API-nøgler, passwords, tokens, personnumre og fortrolige oplysninger må aldrig commits.
- Brug GitHub Secrets til eventuelle fremtidige hemmeligheder.
- Se SECURITY.md for flere regler.

## Centrale filer

- app/page.tsx – indhold, knapper og interaktion
- app/globals.css – samlet design, tema og 3D-effekter
- MASTERPROMPT.md – fast arbejdsinstruks for den videre udvikling
- docs/PROJEKTGRUNDLAG.md – kondenseret faglig arbejdsramme
- .github/workflows – automatiske build- og sikkerhedskontroller

## GitHub Pages-version

Filerne index.html, style.css og app.js udgør en statisk version, der kan køre direkte med GitHub Pages. GitHub Pages må først aktiveres efter en bevidst beslutning, fordi Pages-adressen bliver offentligt tilgængelig, selv når repositoryet er privat.

## Status

Version 0.2 – rammen fra Afgangsprojekt V1 og nyt design som elektronisk læringsspil. Teksten i rapportafsnittene er ikke overført.
