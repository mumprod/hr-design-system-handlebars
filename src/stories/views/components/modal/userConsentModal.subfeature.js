import { hr$, listen, unlisten } from 'hrQuery'
import { uxAction } from 'base/tracking/pianoHelper.subfeature'
import dialogPolyfill from 'dialog-polyfill'

const UserConsentModal = function (options, rootElement) {
    const dialogPolyfillBaseUrl = options.dialogPolyfillBaseUrl || 'vendor/dialog-polyfill',
        modalTrigger = options.trigger || null,
        triggerRoot = document.body,
        modal = hr$('.js-modal', rootElement)[0],
        okButtonTrigger = '.js-user-consent-ok',
        okButton = hr$(okButtonTrigger, rootElement)[0],
        closeButtonTrigger = ".js-modal-close"
    let triggerNode = null

    const configureEventListeners = () => {
        listen('click', handleClickOnTrigger, triggerRoot)
    }

    const handleClickOnTrigger = (event) => {
        if (null !== modalTrigger) {
            triggerNode = event.target.closest(modalTrigger)
            let okButton = event.target.closest(okButtonTrigger)
            let closeButton = event.target.closest(closeButtonTrigger)

            if (null !== triggerNode) {
                event.preventDefault()
                setUrlToFollowAfterConsent(triggerNode)
                show()
            }
            if (null !== okButton) {
                handleClickTracking()
            }
            if (null !== closeButton) {
                close()
            }
        }
    }

    const setUrlToFollowAfterConsent = (triggerNode) => {
        let urlToFollowAfterConsent = "",
            target = null,
            rel = null

        if ("userConsentUrl" in triggerNode.dataset) {
            urlToFollowAfterConsent = triggerNode.dataset.userConsentUrl
        } else {
            urlToFollowAfterConsent = triggerNode.href
            target = triggerNode.hasAttribute("target") ? triggerNode.target : null
            rel = triggerNode.hasAttribute("rel") ? triggerNode.rel : null
        }
        okButton.href = urlToFollowAfterConsent
        if (null !== target) {
            okButton.setAttribute("target", target)
        } else {
            okButton.removeAttribute("target")
        }
        if (null !== rel) {
            okButton.setAttribute("rel", rel)
        } else {
            okButton.removeAttribute("rel")
        }
    }

    const handleClickTracking = () => {
        if (null !== triggerNode && "userConsentTrackingData" in triggerNode.dataset) {
            uxAction(triggerNode.dataset.userConsentTrackingData)
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

export default UserConsentModal
