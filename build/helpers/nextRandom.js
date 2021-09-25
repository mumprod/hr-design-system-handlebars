module.exports = function () {    
    let randomNumber 
    const generateRandom = function() {
        let min = Math.ceil(0)
        let max = Math.floor(999)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    randomNumber = generateRandom()
    window.randomNumber = randomNumber
    return randomNumber
}
