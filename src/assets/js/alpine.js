import AsyncAlpine from 'async-alpine'
import collapse from '@alpinejs/collapse'
import Toolkit from '@alpine-collective/toolkit'
import Alpine from 'alpinejs'

AsyncAlpine.init(Alpine)
    .data('podcastPlayer', () => import('components/teaser/podcast/podcast_player.alpine.js'))
    .data('slider', () =>
        import('components/horizontal_scroll_container/horizontal_scroll_container.alpine.js')
    )
    .start()

window.Alpine = Alpine

Alpine.plugin(Toolkit)
Alpine.plugin(collapse)
Alpine.start()
