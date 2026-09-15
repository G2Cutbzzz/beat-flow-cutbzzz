# Evidencia codigo trabajado en clase
### Hortelano Jimenez Cesar Cutberto

## JS
### mock.data.js

``` js
export const trendingTracks = [
  {
    id: 'track-001',
    title: 'Neon Pulse',
    artist: 'Nova Waves',
    genre: 'Electronic',
    duration: '3:56',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'track-002',
    title: 'Midnight Drive',
    artist: 'Echo District',
    genre: 'Synthwave',
    duration: '4:08',
    cover:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'track-003',
    title: 'Ocean Lights',
    artist: 'Luma',
    genre: 'Ambient',
    duration: '3:42',
    cover:
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'track-004',
    title: 'Afterglow',
    artist: 'Solar Bloom',
    genre: 'Pop',
    duration: '3:27',
    cover:
      'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'track-005',
    title: 'Parallel Lines',
    artist: 'The Signals',
    genre: 'Alternative',
    duration: '4:15',
    cover:
      'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'track-006',
    title: 'City Motion',
    artist: 'Night Shift',
    genre: 'Electronic',
    duration: '3:38',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80',
  },
]

export const recentlyPlayedTracks = [
  {
    id: 'recent-001',
    title: 'Neon Pulse',
    artist: 'Nova Waves',
    duration: '3:56',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'recent-002',
    title: 'Ocean Lights',
    artist: 'Luma',
    duration: '3:42',
    cover:
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'recent-003',
    title: 'Afterglow',
    artist: 'Solar Bloom',
    duration: '3:27',
    cover:
      'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'recent-004',
    title: 'City Motion',
    artist: 'Night Shift',
    duration: '3:38',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=200&q=80',
  },
]

```

### home.ui.js

```js
const createTrackCard=(track)=>{
    return `
    <article class="track-card group rounded-2xl border-white/5 bg-zinc-900/80 p-3 transition duration-300 hover:-translate-y-1 hover:border-violet-500/40">
        <div class="relative overflow-hidden rounded-xl">
            <img src="${track.cover}" alt="Portada de ${track.title}" class="track-card-image aspect-square w-full object-cover" loading="lazy">
            <button class="play-track absolute bottom-3 right-4 grid h-11 w-11 place-items-center rounded-full bg-white text-black opacity-0 shadow-xl transition group-hover:opacity-100 focus:opacity-100" data-track-id="${track.id}" aria-label="Seleccionar ${track.title}">▶️</button>
            <div class="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase">
                ${track.genre}
            </div>
        </div>
        <div class="mt-3">
            <h3 class="truncate font-semibold">${track.title}</h3>
            <p class="mt-1 truncate text-sm text-zinc-500">${track.artist}</p>
        </div>
    </article>
    `
};

const createRecentlyPlayedRow=(track)=>{
    return`
    <article class="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded-2xl px-3 py-2 transition hover:bg-zinc-900">
    <img src="${track.cover}" alt="Portada de ${track.title}" class="h-12 w-12 rounded-xl object-cover" loading="lazy">
    <div class="min-w-0">
            <p class="truncate text-sm font-semibold">${track.title}</p>
            <p class="mt-1 truncate text-xs text-zinc-500">${track.artist}</p>
    </div>
    <span class="hidden text-xs text-zinc-600 sm:block">${track.duration}</span>
    <button class="play-track grid w-9 h-9 place-items-center rounded-full bg-zinc-800 text-white" data-track-id="${track.id}" aria-label="Seleccionar ${track.title}">▶️</button>
    </article>
    `

};

export function renderHome({
  target,
  trendingTracks,
  recentlyPlayedTracks,
}) {
  target.innerHTML = `
    <section>
      <div
        class="relative overflow-hidden rounded-3xl border border-white/10
               bg-gradient-to-br from-violet-950 via-zinc-900
               to-cyan-950 px-6 py-8 md:px-10 md:py-12"
      >
        <div
          class="absolute -right-20 -top-20 h-72 w-72
                 rounded-full bg-violet-500/20 blur-3xl"
        ></div>

        <div class="relative max-w-2xl">
          <span
            class="inline-flex rounded-full border border-violet-400/30
                   bg-violet-400/10 px-3 py-1 text-xs font-semibold
                   text-violet-300"
          >
            BeatFlow · v0.1.0
          </span>

          <h1
            class="mt-5 text-4xl font-black tracking-tight
                   sm:text-5xl md:text-6xl"
          >
            Música para
            <span class="text-gradient-brand">
              cada momento
            </span>
          </h1>

          <p
            class="mt-4 max-w-xl text-sm leading-7 text-zinc-300
                   sm:text-base"
          >
            Descubre música, explora tendencias y construye
            tu experiencia musical.
          </p>

          <button
            id="explore-button"
            type="button"
            class="mt-6 rounded-full bg-white px-6 py-3
                   text-sm font-bold text-black"
          >
            Explorar ahora
          </button>
        </div>
      </div>
    </section>

    <section class="mt-9">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <p
            class="text-xs font-semibold uppercase
                   tracking-[0.2em] text-violet-400"
          >
            Descubre
          </p>

          <h2 class="mt-1 text-2xl font-bold">
            Tendencias esta semana
          </h2>
        </div>
      </div>

      <div
        class="grid grid-cols-2 gap-3
               sm:grid-cols-3 xl:grid-cols-6"
      >
        ${trendingTracks.map(createTrackCard).join('')}
      </div>
    </section>

    <section class="mt-10">
      <div class="mb-4">
        <p
          class="text-xs font-semibold uppercase
                 tracking-[0.2em] text-cyan-400"
        >
          Regresa
        </p>

        <h2 class="mt-1 text-2xl font-bold">
          Escuchados recientemente
        </h2>
      </div>

      <div
        class="divide-y divide-white/5 rounded-3xl
               border border-white/10 bg-zinc-900/40 p-2"
      >
        ${
          recentlyPlayedTracks
            .map(createRecentlyPlayedRow)
            .join('')
        }
      </div>
    </section>
  `
}
```

### app.js
```js
import { recentlyPlayedTracks,trendingTracks } from "./data/mock.data.js";
import { renderHome } from "./ui/home.ui.js";

const app=document.querySelector('#app')
const playerTitle=document.querySelector('#player-title')
const playerArtist=document.querySelector('#player-artist')
const playerCover=document.querySelector('#player-cover')
const playButton=document.querySelector('#play-button')
const globalSearch=document.querySelector('#global-search')

const allTracks=[
    ...trendingTracks,
    ...recentlyPlayedTracks,
]

const state={
    currentView:'home',
    currentTrack: trendingTracks[0],
    isPlaying:false
}

const initializeApp=()=>{
    renderCurrentView()
    registerNavigationEvents()
    registerGlobalEvents()
    updatePlayer()
    updateNavigationStyles()
}
```

