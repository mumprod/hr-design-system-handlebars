import FeatureList from './featureList'
import Feature from './feature'

test('find one feature', () => {
    // Given
    const callbackMock = jest.fn()
    const element = {
        attributes: [
            {
                name: 'data-hr-feature',
                value: '{"foo":"bar"}'
            },
            {
                name: 'foo',
                value: 'bar'
            }
        ]
    }
    const objectUnderTest = FeatureList(element, 'data-hr-')

    // When
    objectUnderTest.forEach(callbackMock)

    // Then
    expect(callbackMock.mock.calls.length).toBe(1)
    expect(callbackMock.mock.calls[0][0].context.featureName).toEqual('feature')
    expect(callbackMock.mock.calls[0][0].context.options).toEqual({
        foo: 'bar'
    })
    expect(callbackMock.mock.calls[0][0].context.element).toBe(element)
})

test('find two feature', () => {
    // Given
    const callbackMock = jest.fn()
    const element = {
        attributes: [
            {
                name: 'data-hr-feature1'
            },
            {
                name: 'data-hr-feature2'
            }
        ]
    }
    const objectUnderTest = FeatureList(element, 'data-hr-')

    // When
    objectUnderTest.forEach(callbackMock)

    // Then
    expect(callbackMock.mock.calls.length).toBe(2)
    expect(callbackMock.mock.calls[0][0].context.featureName).toBe('feature1')
    expect(callbackMock.mock.calls[1][0].context.featureName).toBe('feature2')
})

test('find no feature', () => {
    // Given
    const callbackMock = jest.fn()
    const element = {
        attributes: [
            {
                name: 'foo'
            }
        ]
    }
    const objectUnderTest = FeatureList(element, 'data-hr-')

    // When
    objectUnderTest.forEach(callbackMock)

    // Then
    expect(callbackMock.mock.calls.length).toBe(0)
})

test("don't fail on null", () => {
    // Given
    const element = null
    const callbackMock = jest.fn()
    const objectUnderTest = FeatureList(element, 'data-hr-')

    // When
    objectUnderTest.forEach(callbackMock)

    // Then
    expect(callbackMock.mock.calls.length).toBe(0)
})

test("don't fail without attributes", () => {
    // Given
    const element = {}
    const callbackMock = jest.fn()
    const objectUnderTest = FeatureList(element, 'data-hr-')

    // When
    objectUnderTest.forEach(callbackMock)

    // Then
    expect(callbackMock.mock.calls.length).toBe(0)
})
