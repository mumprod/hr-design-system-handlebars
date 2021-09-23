import FlatContextMap from './FlatContextMap'

describe('load feature with module name', () => {
    test('flatten one dependencies', () => {
        // Given
        const extRegExp = /\.extension$/
        const dependenciesMock = [
            {
                userRequest: '/path/file.extension'
            }
        ]

        const functionUnderTest = FlatContextMap(extRegExp)

        // When
        const dependencies = functionUnderTest(dependenciesMock)

        // Then
        expect(dependencies[0].userRequest).toBe('./file')
    })

    test('flatten all dependencies', () => {
        // Given
        const extRegExp = ''
        const dependenciesMock = [
            {
                userRequest: '/path/file1.extension'
            },
            {
                userRequest: '/path/file2.extension'
            }
        ]

        const functionUnderTest = FlatContextMap(extRegExp)

        // When
        const dependencies = functionUnderTest(dependenciesMock)

        // Then
        expect(dependencies[0].userRequest).toBe('./file1.extension')
        expect(dependencies[1].userRequest).toBe('./file2.extension')
    })
})
