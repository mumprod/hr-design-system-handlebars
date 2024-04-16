import { hr$, listen, unlisten } from 'hrQuery'
import { uxAction } from 'base/tracking/pianoHelper.subfeature'
import dialogPolyfill from 'dialog-polyfill'

const UserConsentModal = function (options, rootElement) {
    let triggerNode = null,
        isDesktopViewport = true
    const dialogPolyfillBaseUrl = options.dialogPolyfillBaseUrl || 'vendor/dialog-polyfill',
        modalTrigger = options.trigger || '.js-user-consent-needed',
        modalTriggerWithDropdownInDesktopViewport = 'js-dropdown-in-desktop',
        triggerRoot = document.body,
        modal = hr$('.js-modal', rootElement)[0],
        okButtonTrigger = '.js-user-consent-ok',
        okButton = hr$(okButtonTrigger, rootElement)[0],
        closeButtonTrigger = ".js-modal-close",
        desktopViewport = 1024,
        resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                isDesktopViewport = entry.borderBoxSize[0].inlineSize >= desktopViewport
            }
        })


    const configureEventListeners = () => {
        listen('click', handleClickOnTrigger, triggerRoot)
    }

    const handleClickOnTrigger = (event) => {
        if (null !== modalTrigger) {
            triggerNode = event.target.closest(modalTrigger)
            let okButton = event.target.closest(okButtonTrigger)
            let closeButton = event.target.closest(closeButtonTrigger)

            if (null !== triggerNode) {
                let showModal = triggerNode.classList.contains(modalTriggerWithDropdownInDesktopViewport) && !isDesktopViewport || !triggerNode.classList.contains(modalTriggerWithDropdownInDesktopViewport)
                if (showModal) {
                    event.preventDefault()
                    setUrlToFollowAfterConsent(triggerNode)
                    show()
                }
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
        if ("userConsentLink" in triggerNode.dataset) {
            let link = null
            try {
                link = JSON.parse(triggerNode.dataset.userConsentLink)
            } catch {
                link = {}
            }
            urlToFollowAfterConsent = link.url || '#'
            target = link.isTargetBlank ? '_blank' : null
            rel = link.isTargetBlank ? 'noopener' : null
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
    resizeObserver.observe(document.body)
}

export default UserConsentModal
