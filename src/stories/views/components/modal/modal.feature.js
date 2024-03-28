import { hr$, listen, unlisten, addLink } from 'hrQuery'
import { uxAction } from 'base/tracking/pianoHelper.subfeature'
import dialogPolyfill from 'dialog-polyfill'

const Modal = (context) => {
    const { options } = context,
        { element: rootElement } = context,
        dialogPolyfillBaseUrl = options.dialogPolyfillBaseUrl || 'vendor/dialog-polyfill',
        modalTriggerClass = options.triggerClass ? `.${options.modalTriggerClass}` : '',
        modalTriggerElement = options.triggerElement || '', 
        modal = hr$('.js-modal', rootElement)[0],
        triggerRoot = document.body,
        ticketShopButton = hr$('.js-ticket-ok-button', rootElement)[0],
        trackingInformations = options.trackingInformations

    const configureEventListeners = () => {
        listen('click', clickTracking, ticketShopButton)
        listen('click', handleClickOnTrigger, triggerRoot)
    }

    const handleClickOnTrigger = (event) =>{        
        if('' !== modalTriggerElement && event.target.tagName === modalTriggerElement.toUpperCase() || event.target.parentNode.tagName  === modalTriggerElement.toUpperCase()){
            let triggerNode = event.target.tagName  === modalTriggerElement.toUpperCase() ? event.target : event.target.parentNode
            if(triggerNode.classList.contains("js-modal-close")){
                close()
            } else {
                event.preventDefault()
                show()
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

    const clickTracking = () => {
        console.log('tracking')
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

    configurePolyfillIfNeeded()
    configureEventListeners()
}

export default Modal
