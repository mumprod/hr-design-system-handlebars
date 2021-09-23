import Initializer from './initializer'

describe('initializer', () => {
    const makeLoderMock = moduleSpy => moduleName => Promise.resolve({ default: moduleSpy })

    test('execute feature', done => {
        // Given
        document.body.innerHTML =
            '<div class="js-load" data-hr-feature-name=\'{"foo":"bar"}\'></div>'

        // When
        Initializer.run(
            document,
            makeLoderMock(context => {
                expect(context.featureName).toBe('featureName')
                expect(context.options).toEqual({ foo: 'bar' })
                expect(context.element).not.toBeNull()
                done()
            })
        )
    })
})
