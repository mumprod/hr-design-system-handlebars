import AsyncAlpine from 'async-alpine'
import collapse from '@alpinejs/collapse'
import Toolkit from '@alpine-collective/toolkit'
import Alpine from 'alpinejs'
import mainNavigationHandler from 'components/site_header/mainNavigationHandler.alpine'
import flyoutHandler from 'components/site_header/flyoutHandler.alpine'
import overlayHandler from 'components/site_header/overlayHandler.alpine'
import dropdown from 'components/site_header/dropdown.alpine'

AsyncAlpine.init(Alpine)
    .data('podcastPlayer', () => import('components/teaser/podcast/podcast_player.alpine.js'))
    .data('slider', () =>
        import('components/horizontal_scroll_container/horizontal_scroll_container.alpine.js')
    )
    .start()

window.Alpine = Alpine

Alpine.store('clientHeight', document.documentElement.clientHeight || document.body.clientHeight)
Alpine.store('clientWidth', document.documentElement.clientWidth || document.body.clientWidth)
Alpine.store('burgeropen', false)
Alpine.store('searchFieldOpen', false)
Alpine.store('serviceNavIsOpen', false)

Alpine.store('searchID', {
    current: '{{nextRandom}}',
})
Alpine.store('serviceID', {
    open: false,
    current: '0',
})
Alpine.store('navIsVisible', true)
Alpine.store('subNavIsVisible', false)

Alpine.data('mainNavigationHandler', mainNavigationHandler)
Alpine.data('overlayHandler', overlayHandler)
Alpine.data('flyoutHandler', flyoutHandler)
Alpine.data('dropdown', dropdown)

Alpine.plugin(Toolkit)
Alpine.plugin(collapse)
Alpine.start()
