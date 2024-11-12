import { hr$, listen, replaceAnimated } from 'hrQuery'
import $ from 'zepto-modules'

require('zepto-modules/callbacks')
require('zepto-modules/deferred')

const Voting = (context) => {
    const { options } = context
    const { element: rootElement } = context
    const jsonUrl = options.jsonURL,
        votingWrapper = hr$('.js-voting-wrapper', rootElement)[0],
        votingTmpl = votingWrapper.innerHTML,
        ajaxTimeout = 60 * 1000,
        responseFormatParam = 'rf=inline'
    let ajaxOptions,
        votingForm = hr$('.js-votingForm', rootElement)[0],
        actionUrl = votingForm && votingForm.getAttribute('action'),
        isPosting = false,
        responseStatus,
        validationErrors

    const checkForJsonUrl = function () {
        if (jsonUrl) {
            actionUrl = jsonUrl
        }
    }

    const handleSubmit = function (event) {
        if (event.target.matches('.js-votingForm')) {
            submitForm(event)
        }
    }
    const submitForm = function (event) {
        event.preventDefault()

        if (isPosting) {
            return
        } else {
            isPosting = true
        }

        //jedes mal neu holen,
        //da das DOM mit innerHTML ersetzt wird
        votingForm = hr$('.js-votingForm', rootElement)[0]

        console.log('DATA: ' + $(votingForm).serialize())
        setAjaxOptions()

        $.ajax(ajaxOptions)

            //Add handlers to be called when the Deferred object is resolved.
            .done(function (data, status, xhr) {
                console.log('Done')
                console.log(data)

                if (jsonUrl) {
                    try {
                        responseStatus = JSON.parse(data).status
                    } catch {
                        //mockData already delivers a json-pbject!
                        responseStatus = data.status
                    }
                    switch (responseStatus) {
                        case 'VALIDATION_ERROR':
                            console.log('Validation Error')
                            validationErrors = JSON.parse(data).errors
                            handleValidationErrors(validationErrors)
                            break
                        case 'SERVER_ERROR':
                            replaceAnimated(
                                votingWrapper,
                                hr$('.js-errorMessage', rootElement)[0].innerHTML,
                                true,
                                scrollIntoVoting
                            )
                            break
                        case 'OK':
                            replaceAnimated(
                                votingWrapper,
                                hr$('.js-successMessage', rootElement)[0].innerHTML,
                                true,
                                scrollIntoVoting
                            )
                            break
                        default:
                            replaceAnimated(
                                votingWrapper,
                                hr$('.js-errorMessage', rootElement)[0].innerHTML,
                                true,
                                scrollIntoVoting
                            )
                            break
                    }
                } else {
                    replaceAnimated(votingWrapper, data, true, scrollIntoVoting)
                }
            })

            //Add handlers to be called when the Deferred object is rejected.
            .fail(function (xhr, errorType, error) {
                //anzeige irgendetwas hat nicht geklappt
                console.log('Fail ' + errorType)
                replaceAnimated(
                    votingWrapper,
                    hr$('.js-errorMessage', rootElement)[0].innerHTML,
                    true,
                    scrollIntoVoting
                )
            })

            //Add handlers to be called when the Deferred object is either resolved or rejected.
            .always(function () {
                //aufräumen wenn bedarf besteht.
                console.log('Always')

                isPosting = false
            })
    }

    const setAjaxOptions = function () {
        ajaxOptions = {}
        ajaxOptions.timeout = ajaxTimeout

        ajaxOptions.type = 'POST'
        ajaxOptions.url = actionUrl + '?' + responseFormatParam
        ajaxOptions.data = $(votingForm).serialize()
        ajaxOptions.contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
        ajaxOptions.dataType = ''
    }

    const scrollIntoVoting = function (vertical) {
        setTimeout(function () {
            rootElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }, 850)
    }
    /**
     * Handles click events globally
     * and delegates to concrete handlers
     * on the basis of the event target.
     * @see {@link https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/} for further information.
     * @param event
     */
    const handleClick = function (event) {
        if (event.target.matches('.js-formReload')) {
            handleFormReload(event)
        }
    }

    const handleFormReload = function (event) {
        event.preventDefault()
        replaceAnimated(votingWrapper, votingTmpl, true, scrollIntoVoting)
    }

    const handleKeydown = function (event) {
        if (event.target.matches('.js-form-email')) {
            event.stopPropagation()
        }
    }

    const setValidationErrors = function (errors) {
        let wrapperElement, errorElement, prop, InvalidFields

        for (prop in errors) {
            wrapperElement = rootElement.getElementsByClassName('js-wrapper-' + prop)[0]
            errorElement = document.createElement('p')

            InvalidFields = document.getElementsByName(prop)
            for (let i = 0; i < InvalidFields.length; i++) {
                if (wrapperElement.contains(InvalidFields[i])) {
                    InvalidFields[i].classList.add('is-invalid')
                }
            }

            errorElement.innerHTML = options.errorMessages[errors[prop]]
            errorElement.classList.add('c-form__errorMessage')

            wrapperElement.insertBefore(errorElement, wrapperElement.firstChild)
        }
    }

    const resetValidationErrors = function () {
        let oldInvalidFields = hr$('.is-invalid', rootElement),
            oldErrorMessages = hr$('.c-form__errorMessage', rootElement)

        for (let i = 0; i < oldInvalidFields.length; i++) {
            oldInvalidFields[i].classList.remove('is-invalid')
            oldErrorMessages[i].parentNode.removeChild(oldErrorMessages[i])
        }
    }

    const handleValidationErrors = function (errors) {
        resetValidationErrors()
        setValidationErrors(errors)
    }

    const isFormAvailable = function () {
        return !!votingForm
    }

    if (!isFormAvailable()) {
        //skip code execution
        return
    }

    //init
    votingWrapper.style.WebkitTransition = 'opacity 0.8s ease-in-out'
    votingWrapper.style.MozTransition = 'opacity 0.8s ease-in-out'
    votingWrapper.style.transition = 'opacity 0.8s ease-in-out'

    checkForJsonUrl()

    listen('submit', handleSubmit, rootElement)
    listen('click', handleClick, rootElement)
    listen('keydown', handleKeydown, rootElement)
}
export default Voting
