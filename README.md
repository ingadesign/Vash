# Vash

Gestionale personale per studio, lavoro e associazione: attività, agenda, fatture, scontrini, conti e un assistente.

Questo repository contiene **solo il programma**. I dati di chi lo usa restano in una cartella sul suo computer e non passano mai da qui.

## Pubblicarlo con GitHub Pages

1. Carica tutti i file di questa cartella nel repository (Add file → Upload files).
2. Settings → Pages → *Deploy from a branch* → branch `main`, cartella `/ (root)` → Save.
3. Dopo un paio di minuti è online su `https://<tuo-utente>.github.io/<nome-repository>/`.

## Usarlo

- Aprilo con **Chrome** o **Edge** (Safari e Firefox non possono salvare in una cartella).
- Al primo avvio scegli la cartella dove tenere i dati, per esempio `Documenti/Vash` o una cartella dentro Google Drive o iCloud.
- Per averlo come app: pulsante «installa come app» in alto, o l'icona di installazione nella barra degli indirizzi.
- L'assistente si configura in *quadro → assistente*: chiave API di Anthropic oppure Ollama sul computer. La chiave resta nel browser.

## Pubblicare un aggiornamento

1. Sostituisci `index.html`.
2. In `index.html` aumenta `APP_VERSION` (es. `1.0.0` → `1.1.0`).
3. In `version.json` metti la stessa versione e una nota breve: chi ha Vash aperto vedrà l'avviso «c'è una nuova versione».

Non caricare mai qui la cartella dei dati, i backup o la chiave API: il `.gitignore` lo impedisce per i nomi standard.
