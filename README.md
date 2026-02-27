# README
- **Live:** https://mivie.netlify.app/
- **Repo:** https://github.com/tpkee/mivie
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
- Configurare le variabili d'ambiente descritte sopra nei rispettivi file
- Eseguire `pnpm install` per installare le dipendenze.
- Eseguire `pnpm dev` per avviare il dev server.
- Eseguire `pnpm build` per compilare il progetto e `pnpm preview` per farlo partire

## Funzionalità implementate
- Homepage con la lista dei film in tendenza nell'ultima settimana e redirect al dettaglio
- Ricerca unificata per Attori, Film e Serie TV con infinite scrolling, paginazione, e filtri.
- Watchlist con alcune informazioni sui media (data di uscita, ecc.) e redirect al dettaglio.
- Pagine di dettaglio per film, serie TV e attori, con possibilità di aggiungerli o rimuoverli dai preferiti. Dalla pagina di un film/serie TV è possibile navigare verso il dettaglio del singolo attore.
- Loader per la gestione dei caricamenti.
- Transizioni in fade al cambio di route.
- Deploy su Netlify: https://mivie.netlify.app/
## Architettura

### Librerie
- **VueUse**: Offre alcune utilità e composables che, seppur semplici e generici, si rivelano molto utili per velocizzare lo sviluppo.
- **TanStack Query**: Inizialmente stavo usando `useFetch` (di VueUse), però implementando la paginazione e la watchlist mi sono accorto che stavo scrivendo un sacco di boilerplate per logiche abbastanza banali. 
- **Tailwind CSS**: È abbastanza flessibile da consentire di stilizzare i componenti velocemente e di combinare la sua configurazione con altri framework o CSS vanilla.
### Watchlist
La gestione della watchlist è leggermente particolare perché integra un sistema di caching e un refresh dei dati ritenuti "stale" (vita > 24h). Questo è necessario perché i dati dei Media [^1] potrebbero subire variazioni nel tempo (es: cambio della data di uscita o aggiornamento del cast).
#### Limiti

Per questioni di semplicità, i seguenti scenari non sono stati gestiti:
- L'utente potrebbe lasciare la tab del browser aperta abbastanza a lungo da rendere falsa l'asserzione che i dati in memoria siano ancora freschi.
- Il problema del bulk fetching, seppur mitigato per il caricamento iniziale, non è completamente risolto: se un utente dovesse passare il pomeriggio ad aggiungere centinaia di film alla watchlist, 24 ore dopo farà comunque N richieste concorrenti per refreshare i dati. Questo potrebbe essere risolto implementando un sistema di _batching_ per distribuire le richieste nel tempo.

### Ricerca
L'endpoint fornito da TMDB per le ricerche multiple (`multi`) non permette di filtrare per anno o genere (tra l'altro, i generi hanno ID diversi tra Movie e TV!). Di conseguenza, è necessario fare chiamate a endpoint diversi: `discover/${mediaType}` per i media specifici e `multi` per la ricerca generale. Non ho inserito filtri per gli attori (`person`) non avendone avvertito la necessità. Inoltre, non è possibile gestire i filtri esclusivamente lato Front-End a causa della paginazione server-side. Il problema di fondo è diventato quindi come gestire l'UX dei filtri.
