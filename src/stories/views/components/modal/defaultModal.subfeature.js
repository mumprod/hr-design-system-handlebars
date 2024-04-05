import { hr$, listen, unlisten, addLink } from 'hrQuery'
import dialogPolyfill from 'dialog-polyfill'

const DefaultModal = function (options, rootElement) {
    const dialogPolyfillBaseUrl = options.dialogPolyfillBaseUrl || 'vendor/dialog-polyfill',
        modalTrigger = options.trigger || null,
        triggerRoot = document.body,
        modal = hr$('.js-modal', rootElement)[0],
        closeButtonTrigger = ".js-modal-close"

    const configureEventListeners = () => {
        listen('click', handleClick, triggerRoot)
    }

    const handleClick = (event) => {
        if (null !== modalTrigger) {
            let triggerNode = event.target.closest(modalTrigger)
            let nodeToCloseModal = event.target.closest(closeButtonTrigger)
            if (null !== triggerNode) {
                event.preventDefault()
                show()
            } else if (null !== nodeToCloseModal) {
                close()
            }
        }
    }

    const configurePolyfillIfNeeded = () => {
        if (undefined == modal.showModal) {
            addLink('dialog-polyfill-css', `${dialogPolyfillBaseUrl}/dialog-polyfill.css`, {
                type: 'text/css',
                rel: 'stylesheet',
            })
        }
        dialogPolyfill.registerDialog(modal)
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

    configurePolyfillIfNeeded()
    configureEventListeners()
}

export default DefaultModal
