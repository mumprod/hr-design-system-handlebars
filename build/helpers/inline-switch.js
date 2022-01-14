module.exports = function (input, cases, values) {
    console.log(`Test:${input}`)
    const casesArray = eval(cases)
    const valuesArray = eval(values)
    const defaultValue =
        casesArray.length < valuesArray.length ? valuesArray[valuesArray.length - 1] : ''

    return casesArray.indexOf(input) > -1 ? valuesArray[casesArray.indexOf(input)] : defaultValue
}
