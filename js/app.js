import {
  getTrackStreamUrl,
  getTrendingTracks,
  searchTracks,
} from './api/audius.api.js'

import {
  getNextTrack,
  getPreviousTrack,
  setQueue,
} from './services/queue.service.js'

import {
  getPlayerSnapshot,
  loadAudio,
  onPlayerEvent,
  pauseAudio,
  playAudio,
  seekAudio,
  setVolume,
  toggleAudio,
} from './services/player.service.js'

import {
  renderHome,
} from './ui/home.ui.js'

import {
  createPlayerUI,
} from './ui/player.ui.js'

import {
  renderSearch,
} from './ui/search.ui.js'

import {
  renderEmpty,
  renderError,
  renderLoading,
} from './ui/states.ui.js'

const app =
  document.querySelector('#app')

const globalSearch =
  document.querySelector(
    '#global-search',
  )

const playButton =
  document.querySelector(
    '#play-button',
  )

const previousButton =
  document.querySelector(
    '#previous-button',
  )

const nextButton =
  document.querySelector(
    '#next-button',
  )

const progressRange =
  document.querySelector(
    '#progress-range',
  )

const volumeRange =
  document.querySelector(
    '#volume-range',
  )

const playerUI =
  createPlayerUI()

const state = {
  currentView: 'home',
  currentTrack: null,
  trendingTracks: [],
  searchResults: [],
  isPlaying: false,
}

async function initializeApp() {
  registerNavigationEvents()
  registerGlobalEvents()
  registerPlayerEvents()

  setVolume(
    Number(volumeRange.value),
  )

  await loadHome()
}

async function loadHome() {
  state.currentView = 'home'

  renderLoading({
    target: app,
    message:
      'Cargando tendencias...',
  })

  updateNavigationStyles()

  try {
    state.trendingTracks =
      await getTrendingTracks()

    renderHome({
      target: app,
      trendingTracks:
        state.trendingTracks,
      recentlyPlayedTracks:
        state.trendingTracks.slice(
          0,
          4,
        ),
    })
  } catch (error) {
    console.error(error)

    renderError({
      target: app,
      message:
        'No fue posible cargar las tendencias.',
      onRetry: loadHome,
    })
  }
}

async function executeSearch(query) {
  const normalizedQuery =
    query.trim()

  state.currentView = 'search'
  updateNavigationStyles()

  if (normalizedQuery.length < 2) {
    renderEmpty({
      target: app,
      title: 'Busca música',
      message:
        'Escribe al menos 2 caracteres.',
    })
    return
  }

  renderLoading({
    target: app,
    message:
      `Buscando “${normalizedQuery}”...`,
  })

  try {
    state.searchResults =
      await searchTracks(
        normalizedQuery,
      )

    if (
      state.searchResults.length === 0
    ) {
      renderEmpty({
        target: app,
        title: 'Sin resultados',
        message:
          `No encontramos canciones para “${normalizedQuery}”.`,
      })
      return
    }

    renderSearch({
      target: app,
      query: normalizedQuery,
      tracks:
        state.searchResults,
    })
  } catch (error) {
    console.error(error)

    renderError({
      target: app,
      message:
        'No fue posible completar la búsqueda.',
      onRetry:
        () => executeSearch(
          normalizedQuery,
        ),
    })
  }
}

function getActiveCollection() {
  if (
    state.currentView === 'search'
    && state.searchResults.length > 0
  ) {
    return state.searchResults
  }

  return state.trendingTracks
}

async function playTrack(trackId) {
  const tracks =
    getActiveCollection()

  const track =
    tracks.find(
      (item) =>
        item.id === trackId,
    )

  if (!track) {
    return
  }

  if (
    track.isStreamable === false
  ) {
    alert(
      'Esta canción no está disponible para streaming.',
    )
    return
  }

  setQueue(
    tracks,
    track.id,
  )

  await loadAndPlayTrack(track)
}

async function loadAndPlayTrack(
  track,
) {
  try {
    state.currentTrack = track

    playerUI.renderTrack(track)

    const streamUrl =
      getTrackStreamUrl(
        track.id,
      )

    loadAudio(streamUrl)
    await playAudio()
  } catch (error) {
    console.error(error)

    alert(
      'No fue posible reproducir esta canción.',
    )
  }
}

async function playNextTrack() {
  const track =
    getNextTrack()

  if (!track) {
    return
  }

  await loadAndPlayTrack(track)
}

async function playPreviousTrack() {
  const snapshot =
    getPlayerSnapshot()

  if (snapshot.currentTime > 3) {
    seekAudio(0)
    return
  }

  const track =
    getPreviousTrack()

  if (!track) {
    return
  }

  await loadAndPlayTrack(track)
}

function registerPlayerEvents() {
  onPlayerEvent(
    'play',
    () => {
      state.isPlaying = true
      playerUI.renderPlaying(true)
    },
  )

  onPlayerEvent(
    'pause',
    () => {
      state.isPlaying = false
      playerUI.renderPlaying(false)
    },
  )

  onPlayerEvent(
    'timeupdate',
    (payload) => {
      playerUI.renderProgress(
        payload,
      )
    },
  )

  onPlayerEvent(
    'metadata',
    ({ duration }) => {
      playerUI.renderProgress({
        currentTime: 0,
        duration,
      })
    },
  )

  onPlayerEvent(
    'volumechange',
    ({ volume }) => {
      playerUI.renderVolume(
        volume,
      )
    },
  )

  onPlayerEvent(
    'ended',
    playNextTrack,
  )

  onPlayerEvent(
    'error',
    (error) => {
      console.error(
        'Audio error:',
        error,
      )
    },
  )
}

function registerNavigationEvents() {
  document
    .querySelectorAll('[data-view]')
    .forEach((button) => {
      button.addEventListener(
        'click',
        () => {
          const view =
            button.dataset.view

          if (view === 'home') {
            loadHome()
            return
          }

          if (view === 'search') {
            state.currentView =
              'search'

            updateNavigationStyles()
            globalSearch.focus()

            renderEmpty({
              target: app,
              title: 'Busca música',
              message:
                'Escribe una canción o artista.',
            })
            return
          }

          if (view === 'library') {
            state.currentView =
              'library'

            updateNavigationStyles()

            renderEmpty({
              target: app,
              title:
                'Biblioteca disponible en Sesión 4',
              message:
                'Aquí tendremos favoritos e historial.',
            })
          }
        },
      )
    })
}

function registerGlobalEvents() {
  globalSearch.addEventListener(
    'keydown',
    (event) => {
      if (event.key !== 'Enter') {
        return
      }

      event.preventDefault()

      executeSearch(
        globalSearch.value,
      )
    },
  )

  document.addEventListener(
    'click',
    (event) => {
      const button =
        event.target.closest(
          '.play-track',
        )

      if (!button) {
        return
      }

      playTrack(
        button.dataset.trackId,
      )
    },
  )

  playButton.addEventListener(
    'click',
    async () => {
      if (!state.currentTrack) {
        return
      }

      try {
        await toggleAudio()
      } catch (error) {
        console.error(error)
      }
    },
  )

  previousButton.addEventListener(
    'click',
    playPreviousTrack,
  )

  nextButton.addEventListener(
    'click',
    playNextTrack,
  )

  progressRange.addEventListener(
    'input',
    () => {
      seekAudio(
        Number(
          progressRange.value,
        ),
      )
    },
  )

  volumeRange.addEventListener(
    'input',
    () => {
      setVolume(
        Number(
          volumeRange.value,
        ),
      )
    },
  )
}

function updateNavigationStyles() {
  document
    .querySelectorAll('.nav-item')
    .forEach((item) => {
      item.classList.toggle(
        'nav-item-active',
        item.dataset.view
          === state.currentView,
      )
    })

  document
    .querySelectorAll(
      '.mobile-nav-item',
    )
    .forEach((item) => {
      item.classList.toggle(
        'mobile-nav-active',
        item.dataset.view
          === state.currentView,
      )
    })
}

initializeApp()