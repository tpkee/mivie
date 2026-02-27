# README
- **Live:** https://mivie.netlify.app/
- **Repo:** https://github.com/tpkee/mivie
- 
## Installazione

### Requisiti
- Node >= 24
- pnpm >= 10
### Variabili d'ambiente
- file `.env.local`
  - `VITE_TMDB_ACCESS_TOKEN`: è il token usato per autenticare le chiamate alle API di TMDB.
- file `.env`
  - `VITE_BASE_URL`: è l’endpoint principale su cui inviare le richieste (film, serie, ecc.).
  - `VITE_IMAGE_BASE_URL`: è la base da cui ricavare gli URL delle immagini.

#### Setup del progetto
- Configurare le variabili d'ambiente descritte sopra, passandole nel comando di avvio o inserendole nei rispettivi file.
- Eseguire `pnpm install` per installare le dipendenze.
- Eseguire `pnpm dev` per avviare il dev server.
- Eseguire `pnpm build` per compilare il progetto e `pnpm preview` per visualizzarne l'anteprima.

## Funzionalità implementate
- Homepage con la lista dei film in tendenza nell'ultima settimana e redirect alla pagina di dettaglio.
- Ricerca unificata per Attori, Film e Serie TV con infinite scrolling, paginazione, filtri divisi per film e serie TV e redirect alla pagina di dettaglio.
- Watchlist con alcune informazioni sui media (data di uscita, ecc.) e redirect alla pagina di dettaglio.
- Pagine di dettaglio per film, serie TV e attori, con possibilità di aggiungerli o rimuoverli dai preferiti. Dalla pagina di un film/serie TV è possibile navigare verso il dettaglio del singolo attore.
- Loader per la gestione dei caricamenti (lazy fetch).
- Transizioni in fade al cambio di rotta (route).
- Deploy su Netlify: https://mivie.netlify.app/

## Architettura

### Librerie
- **VueUse**: Offre alcune utilità e composables che, seppur semplici e generici, si rivelano molto utili per velocizzare lo sviluppo.
- **TanStack Query**: Inizialmente stavo usando `useFetch` (di VueUse), però implementando la paginazione e la watchlist mi sono accorto che stavo scrivendo un sacco di boilerplate per logiche abbastanza banali (il transformer della risposta, alcuni watcher, il refetch allo scadere della cache per la watchlist). In generale è un po' "overkill" per questo progetto, ma `useFetch` era troppo limitato e non conosco alternative in Vue simili allo `useFetch` di Nuxt. Un'opzione valutata è stata *Pinia Colada*, ma: 
  1) Non l'ho mai usata e nella documentazione non è chiarissimo come si integri con lo store Pinia oltre alla gestione della cache; 
  2) La funzionalità delle infiniteQueries (per il pagination) è ancora sperimentale; 
  3) È una libreria più acerba rispetto a TanStack. Per un progetto "giocattolo" potrebbe andare bene, ma per qualcosa di più strutturato preferisco affidarmi a soluzioni rodate (il suo unico vero vantaggio sembra essere un'API più snella).
- **Tailwind CSS**: È abbastanza flessibile da consentire di stilizzare i componenti velocemente e di combinare la sua configurazione con altri framework o CSS vanilla. Nei progetti più grandi mi piace affiancarlo a SCSS per gestire le casistiche più complesse, che risultano tediose da implementare con Tailwind puro o CSS nativo.

### Struttura
```text
Struttura delle cartelle del progetto 
(* -> indica moduli non collegati a un dominio specifico, roba generica)
  
src
├── router
├── stores
├── types
│   ├── common*
├── composables
├── utils
│   ├── common*
├── components
│   ├── app*
└── views
```
### Fetching
Le response vanno strutturate nel seguente modo:
- La response va _sempre_ tipizzata riflettendo i dati di upstream (è possibile omettere i campi non fondamentali, ma bisogna mantenere lo stesso naming e type). Il nome dell'interfaccia deve seguire il pattern `<domain>Response` (es: `MediaResponse`) e va wrappata nel tipo `RecursivePartial` (es: `RecursivePartial<MediaResponse>`).
- La response deve essere mappata in un tipo finale che prende il nome del solo dominio (es: da `MediaResponse` a `Media`).
- Il dominio deve avere due parser: uno per parsare l'oggetto singolo e l'altro per l'intera lista. Il parser si occupa di scartare i dati ritenuti fondamentalmente invalidi (es: elementi senza ID o senza titolo), non di validare rigidamente lo schema.

### Watchlist
**TL;DR:** La gestione della watchlist è leggermente particolare perché integra un sistema di caching e un refresh dei dati ritenuti "stale" (vita > 24h). Questo è necessario perché i dati dei Media [^1] potrebbero subire variazioni nel tempo (es: cambio della data di uscita o aggiornamento del cast).

---
Inizialmente, l'idea era quella di salvare solo gli ID dei Media[^1] in uno store e sincronizzarli nel `localStorage`. Tuttavia, TMDB non espone un endpoint per il bulk retrieval dei dati, costringendoci a fetchare tutto singolarmente in una sola volta. Questo approccio scala malissimo all'aumentare dei preferiti.

Scartata questa opzione, ho deciso di salvare direttamente i dati dei Media nel localStorage, ma serviva un modo per evitare che diventassero obsoleti rispetto ad upstream. La soluzione è banalmente quella di avere un timestamp di quando il dato è stato fetchato, salvare l'intero oggetto e, se stale (vita > 24h), rifetcharlo in background

#### Limiti

Per questioni di semplicità, i seguenti scenari non sono stati gestiti:
- L'utente potrebbe lasciare la tab del browser aperta abbastanza a lungo da rendere falsa l'asserzione che i dati in memoria siano ancora freschi.
- Il problema del bulk fetching, seppur mitigato per il caricamento iniziale, non è completamente risolto: se un utente dovesse passare il pomeriggio ad aggiungere centinaia di film alla watchlist, 24 ore dopo farà comunque N richieste concorrenti per refreshare i dati. Questo potrebbe essere risolto implementando un sistema di _batching_ per distribuire le richieste nel tempo.

### Ricerca
L'endpoint fornito da TMDB per le ricerche multiple (`multi`) non permette di filtrare per anno o genere (tra l'altro, i generi hanno ID diversi tra Movie e TV!). Di conseguenza, è necessario fare chiamate a endpoint diversi: `discover/${mediaType}` per i media specifici e `multi` per la ricerca generale. Non ho inserito filtri per gli attori (`person`) non avendone avvertito la necessità. Inoltre, non è possibile gestire i filtri esclusivamente lato Front-End a causa della paginazione server-side. Il problema di fondo è diventato quindi come gestire l'UX dei filtri.

Alcune soluzioni valutate:
- *Merge delle liste*: Unire le liste lato client spalmando gli elementi (es: a ogni iterazione pesco un elemento finché `i < arrType.length`) e manipolando il puntatore della pagina in base allo scroll. Un approccio pessimo sia a livello implementativo che di UX (sarebbe impossibile far capire all'utente per cosa si sta filtrando). _Scartata immediatamente._
- Pagina di ricerca dedicata*: Creare una route di ricerca con sezioni separate, lasciando la barra nell'header solo per ricerche generiche. _Scartata_, perché fastidiosa e richiedeva continui cambi di pagina.
- *Dropdown contestuale (Adottata)*: Implementare un dropdown specifico vicino alla barra di ricerca che permette all'utente di selezionare il `mediaType` e applicare i relativi filtri. È la soluzione più pulita, veloce e con la migliore User Experience.

[^1]: Media = Movie + TV
