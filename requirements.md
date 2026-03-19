# ImmoWert Campus — Website-Anforderungen

> **Zweck dieses Dokuments:** Strukturierte Anforderungen für die Umsetzung der ImmoWert Campus Website. Dieses Dokument dient als Single Source of Truth für Claude Code und Entwickler.

---

## 1. Projektziel

Aufbau einer spezialisierten Seminar-Website für den **ImmoWert Campus** mit einer Hauptseite und vier Seminar-Unterseiten. Die Website positioniert sich als fachlich anspruchsvolle, seriöse Plattform für fortgeschrittene Sachverständige in der Immobilienbewertung.

**Kernbotschaft:** „Von Sachverständigen für Sachverständige" — keine Einsteigerformate, sondern fachliche Vertiefung mit Praxisbezug.

---

## 2. Seitenstruktur

| Seite | URL-Slug | Typ |
|-------|----------|-----|
| Startseite | `/` | Hauptseite mit Positionierung, Nutzenversprechen, Seminar-Teasern, CTA |
| Seminar 1 | `/seminare/geld-glueck-und-wahrscheinlichkeiten` | Statistik-Webseminar |
| Seminar 2 | `/seminare/intensivkurs-marktdatenableitung` | 3×1-Tag-Intensivkurs mit Peter Ache |
| Seminar 3 | `/seminare/erbbaurechte-interpretieren-beraten-bewerten` | Spezialwissen Erbbaurechte |
| Seminar 4 | `/seminare/digitalisierung-und-automatisierung-im-sachverstaendigenbuero` | Praxisworkshop mit Patrick Beier |

Zusätzlich: Kontakt-/Anfragefunktion (Formular oder Kontaktbox) auf jeder Seminarseite.

**Navigation:** Startseite · Seminare · Kontakt / Anfrage

---

## 3. Design- und UX-Anforderungen

### 3.1 Tonalität & Gestaltung

- **Tonalität:** sachlich, souverän, kollegial, präzise — nicht marktschreierisch
- **Visuell:** ruhig, professionell, modern, viel Weißraum, klare Typografie-Hierarchie
- **Bildsprache:** seriös-fachlich, keine generischen Stockfotos

### 3.2 UX-Regeln

- Jede Seite braucht einen **klar sichtbaren CTA oberhalb des ersten Scrolls** (above the fold)
- Seminarseiten haben **identischen strukturellen Aufbau** für schnelle Orientierung
- **Mobile:** CTA-Buttons, Ansprechpartner und Formularzugänge müssen sofort sichtbar sein
- Keine Überladung mit Navigationselementen — wenige Seiten, dafür inhaltlich stark
- Seiten müssen **schnell scannbar** sein: Zwischenüberschriften, kurze Absätze, klare Buttons, keine Textwüsten

---

## 4. Seitenspezifikationen

### 4.1 Startseite

#### Hero-Bereich

- **Headline:** „Fortgeschrittene Seminare für Sachverständige in der Immobilienbewertung"
- **Subheadline:** „Von Sachverständigen für Sachverständige. Der ImmoWert Campus steht für Weiterbildung auf fachlich anspruchsvollem Niveau — praxisnah, nachvollziehbar und mit direktem Bezug zum gutachterlichen Alltag."
- **CTA primär:** „Seminare entdecken"
- **CTA sekundär:** „Kontakt aufnehmen"

#### Einführungstext

Positionierung als spezialisiertes Seminarangebot für Sachverständige, Gutachter und fortgeschrittene Praktiker. Keine allgemeinen Grundlagen, sondern vertiefende Themen: Statistik, Marktdaten, Erbbaurechte, Digitalisierung.

#### Section: „Was den ImmoWert Campus auszeichnet"

4 USPs als Aufzählung:
1. Von Praktikern für Praktiker (reale Anforderungen, nicht reine Theorie)
2. Fortgeschrittenes Niveau (Vorkenntnisse vorausgesetzt)
3. Fachliche Tiefe mit Praxisbezug (Methodik, Begründungssicherheit, Anwendbarkeit)
4. Klarheit statt Fachnebel (strukturiert, verständlich, fachlich sauber)

#### Section: „Für wen der ImmoWert Campus gedacht ist"

Zielgruppen-Auflistung:
- Sachverständige für Immobilienbewertung
- Zertifizierte, öbv oder fortgeschritten tätige Bewerter
- Fachleute aus Gutachtenwesen, Bewertung und angrenzenden Bereichen
- Alle, die ihre Bewertungsarbeit methodisch vertiefen wollen

**Hinweisbox:** Keine Einsteigerseminare — wer Grundlagenwissen sucht, ist hier nicht richtig.

#### Section: Seminar-Teaser (4 Kacheln)

Jede Kachel enthält: Titel, kurzer Teasertext, CTA-Button „Mehr erfahren" → verlinkt auf jeweilige Unterseite.

| Kachel | Titel | Teaser-Inhalt |
|--------|-------|---------------|
| 1 | Geld, Glück und Wahrscheinlichkeiten | Statistik, deskriptive Statistik, Regression, KI-Einordnung |
| 2 | Quartals-Intensivkurs Marktdatenableitung | 3×1 Tag mit Peter Ache, Marktdaten-Ableitung & -Anwendung |
| 3 | Erbbaurechte interpretieren, beraten und bewerten | Interpretation, Beratung, Bewertung von Erbbaurechten |
| 4 | Praxisworkshop: Digitalisierung und Automatisierung | Patrick Beier, digitale Workflows, KI, Automatisierung |

#### Abschluss-CTA

- **Headline:** „Fachliche Vertiefung statt Standardprogramm"
- **CTA:** „Jetzt Seminar auswählen"

---

### 4.2 Seminar-Unterseiten — einheitliches Template

Alle vier Seminarseiten folgen dem **gleichen Seitenaufbau**:

```
1. Hero-Bereich (Headline + Subheadline)
2. Einleitung (1–2 Absätze Fließtext)
3. Inhalte / Thematische Schwerpunkte / Praxisfelder (Aufzählung)
4. Lernziele / Nutzen für Teilnehmende (Aufzählung)
5. Zielgruppe (kurzer Absatz)
6. Organisatorisches (Format, Umfang, Referent, Kosten, Buchung)
7. CTA-Bereich (primär + sekundär)
```

---

### 4.3 Seminar 1: Geld, Glück und Wahrscheinlichkeiten

- **Slug:** `/seminare/geld-glueck-und-wahrscheinlichkeiten`
- **Headline:** „Geld, Glück und Wahrscheinlichkeiten"
- **Subheadline:** „Statistik in der Immobilienbewertung — Webseminar für Sachverständige mit Praxisbezug und verständlicher Vermittlung."

**Inhalte:**
- Einführung in Statistik (Anwendungsfelder Wirtschaft, Immobilien, IT, Alltag)
- Grundbegriffe der Wahrscheinlichkeit (Zufallsexperiment, Ereignis, Venn-Diagramme)
- Deskriptive Statistik (Merkmalsarten, Verteilungen, Mittelwerte, Median, Modus, Quantile, Lage-/Streumaße)
- Multivariate Statistik (Streudiagramme, Kovarianz, Korrelation)
- Lineare Regression (Interpretation und Grenzen)
- KI in der Statistikpraxis (ChatGPT: Nutzen, Grenzen, kritische Prüfung)

**Lernziele:**
- Verteilungen beschreiben und Kennzahlen interpretieren
- Geeignete Diagramme erstellen und Aussagekraft beurteilen
- Korrelation/Kovarianz deuten, von Kausalität abgrenzen
- Einfache lineare Regression durchführen und kommunizieren
- KI-Chancen und -Grenzen in datenanalytischen Workflows benennen

**Organisatorisches:**
- Format: Webseminar
- Seminarzeit: 09:00–10:30, 10:45–12:15, 13:15–15:00 Uhr
- Referent: Markus Strebel
- Kosten: 297 € netto, 20 % Nachlass für CESa-Mitglieder, 10 % Early Bird (Buchung ≥30 Tage vorher)
- Buchung: per E-Mail an info@immowert-campus.de

**CTAs:** primär „Jetzt Seminar anfragen" · sekundär „Weitere Seminare ansehen"

---

### 4.4 Seminar 2: Intensivkurs Marktdatenableitung

- **Slug:** `/seminare/intensivkurs-marktdatenableitung`
- **Headline:** „Intensivkurs Marktdatenableitung"
- **Subheadline:** „3 × 1 Tag mit Peter Ache — für Sachverständige, die Marktdaten methodisch sicher ableiten und belastbar anwenden wollen."

**Nutzen für Teilnehmende:**
- Mehr Sicherheit bei Herleitung und Plausibilisierung von Marktdaten
- Besseres Verständnis für Grenzen und Aussagekraft vorhandener Daten
- Sicherere Argumentation in Gutachten, gegenüber Auftraggebern, Gerichten und Marktteilnehmern

**Inhaltsblöcke:**
- Systematische Sichtung und Strukturierung von Kaufpreisdaten
- Ableitung relevanter Marktdaten für verschiedene Teilmärkte und Nutzungsarten
- Plausibilisierung, Streuung, Ausreißer, Umgang mit Datenunsicherheit
- Transfer in belastbare Bewertungsansätze und Gutachtenargumentation
- Praxisdiskussion an konkreten Fallkonstellationen

**Zielgruppe:** Fortgeschrittene Sachverständige mit Marktdaten-Erfahrung.

**Organisatorisches:**
- Format: Intensivkurs (3 Seminartage à 1 Tag über 3 Monate)
- Referent: Peter Ache
- ⚠️ Termin- und Buchungsdetails noch offen

**CTAs:** primär „Termin anfragen" · sekundär „Zur Übersicht"

---

### 4.5 Seminar 3: Erbbaurechte interpretieren, beraten und bewerten

- **Slug:** `/seminare/erbbaurechte-interpretieren-beraten-bewerten`
- **Headline:** „Erbbaurechte interpretieren, beraten und bewerten"
- **Subheadline:** „Spezialwissen für anspruchsvolle Bewertungsfälle — für Sachverständige, die bei Erbbaurechten tiefer verstehen und sicherer begründen wollen."

**Thematische Schwerpunkte:**
- Aufbau und typische Inhalte von Erbbaurechtsverträgen
- Bewertungsrelevante Vertragsbestandteile und deren Einordnung
- Wertbeeinflussungen durch Laufzeit, Erbbauzins, Anpassungsklauseln, Heimfallregelungen
- Beratungsrelevante Fragestellungen für Eigentümer, Erwerber und weitere Beteiligte
- Saubere Herleitung und verständliche Begründung im Gutachten

**Nutzen für Teilnehmende:**
- Mehr Sicherheit beim Lesen/Verstehen komplexer Vertragskonstellationen
- Bessere Verbindung von rechtlicher Struktur und wirtschaftlicher Bewertung
- Stärkere Beratungskompetenz in anspruchsvollen Fällen

**Zielgruppe:** Sachverständige und fortgeschrittene Praktiker.

**Organisatorisches:**
- ⚠️ Referent: noch offen (Hinweis auf Website: „wird in Kürze bekannt gegeben")
- ⚠️ Termin- und Preisangaben: noch offen

**CTAs:** primär „Interesse vormerken" · sekundär „Kontakt aufnehmen"

---

### 4.6 Seminar 4: Praxisworkshop Digitalisierung und Automatisierung

- **Slug:** `/seminare/digitalisierung-und-automatisierung-im-sachverstaendigenbuero`
- **Headline:** „Praxisworkshop: Digitalisierung und Automatisierung im Sachverständigenbüro"
- **Subheadline:** „Praxisnaher Workshop mit Patrick Beier — für Büros, die Prozesse vereinfachen, Medienbrüche reduzieren und Qualität mit digitalen Werkzeugen absichern wollen."

**Praxisfelder:**
- Standardisierte Abläufe (Auftragsannahme, Datenerfassung, Wiedervorlagen, Berichtserstellung)
- Digitale Vorlagen und Bausteine für wiederkehrende Arbeitsschritte
- Wissensmanagement für Gutachten, Recherchen, Quellen, interne Standards
- Sinnvoller KI-Einsatz in Recherche, Kommunikation, Strukturierung, Dokumentation
- Automatisierungspotenziale: weniger manuelle Reibung, mehr Qualität und Zeitgewinn

**Nutzen für Teilnehmende:**
- Konkrete Impulse fürs eigene Büro statt abstrakter Digitalisierungsparolen
- Mehr Produktivität durch bessere Prozesse
- Bessere Skalierbarkeit ohne Qualitätsverlust

**Zielgruppe:** Sachverständige und Büroinhaber.

**Organisatorisches:**
- Format: Praxisworkshop
- Referent: Patrick Beier
- ⚠️ Termin- und Preisangaben: noch offen

**CTAs:** primär „Workshop anfragen" · sekundär „Weitere Seminare ansehen"

---

## 5. Technische Anforderungen

### 5.1 CTA-Verhalten
- Jede Seminarseite: fester Anfragebutton **above the fold**
- Startseite: Seminar-Teaser als **klickbare Kacheln** mit Teasertext und Button
- Jede Unterseite: einheitliche Kontakt-Sektion am Seitenende (E-Mail, ggf. Telefon, Anfrageformular)

### 5.2 Platzhalter-Handling
- Bei fehlenden Angaben (Termin, Referent, Preis) sauber mit **Platzhaltern** arbeiten, nicht mit Leerstellen
- Beispiel: „Termin wird in Kürze bekannt gegeben" statt leeres Feld

### 5.3 SEO
- Klare, sprechende Seitentitel
- Meta-Descriptions pro Seite
- Sprechende URL-Slugs (siehe Seitenstruktur oben)

### 5.4 Responsiveness
- Mobile-first: CTAs, Kontaktdaten und Formulare sofort sichtbar
- Schnell scannbare Struktur: Zwischenüberschriften, kurze Absätze, klare Buttons

---

## 6. Offene Punkte (vor Livegang zu klären)

- [ ] Termine, Preise und Buchungslogik für alle Seminare finalisieren
- [ ] Referent für Seminar 3 (Erbbaurechte) festlegen
- [ ] Buchungsmodus entscheiden: Formular, E-Mail oder externes Tool
- [ ] Bildsprache abstimmen (seriös-fachlich)
- [ ] Impressum, Datenschutz, Kontaktangaben und rechtliche Pflichtseiten ergänzen

---

## 7. Kontaktdaten

- **E-Mail:** info@immowert-campus.de
