import DomElementList from './domElementList'

test('find one elements', () => {
    // Given
    const callbackMock = jest.fn()
    document.body.innerHTML = '<div class="js-load"></div>'

    // When
    const objectUnderTest = DomElementList(document, '.js-load')
    objectUnderTest.forEach(callbackMock)

    // Then
    expect(callbackMock.mock.calls.length).toBe(1)
})

test('find two elements', () => {
    // Given
    const callbackMock = jest.fn()
    document.body.innerHTML =
        '<div class="js-load"></div>' + '<div class="js-load"></div>'

    // When
    const objectUnderTest = DomElementList(document, '.js-load')
    objectUnderTest.forEach(callbackMock)

    // Then
    expect(callbackMock.mock.calls.length).toBe(2)
})

test('find zero elements', () => {
    // Given
    const callbackMock = jest.fn()
    document.body.innerHTML = ''

    // When
    const objectUnderTest = DomElementList(document, '.js-load')
    objectUnderTest.forEach(callbackMock)

    // Then
    expect(callbackMock.mock.calls.length).toBe(0)
})
