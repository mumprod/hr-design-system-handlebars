import { hr$ } from 'hrQuery'

const Newsletter = function (context) {
    'use strict'

    const { element: rootElement } = context,
        subscribeRadio = hr$('.js-newsletter-subscribe', rootElement)[0],
        unsubscribeRadio = hr$('.js-newsletter-unsubscribe', rootElement)[0]

    if (subscribeRadio && unsubscribeRadio) {
        subscribeRadio.onclick = function () {
            subscribeRadio.checked = true
            unsubscribeRadio.checked = false
        }
        unsubscribeRadio.onclick = function () {
            subscribeRadio.checked = false
            unsubscribeRadio.checked = true
        }
    }
}

export default Newsletter
