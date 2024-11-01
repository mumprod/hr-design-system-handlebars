var VoteValidator =
    VoteValidator ||
    function (options) {
        'use strict'

        // Production steps of ECMA-262, Edition 6, 22.1.2.1
        if (!Array.from) {
            Array.from = (function () {
                var toStr = Object.prototype.toString
                var isCallable = function (fn) {
                    return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
                }
                var toInteger = function (value) {
                    var number = Number(value)
                    if (isNaN(number)) {
                        return 0
                    }
                    if (number === 0 || !isFinite(number)) {
                        return number
                    }
                    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
                }
                var maxSafeInteger = Math.pow(2, 53) - 1
                var toLength = function (value) {
                    var len = toInteger(value)
                    return Math.min(Math.max(len, 0), maxSafeInteger)
                }

                // The length property of the from method is 1.
                return function from(arrayLike /*, mapFn, thisArg */) {
                    // 1. Let C be the this value.
                    var C = this

                    // 2. Let items be ToObject(arrayLike).
                    var items = Object(arrayLike)

                    // 3. ReturnIfAbrupt(items).
                    if (arrayLike == null) {
                        throw new TypeError(
                            'Array.from requires an array-like object - not null or undefined'
                        )
                    }

                    // 4. If mapfn is undefined, then let mapping be false.
                    var mapFn = arguments.length > 1 ? arguments[1] : void undefined
                    var T
                    if (typeof mapFn !== 'undefined') {
                        // 5. else
                        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                        if (!isCallable(mapFn)) {
                            throw new TypeError(
                                'Array.from: when provided, the second argument must be a function'
                            )
                        }

                        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                        if (arguments.length > 2) {
                            T = arguments[2]
                        }
                    }

                    // 10. Let lenValue be Get(items, "length").
                    // 11. Let len be ToLength(lenValue).
                    var len = toLength(items.length)

                    // 13. If IsConstructor(C) is true, then
                    // 13. a. Let A be the result of calling the [[Construct]] internal method
                    // of C with an argument list containing the single item len.
                    // 14. a. Else, Let A be ArrayCreate(len).
                    var A = isCallable(C) ? Object(new C(len)) : new Array(len)

                    // 16. Let k be 0.
                    var k = 0
                    // 17. Repeat, while k < len… (also steps a - h)
                    var kValue
                    while (k < len) {
                        kValue = items[k]
                        if (mapFn) {
                            A[k] =
                                typeof T === 'undefined'
                                    ? mapFn(kValue, k)
                                    : mapFn.call(T, kValue, k)
                        } else {
                            A[k] = kValue
                        }
                        k += 1
                    }
                    // 18. Let putStatus be Put(A, "length", len, true).
                    A.length = len
                    // 20. Return A.
                    return A
                }
            })()
        }

        var element = hr$(options.selector)[0],
            settings = options.data ? JSON.parse(options.data) : {},
            minAnswerCount = settings.minAnswerCount,
            maxAnswerCount = settings.maxAnswerCount,
            isMultipleChoice = settings.isMultipleChoice || false,
            selectedCheckboxes = 0,
            votingOptions = Array.from(hr$('input[name=multivoting]', element)),
            counter = hr$('.js-voting-counter', element),
            submit = hr$('input[type=submit]', element)[0],
            submitLabel = hr$('.js-voting-submit-button', element)[0],
            countSelectedCheckboxes = function (event) {
                console.log(submitLabel)
                if (countCheckedCheckboxes() != 0) {
                    submit.disabled = false
                    submitLabel.classList.remove('-inactive')
                } else {
                    submit.disabled = true
                    submitLabel.classList.add('-inactive')
                }

                if (selectedCheckboxes < maxAnswerCount) {
                    countSelectedCheckBoxesIfMaxHasNotReached(event)

                    if (selectedCheckboxes == maxAnswerCount) {
                        disableCheckboxesIfMaxHasReached()
                    }
                } else {
                    enableCheckboxesIfMaxHasUndershot()
                }
            },
            isUnchecked = function (checkbox) {
                return checkbox.checked == false
            },
            isDisabled = function (checkbox) {
                return checkbox.disabled == true
            },
            isChecked = function (checkbox) {
                return checkbox.checked == true
            }

        function countCheckedCheckboxes() {
            var checkedOptions = votingOptions.filter(isChecked)
            return checkedOptions.length
        }

        function countSelectedCheckBoxesIfMaxHasNotReached(event) {
            if (event.target.checked == false) {
                selectedCheckboxes = selectedCheckboxes - 1
                counter.innerHTML = selectedCheckboxes + '/' + maxAnswerCount
            } else {
                selectedCheckboxes = selectedCheckboxes + 1
                counter.innerHTML = selectedCheckboxes + '/' + maxAnswerCount
            }
        }

        function disableCheckboxesIfMaxHasReached() {
            var uncheckedOptions = votingOptions.filter(isUnchecked)
            uncheckedOptions.map(function (uncheckedOptions) {
                uncheckedOptions.disabled = true
                var label = hr$('label[for=' + uncheckedOptions.id + ']')
                label = label.item(0)
                label.classList.add('-inactive')
            })
        }

        function enableCheckboxesIfMaxHasUndershot() {
            selectedCheckboxes = selectedCheckboxes - 1
            counter.innerHTML = selectedCheckboxes + '/' + maxAnswerCount
            var disabledCheckboxes = votingOptions.filter(isDisabled)
            disabledCheckboxes.map(function (disabledCheckboxes) {
                disabledCheckboxes.disabled = false
                var label = hr$('label[for=' + disabledCheckboxes.id + ']')
                label = label.item(0)
                label.classList.remove('-inactive')
            })
        }

        function initVotingValidation() {
            if (isMultipleChoice) {
                counter = counter.item(0)
                submit.disabled = true

                // Uncheck all checkboxes if User was faster than JS loading
                for (var i = 0; i < votingOptions.length; i++) {
                    votingOptions[i].checked = false
                }

                for (var i = 0; i < votingOptions.length; i++) {
                    votingOptions[i].disabled = false
                    hr$.listen('click', countSelectedCheckboxes, votingOptions[i])
                }
            }
        }

        initVotingValidation()
    }

hrScriptLoad.load('voteValidator', ['hrQueryOld'], function (options) {
    new VoteValidator(options)
})
