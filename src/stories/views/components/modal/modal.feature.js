import { hr$, listen, unlisten } from 'hrQuery'
import { uxAction } from 'base/tracking/atiHelper.subfeature'

const Modal = (context) => {
    const { options } = context,
        { element: rootElement } = context,
        modalTriggerId = options.modalTriggerId ? '#' + options.modalTriggerId : '',
        modalTrigger = hr$(modalTriggerId)[0],
        modalCloseTriggers = hr$('.js-modal-close', rootElement),
        modal = hr$('.js-modal', rootElement)[0],
        ticketShopButton = hr$('.js-ticket-ok-button', rootElement)[0],
        trackingInformations = options.trackingInformations

    const configureEventListeners = () => {
        listen('click', clickTracking, ticketShopButton)
        listen('click', show, modalTrigger)

        modalCloseTriggers.forEach((modalCloseTrigger) => {
            listen('click', close, modalCloseTrigger)
        })
    }

    const clickTracking = () => {
        console.log("tracking")
        uxAction(trackingInformations)
    }

    const show = () => {
        modal.showModal()
        listen('click', closeFromOutside, modal)
    }

    const closeFromOutside = (event) => {
        if (event.target === modal) {
            unlisten('click', closeFromOutside, modal)
            close()
        }
    }

    const close = () => {
        modal.close()
    }

    configureEventListeners()
}

export default Modal
