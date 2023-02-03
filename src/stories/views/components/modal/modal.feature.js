import { hr$, listen, unlisten } from 'hrQuery'

const Modal = (context) => {
    const { options } = context,
        { element: rootElement } = context,
        modalTriggerId = options.modalTriggerId ? '#' + options.modalTriggerId : '',
        modalTrigger = hr$(modalTriggerId)[0],
        modal = hr$('.js-modal', rootElement)[0]

    const showModal = () => {
        modal.showModal()
        listen('click', closeModal, modal)
    }

    const closeModal = (event) => {
        if (event.target === modal) {
            unlisten('click', closeModal, modal)
            modal.close()
        }
    }

    listen('click', showModal, modalTrigger)
}

export default Modal
