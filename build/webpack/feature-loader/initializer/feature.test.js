import Feature from './feature'

describe('load feature with module name', () => {
    const moduleMock = { default: () => {} }

    test('simple module name', () => {
        // Given
        const loaderSpy = jest.fn().mockResolvedValue(moduleMock)

        const objectUnderTest = Feature('name')

        // When
        objectUnderTest.execute(loaderSpy)

        // Then
        expect(loaderSpy.mock.calls.length).toBe(1)
        expect(loaderSpy.mock.calls[0][0]).toBe('name')
    })

    test('module name with hyphen', () => {
        // Given
        const loaderSpy = jest.fn().mockResolvedValue(moduleMock)

        const objectUnderTest = Feature('foo-bar')

        // When
        objectUnderTest.execute(loaderSpy)

        // Then
        expect(loaderSpy.mock.calls.length).toBe(1)
        expect(loaderSpy.mock.calls[0][0]).toBe('fooBar')
    })

    test('TypeError when name is undefined', () => {
        expect(() => Feature()).toThrowError(TypeError)
    })
})

describe('execute feature with context', () => {
    const makeLoderMock = moduleSpy => featureName => Promise.resolve({ default: moduleSpy })

    test('module name of context', done => {
        // Given
        const objectUnderTest = Feature('name')

        // When
        objectUnderTest.execute(
            makeLoderMock(context => {
                // Then
                expect(context.featureName).toEqual('name')
                done()
            })
        )
    })

    test('value to context options', done => {
        // Given
        const objectUnderTest = Feature('name', '{"foo": "bar"}')

        // When
        objectUnderTest.execute(
            makeLoderMock(context => {
                // Then
                expect(context.options).toEqual({ foo: 'bar' })
                done()
            })
        )
    })

    test('default context options for empty value', done => {
        // Given
        const objectUnderTest = Feature('name', null)

        // When
        objectUnderTest.execute(
            makeLoderMock(context => {
                // Then
                expect(context.options).toEqual({})
                done()
            })
        )
    })

    test('dom element of context', done => {
        // Given
        const domElement = { name: 'div' }
        const objectUnderTest = Feature('name', '', domElement)

        // When
        objectUnderTest.execute(
            makeLoderMock(context => {
                // Then
                expect(context.element).toBe(domElement)
                done()
            })
        )
    })
})
