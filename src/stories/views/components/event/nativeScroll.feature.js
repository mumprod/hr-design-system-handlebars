import { clearRequestInterval, hr$, requestInterval } from 'hrQuery'
import { uxAction } from 'base/tracking/atiHelper.subfeature'

const NativeScroll = function (context) {
    console.log('loaded feature ...')
    const { options } = context,
        { element: rootElement } = context,
        isTeaser = options.isTeaser
    let buttons,
        scrollbar,
        oneScrollbarItem,
        hideScrollbar = true,
        hasNativeSmoothScroll = false,
        smoothScrollInterval
    // Detect if the browser already supports native smooth scrolling (e.g., Firefox 36+ and Chrome 49+) and it is enabled:
    const isNativeSmoothScrollEnabledOn = function () {
        return 'scroll-behavior' in document.documentElement.style
    }
    const doScroll = function (e) {
        let step = scrollbar.clientWidth - oneScrollbarItem.clientWidth * 1.5,
            direction = e.currentTarget.classList.contains('-left') ? -1 : 1,
            distance = direction * step
            console.log("🚀 ~ file: nativeScroll.feature.js ~ line 22 ~ doScroll ~ direction", direction)
            console.log("🚀 ~ file: nativeScroll.feature.js ~ line 24 ~ doScroll ~ distance", distance)

            console.log('scrollbar ', scrollbar)
        console.log('scrollbar width ', scrollbar.clientWidth)
        console.log('oneScrollbarItem ', oneScrollbarItem)
        console.log('oneScrollbarItem width ', oneScrollbarItem.clientWidth)

        if (direction === 1) {
            console.log('right clicked')
            if (isTeaser) uxAction('Eventkalender:: Pfeil rechts geklickt', 1)
            else uxAction('Eventkalender-Monat:: Pfeil rechts geklickt', 1)
        } else {
            console.log('left clicked')
            if (isTeaser) uxAction('Eventkalender:: Pfeil links geklickt', 1)
            else uxAction('Eventkalender-Monat:: Pfeil links geklickt', 1)
        }
        console.log("🚀 ~ file: nativeScroll.feature.js ~ line 42 ~ doScroll ~ hasNativeSmoothScroll", hasNativeSmoothScroll)

        if (hasNativeSmoothScroll) {
            scrollbar.scrollLeft += distance
            console.log("🚀 ~ file: nativeScroll.feature.js ~ line 43 ~ doScroll ~ scrollbar.scrollLeft", scrollbar.scrollLeft)
        } else {
            console.log('start smooth scroll')
            startSmoothScroll(scrollbar.scrollLeft, Date.now(), distance)
        }
    }
    const startSmoothScroll = function (start_pos, start_time, distance) {
        clearRequestInterval(smoothScrollInterval)

        smoothScrollInterval = requestInterval(function () {
            loopSmoothScroll(start_pos, start_time, distance)
        }, 16)
    }
    const loopSmoothScroll = function (start_pos, start_time, distance) {
        let timeLapsed = Date.now() - start_time,
            duration = 900,
            percentage = timeLapsed / duration

        percentage = percentage > 1 ? 1 : percentage
        console.log("🚀 ~ file: nativeScroll.feature.js ~ line 61 ~ loopSmoothScroll ~ percentage", percentage)

        scrollbar.scrollLeft = start_pos + distance * easeInOutCubic(percentage)

        if (percentage === 1) {
            console.log('stop smooth scroll')
            clearRequestInterval(smoothScrollInterval)
        }
    }

    const easeInOutCubic = function (time) {
        // 'easeInOutCubic' - acceleration until halfway, then deceleration
        // time = values from 0 to 1
        return time < 0.5
            ? 4 * time * time * time
            : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1
    }

    if (hr$('.js-ns-scroll.-horizontal', rootElement).length > 0) {
        scrollbar = hr$('.js-ns-scroll.-horizontal', rootElement)[0]
        buttons = hr$('.js-ns-button', rootElement)
        oneScrollbarItem = hr$('.js-ns-item', rootElement)[0]
        hasNativeSmoothScroll = isNativeSmoothScrollEnabledOn(scrollbar)
        let initiallySelectedMonth = hr$('.js-ns-month.-selected', rootElement)[0]
        if (!initiallySelectedMonth) {
            initiallySelectedMonth = hr$('.js-ns-month.-currentMonth', rootElement)[0]
        }

        if (initiallySelectedMonth) {
            scrollbar.scrollLeft = initiallySelectedMonth.offsetLeft
        }

        if (hideScrollbar) {
            scrollbar.style.marginBottom = scrollbar.clientHeight - scrollbar.offsetHeight + 'px'
        }

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', doScroll.bind(this))
            buttons[i].addEventListener('touch', doScroll.bind(this))
        }
    } else {
        console.log(
            'Kein NativeScroll Element gefunden:' + rootElement + ' .js-ns-scroll.-horizontal'
        )
    }
}

export default NativeScroll
