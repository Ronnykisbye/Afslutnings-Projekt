# Sikkerhedspolitik

## Privat projekt

Repositoryet og den kørende app indeholder skolearbejde og skal behandles som privat materiale. Adgang gives kun gennem den valgte hostingplatforms adgangskontrol.

## Må aldrig commits

- passwords, adgangskoder og API-nøgler
- GitHub- eller hostingtokens
- CPR-numre og andre følsomme personoplysninger
- private adresser, dørkoder eller betalingsoplysninger
- materiale, som Ronny ikke har ret til at dele

Brug lokale miljøfiler og GitHub Secrets til eventuelle fremtidige hemmeligheder. Miljøfiler er ignoreret af Git.

## Automatiske kontroller

Pull Requests kontrolleres med build, test, dependency review og CodeQL. Dependabot holder GitHub Actions og npm-afhængigheder opdateret.

## Rapportfiler og bilag

Kontrollér altid dokumenter og bilag for persondata, skjult metadata og hemmeligheder før upload. Anonymisér interviewpersoner og andre deltagere, når projektets metode kræver det.

## Fund af en sikkerhedsfejl

Opret ikke et offentligt issue med følsomme detaljer. Kontakt repositoryejeren privat og beskriv problemet, den berørte del og en sikker måde at genskabe det på.
