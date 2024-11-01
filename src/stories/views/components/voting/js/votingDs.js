var Voting =
    Voting ||
    function (options) {
        'use strict'

        var element = hr$(options.selector)[0],
            settings = options.data ? JSON.parse(options.data) : {},
            jsonURL = settings.jsonURL,
            votingWrapper = hr$('.js-voting-wrapper', element)[0],
            votingTmpl = votingWrapper.innerHTML,
            votingForm = hr$('.js-votingForm', element)[0],
            actionUrl = votingForm && votingForm.getAttribute('action'),
            ajaxOptions,
            ajaxTimeout = 60 * 1000,
            responseFormatParam = 'rf=inline',
            isPosting = false,
            preloadIcon,
            loadingIcon,
            validationErrors,
            responseStatus,
            checkForJsonURL = function () {
                if (jsonURL) {
                    actionUrl = jsonURL
                }
            },
            handleSubmit = function (event) {
                event.preventDefault()

                if (isPosting) {
                    return
                } else {
                    isPosting = true
                }

                //jedes mal neu holen,
                //da das DOM mit innerHTML ersetzt wird
                votingForm = hr$('.js-votingForm', element)[0]

                //            preloadIcon = hr$('.js-preloadIcon', formWrapper)[0];
                //            loadingIcon = hr$('.js-loadingIcon', formWrapper)[0];
                //
                //            preloadIcon.classList.add('-isHidden');
                //            loadingIcon.classList.remove('-isHidden');

                console.log('DATA: ' + $(votingForm).serialize())
                ajaxOptions = {}
                ajaxOptions.timeout = ajaxTimeout

                ajaxOptions.type = 'POST'
                ajaxOptions.url = actionUrl + '?' + responseFormatParam
                ajaxOptions.data = $(votingForm).serialize()
                ajaxOptions.contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
                ajaxOptions.dataType = ''

                $.ajax(ajaxOptions)

                    //Add handlers to be called when the Deferred object is resolved.
                    .done(function (data, status, xhr) {
                        console.log('Done')
                        console.log(data)

                        if (settings.jsonURL) {
                            responseStatus = JSON.parse(data).status
                            switch (responseStatus) {
                                case 'VALIDATION_ERROR':
                                    console.log('Validation Error')
                                    validationErrors = JSON.parse(data).errors
                                    handleValidationErrors(validationErrors)
                                    break
                                case 'SERVER_ERROR':
                                    hr$.replaceAnimated(
                                        votingWrapper,
                                        hr$('.js-errorMessage', element)[0].innerHTML,
                                        true,
                                        scrollIntoVoting()
                                    )
                                    break
                                case 'OK':
                                    hr$.replaceAnimated(
                                        votingWrapper,
                                        hr$('.js-successMessage', element)[0].innerHTML,
                                        true,
                                        scrollIntoVoting()
                                    )
                                    break
                                default:
                                    hr$.replaceAnimated(
                                        votingWrapper,
                                        hr$('.js-errorMessage', element)[0].innerHTML,
                                        true,
                                        scrollIntoVoting()
                                    )
                                    break
                            }
                        } else {
                            hr$.replaceAnimated(formWrapper, data, true)
                            scrollIntoVoting()
                        }
                    })

                    //Add handlers to be called when the Deferred object is rejected.
                    .fail(function (xhr, errorType, error) {
                        //anzeige irgendetwas hat nicht geklappt
                        console.log('Fail ' + errorType)
                        hr$.replaceAnimated(
                            votingWrapper,
                            hr$('.js-errorMessage', element)[0].innerHTML,
                            true,
                            setTimeout(function () {
                                scrollIntoVoting()
                            }, 850)
                        )
                    })

                    //Add handlers to be called when the Deferred object is either resolved or rejected.
                    .always(function () {
                        //aufräumen wenn bedarf besteht.
                        console.log('Always')

                        isPosting = false
                    })
            },
            scrollIntoVoting = function (vertical) {
                setTimeout(function () {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    })
                }, 850)
            },
            handleFormReload = function (event) {
                event.preventDefault()
                hr$.replaceAnimated(votingWrapper, votingTmpl, false, reinitiateVotingForm)
                scrollIntoVoting()
                //hr$.ux('forms', 'formReload');
            },
            setValidationErrors = function (errors) {
                var wrapperElement, errorElement, prop, InvalidFields

                for (prop in errors) {
                    wrapperElement = element.getElementsByClassName('js-wrapper-' + prop)[0]
                    errorElement = document.createElement('p')

                    InvalidFields = document.getElementsByName(prop)
                    for (var i = 0; i < InvalidFields.length; i++) {
                        if (wrapperElement.contains(InvalidFields[i])) {
                            InvalidFields[i].classList.add('is-invalid')
                        }
                    }

                    errorElement.innerHTML = settings.errorMessages[errors[prop]]
                    errorElement.classList.add('c-form__errorMessage')

                    wrapperElement.insertBefore(errorElement, wrapperElement.firstChild)
                }
            },
            resetValidationErrors = function () {
                var oldInvalidFields = hr$('.is-invalid', element),
                    oldErrorMessages = hr$('.c-form__errorMessage', element)

                for (var i = 0; i < oldInvalidFields.length; i++) {
                    oldInvalidFields[i].classList.remove('is-invalid')
                    oldErrorMessages[i].parentNode.removeChild(oldErrorMessages[i])
                }
            },
            handleValidationErrors = function (errors) {
                resetValidationErrors()
                setValidationErrors(errors)
            },
            isFormAvailable = function () {
                return !!votingForm
            },
            reinitiateVotingForm = function () {
                hrScriptLoad.rescanForModulesAndVariants(element.parentElement)
            }

        if (!isFormAvailable()) {
            //skip code execution
            return
        }

        //init
        votingWrapper.style.WebkitTransition = 'opacity 0.8s ease-in-out'
        votingWrapper.style.MozTransition = 'opacity 0.8s ease-in-out'
        votingWrapper.style.transition = 'opacity 0.8s ease-in-out'

        checkForJsonURL()

        $(element).on('submit', '.js-votingForm', handleSubmit)
        $(element).on('click', '.js-formReload', handleFormReload)
        $(element).on('keydown', '.js-form-email', function (e) {
            e.stopPropagation()
        })
    }

hrScriptLoad.load('voting', ['hrQueryOld', 'zepto'], function (options) {
    new Voting(options)
})
