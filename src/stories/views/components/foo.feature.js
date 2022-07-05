import { hr$ } from 'hrQueryDs'
const Foo = (context) => {
    const { options } = context
    const { element: rootElement } = context
    const { test } = options

    const init = () => {
        console.log(rootElement)
        console.log(hr$('.inner', rootElement))
        console.log(`Feature ${test} geladen`)
    }

    init()
}

export default Foo
