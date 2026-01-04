---
name: Project Info Document
overview: "Creare un documento completo PROJECT_INFO.md che raccoglie tutte le informazioni del progetto: requisiti, stack tecnologico, architettura, funzionalità, struttura file e configurazioni."
todos: []
---

# Create PROJECT_INFO.md - Complete

Project Documentation

## File to Create

- `PROJECT_INFO.md` - Documento completo con tutte le informazioni del progetto

## Content Structure

### 1. Project Overview

- Descrizione del progetto: sistema general purpose per convertire file MD in sito web
- Obiettivo: creare automaticamente un sito web da file Markdown in cartella predefinita
- Caratteristiche principali

### 2. Requirements & Features

- Hot reload dinamico (no build statica)
- Nessun frontmatter YAML (titoli estratti dal primo #)
- Homepage con elenco cliccabile dei file MD
- Sidebar fissa a sinistra con navigazione
- Syntax highlighting per code blocks
- Rendering tabelle Markdown
- Pannello formattazione (font, dimensione testo)
- Design responsivo

### 3. Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown Processing**:
- react-markdown
- remark-gfm@3.0.1 (tabelle)
- rehype-pretty-code (syntax highlighting)
- remark-slug (anchor links)
- **File System**:
- chokidar (hot reload)
- fs-extra
- glob
- **State Management**: React Context API
- **Storage**: localStorage (preferenze formattazione)

### 4. Architecture

- Struttura cartelle
- Flusso dati (file MD → API → React components)
- Hot reload mechanism
- Context providers

### 5. Project Structure

```javascript
MD_Contents/          # Cartella input file MD
app/                  # Next.js App Router
  layout.tsx          # Layout principale con sidebar
  page.tsx            # Homepage
  [slug]/page.tsx     # Pagine dinamiche MD
  api/                # API routes per hot reload
contexts/             # React Context (FormatContext)
components/           # Componenti React
lib/                  # Utility functions
```



### 6. Key Components

- FormatContext: gestione preferenze formattazione
- FormatPanel: pannello UI per formattazione
- MarkdownContent: renderer markdown con syntax highlighting
- Sidebar: navigazione fissa
- FileList: lista file homepage

### 7. API Routes

- `/api/markdown/list` - Lista file MD
- `/api/markdown/[slug]` - Contenuto file MD
- `/api/watch` (opzionale) - WebSocket/SSE per hot reload

### 8. Configuration Files

- package.json dependencies
- tailwind.config.js
- tsconfig.json
- next.config.js

### 9. Features Details

- Estrazione titolo: primo # nel file
- Syntax highlighting: Shiki engine, tema github-dark
- Tabelle: stile compatto e professionale
- Formattazione: font (sans/serif/mono), size (xs/sm/base/lg/xl/2xl)
- Persistenza: localStorage per preferenze

### 10. Development Workflow

- Setup iniziale
- Hot reload durante sviluppo
- Aggiunta nuovi file MD
- Testing

### 11. Future Enhancements (opzionali)

- Ricerca full-text
- Categorie/tag
- Dark mode toggle
- TOC automatico nella sidebar
- Supporto immagini

## Implementation Steps

1. Creare file `PROJECT_INFO.md` nella root del progetto
2. Organizzare contenuto in sezioni logiche
3. Includere diagrammi mermaid per architettura (opzionale)
4. Aggiungere esempi di codice per componenti chiave
5. Documentare tutte le dipendenze e versioni

## Notes

- Documento in inglese (come da best practice)
- Struttura chiara e navigabile