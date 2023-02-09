import { hr$, listen, unlisten } from 'hrQuery'

const Modal = (context) => {
    const { options } = context,
        { element: rootElement } = context,
        modalTriggerId = options.modalTriggerId ? '#' + options.modalTriggerId : '',
        modalTrigger = hr$(modalTriggerId)[0],
        modalCloseTriggers = hr$('.js-modal-close', rootElement),
        modal = hr$('.js-modal', rootElement)[0]

    const configureEventListeners = () => {
        listen('click', show, modalTrigger)

        modalCloseTriggers.forEach((modalCloseTrigger) => {
            listen('click', close, modalCloseTrigger)
        })
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
