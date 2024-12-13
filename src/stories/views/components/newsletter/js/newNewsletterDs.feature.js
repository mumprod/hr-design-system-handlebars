import { hr$, listen, replaceAnimated } from 'hrQuery'
import { uxAction } from 'base/tracking/pianoHelper.subfeature'

const Newsletter = function (context) {
    'use strict'
    const { element: rootElement } = context,
        actionUrl = rootElement && rootElement.getAttribute('action'),
        formWrapper = rootElement.parentNode,
        options = context.options,
        trackingInformations = options.trackingInformations

    async function postData() {
        const formData = new FormData(rootElement)
        // use timestamp in seconds because the newsletter tool cannot handle milliseconds
        formData.set('confirm-data-protection', Math.ceil(Date.now() / 1000))

        const response = await fetch(actionUrl, {
            method: 'POST',
            body: formData,
        })
        return response
    }

    const handleSubmit = function (event) {
        uxAction(trackingInformations)
        event.preventDefault()
        postData()
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Netzwerk- oder Serverfehler')
                }
                return response.json()
            })
            .then((responseStatus) => {
                switch (responseStatus.status) {
                    case 'success':
                        replaceAnimated(
                            formWrapper,
                            hr$('.js-successMessage', rootElement)[0].innerHTML,
                            true,
                            () => {
                                listen('click', handleFormReload, hr$('.js-formReload')[0])
                            },
                        )
                        break
                    case 'no_valid_newsletters':
                        replaceAnimated(
                            formWrapper,
                            hr$('.js-alreadyRegisteredMessage', rootElement)[0].innerHTML,
                            true,
                            () => {
                                listen('click', handleFormReload, hr$('.js-formReload')[0])
                            },
                        )
                        break
                    default:
                        replaceAnimated(
                            formWrapper,
                            hr$('.js-errorMessage', rootElement)[0].innerHTML,
                            true,
                            () => {
                                listen('click', handleFormReload, hr$('.js-formReload')[0])
                            },
                        )
                }
            })
            .catch((error) => {
                console.error('Beim Ausführen des Fetch ist ein Fehler aufgetreten.', error)
                replaceAnimated(
                    formWrapper,
                    hr$('.js-errorMessage', rootElement)[0].innerHTML,
                    true,
                    () => {
                        listen('click', handleFormReload, hr$('.js-formReload')[0])
                    },
                )
            })
    }

    const handleFormReload = function (event) {
        event.preventDefault()
        replaceAnimated(formWrapper, rootElement.outerHTML, true)
    }

    listen('submit', handleSubmit, rootElement)
}

export default Newsletter
