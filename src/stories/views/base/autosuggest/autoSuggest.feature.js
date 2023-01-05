import { hr$, stripTags, throttle } from 'hrQuery'

const AutoSuggest = function (context) {
    const { options } = context,
        { element: rootElement } = context,
        filterGroups = hr$(options.filterGroupsSelector, rootElement),
        /*Node-List von Elementen die gefiltert werden sollen*/
        filterElements = hr$(options.filterElementSelector, rootElement),
        /*Klasse die gesetzt wird auf zutreffende Einträge*/
        matchedClass = options.matchedClass,
        /*Klasse die gesetzt wird auf gefilterte Einträge*/
        unmatchedClass = options.unmatchedClass,
        inputEl = hr$(options.inputElementSelector, rootElement)[0]

    const filterList = function (value) {
        for (let j = 0; j < filterElements.length; j++) {
            filterElement(filterElements[j], value)
        }

        for (let i = 0; i < filterGroups.length; i++) {
            if (hr$('.' + matchedClass, filterGroups[i]).length > 0) {
                filterGroups[i].classList.add(matchedClass)
                filterGroups[i].classList.remove(unmatchedClass)
            } else {
                filterGroups[i].classList.remove(matchedClass)
                filterGroups[i].classList.add(unmatchedClass)
            }
        }
    }

    const removeHighlight = function () {
        for (let i = 0; i < filterElements.length; i++) {
            let textEl = hr$(options.filterTextSelector, filterElements[i])[0]
            textEl.innerHTML = stripTags(textEl.innerHTML)
        }
    }

    const resetList = function () {
        for (let i = 0; i < filterElements.length; i++) {
            matchedClass ? filterElements[i].classList.add(matchedClass) : null
            unmatchedClass ? filterElements[i].classList.remove(unmatchedClass) : null
        }

        for (let j = 0; j < filterGroups.length; j++) {
            filterGroups[j].classList.add(matchedClass)
            filterGroups[j].classList.remove(unmatchedClass)
        }
    }

    const resetInput = function () {
        inputEl.value = ''
    }
    const filterElement = function (elem, value) {
        let textEl = hr$(options.filterTextSelector, elem)[0],
            text = textEl.text || textEl.textContent,
            words = text.split(' '),
            hasMatch = false

        for (let i = 0; i < words.length; i++) {
            if (
                words[i].toLowerCase().indexOf(value.toLowerCase(), 0) === 0 &&
                hr$('.-current', elem).length === 0
            ) {
                hasMatch = true
                words[i] =
                    "<span class='text-yellow-400' style='' >" +
                    words[i].slice(0, value.length) +
                    '</span>' +
                    words[i].slice(value.length)
            }
        }

        if (hasMatch) {
            //wenn wert enthalten
            unmatchedClass ? elem.classList.remove(unmatchedClass) : null
            matchedClass ? elem.classList.add(matchedClass) : null

            textEl.innerHTML = words.join(' ')
        } else {
            unmatchedClass ? elem.classList.add(unmatchedClass) : null
            matchedClass ? elem.classList.remove(matchedClass) : null
        }
    }

    const handleInput = throttle(function (event) {
        event.stopPropagation()

        let val = event.target.value

        if (val.length > 0) {
            filterList(val)
        } else {
            resetList()
            removeHighlight()
        }
    }, 240)

    
        console.log('fes:' + filterElements.length)
        console.log('ielc:' + options.inputClasses)
    

    inputEl.addEventListener('input', handleInput)

    window.addEventListener('hr:global:resetinputAutoSuggest', () => {
        resetList()
        removeHighlight()
        resetInput()
    } )
}

export default AutoSuggest
