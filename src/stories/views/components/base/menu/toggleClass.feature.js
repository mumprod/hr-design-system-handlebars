import { debounce, getViewportWidth, hr$, isDescendant } from 'hrQuery'

var ToggleClassInstances = ToggleClassInstances || []

const ToggleClass = function (context) {
    const { options } = context
    const { element: rootElement } = context
    const toggleClass = options.toggleClass,
        id = options.id,
        closeFlyout = options.closeFlyout ? options.closeFlyout : false,
        closeOnInit = options.onInit ? options.onInit === 'close' : false,
        initialState = options.initialState,
        closeOnResize = options.closeOnResize ? options.closeOnResize : null,
        closeFromOutside = options.reactToOutside ? options.reactToOutside === 'close' : false,
        checkbox = options.onCheckboxTarget ? hr$(options.onCheckboxTarget) : undefined,
        target = options.onTarget ? hr$(options.onTarget) : rootElement,
        focusTarget = options.toggleOnFocus ? hr$(options.toggleOnFocus) : undefined,
        closeOthers = options.closeOthers ? options.closeOthers : false
    let reactTo = options.reactTo
    let isToggleChecked = options.toggleCheck ? options.toggleCheck : false

    const closeHandler = function (event) {
        //wenn kein kind von target
        for (let i = 0; i < target.length; i++) {
            console.log('In Closehandler')
            if (!isDescendant(target[i], event.target)) {
                toggleHandler(event)
                return
            }
        }
    }

    const toggleAllOtherInstances = function (name) {
        let toggled = false
        for (let i = 0; i < ToggleClassInstances.length; i++) {
            let tc = ToggleClassInstances[i]
            if (tc.isOpen() && tc.getName() !== name) {
                toggled = true
                tc.toggle()
            }
        }
        return toggled
    }

    const toggleAllFlyouts = function () {
        // schließe alle offenen Flyouts(service + sectionNav)
        const dropdowns = document.getElementsByClassName('-is-open')
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i]
            openDropdown.classList.remove('-is-open')
        }
    }

    const resizeHandler =
        !closeOnResize ||
        debounce(function (event) {
            if (window.innerWidth > closeOnResize.breakpoint && isOpen()) {
                toggle()
            }
        }, closeOnResize.delay)

    const focusHandler = function (event) {
        if (isDescendant(focusTarget[0], event.target)) {
            if (!rootElement.checked) {
                toggleHandler(event)
            }
        }
    }

    const toggleHandler = function (event) {
        //event.preventDefault();
        event.stopPropagation()
        toggle()
    }

    const isOpen = function () {
        return rootElement.checked
    }

    const isToggleClassActive = function () {
        let isToggleClassSet = true
        for (let i = 0; i < target.length; i++) {
            if (isToggleClassSet) {
                isToggleClassSet = target[i].classList.contains(toggleClass)
            }
        }
        return isToggleClassSet
    }

    const isAtLeastOneToggleClassInactive = function () {
        let isToggleClassInactive = false
        for (let i = 0; i < target.length; i++) {
            if (!isToggleClassInactive) {
                isToggleClassInactive = !target[i].classList.contains(toggleClass)
            }
        }
        return isToggleClassInactive
    }

    const toggle = function () {
        if (closeOthers) {
            toggleAllOtherInstances(id)
        }
        // schließe alle offenen Flyouts(service + sectionNav)
        if (closeFlyout) {
            toggleAllFlyouts()
        }

        //ziel(zum klasse wechseln) unterscheidet sich von quelle(event)
        if (target) {
            if (target.length) {
                if (isOpen() && isAtLeastOneToggleClassInactive()) {
                    //kein foreach weil das nicht mit nodelists funktioniert
                    for (let i = 0; i < target.length; i++) {
                        if (!target[i].classList.contains(toggleClass)) {
                            target[i].classList.toggle(toggleClass)
                        }
                    }
                } else {
                    for (let i = 0; i < target.length; i++) {
                        target[i].classList.toggle(toggleClass)
                    }
                }

                var isToggleClassSet = isToggleClassActive()
                //toggleCheck
                if (isToggleChecked) {
                    rootElement.checked = isToggleClassSet
                }
                //onTarget
                if (checkbox && checkbox.length) {
                    for (let j = 0; j < checkbox.length; j++) {
                        if (checkbox[j].checked) {
                            checkbox[j].checked = isToggleClassSet
                        }
                    }
                }
            }
        } else {
            rootElement.classList.toggle(toggleClass)

            if (isToggleChecked) {
                rootElement.checked = element[0].classList.indexOf(toggleClass) > -1
            }
        }

        //event listener hinzufügen
        if (closeFromOutside && rootElement.checked) {
            document.addEventListener(reactTo, closeHandler)
        }
        if (closeFromOutside && !rootElement.checked) {
            document.removeEventListener(reactTo, closeHandler)
        }
    }

    console.log('Toggle Test')
    //wenn nicht gesetz default auf click
    if (!reactTo) {
        reactTo = 'click'
    }

    //wenn an einem bestimmten breakpoint getoggeld werden soll
    if (closeOnResize !== null) {
        window.addEventListener('resize', resizeHandler)
    }

    //wenn focus öffnen gewollt ist listener darauf
    if (focusTarget && focusTarget[0]) {
        //focus ist doof. bubbelt net
        focusTarget[0].addEventListener('keydown', focusHandler)
    }

    //gibt es ein element und ist die klasse angegeben?
    if (rootElement && toggleClass) {
        //state checken und eventuell klassen setzen
        if (rootElement.checked && closeOnInit) {
            rootElement.checked = false
        } else if (rootElement.checked) {
            if (target && target.length) {
                for (let i = 0; i < target.length; i++) {
                    target[i].classList.toggle(toggleClass)
                }
            } else if (target) {
                rootElement.classList.toggle(toggleClass)
            }
        }

        rootElement.addEventListener(reactTo, toggleHandler)
    }

    if (initialState && initialState.length > 0) {
        for (let j = 0, length = initialState.length; j < length; j++) {
            const state = initialState[j]

            switch (state.action) {
                case 'toggleOnVw':
                    const vw = getViewportWidth()

                    if (state.vw < vw) {
                        toggle()
                    }
                    break

                case 'removeClassOnTarget':
                    if (target && target.length) {
                        for (let k = 0; k < target.length; k++) {
                            target[k].classList.remove(toggleClass)
                        }
                    }
                    break
            } //end switch
        }
    }

    //privileged function
    this.isOpen = function () {
        return isOpen()
    }
    this.toggle = function () {
        //aufruf private methode
        toggle()
    }
    this.getName = function () {
        return id
    }

    ToggleClassInstances.push(this)
}
export default ToggleClass
