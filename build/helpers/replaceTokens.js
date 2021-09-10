module.exports = function () {
    var tokenStr = null

    if (arguments.length >= 1) {
        tokenStr = arguments[0]

        // Exchange variables in token-string
        // - the last argument is the "context" object which can be ignored
        for (var i = 1; i < arguments.length - 1; ++i) {
            var tokenStrRegExp = new RegExp('\\{' + (i - 1) + '\\}', 'gi')
            tokenStr = tokenStr.replace(tokenStrRegExp, arguments[i])
        }
    }

    return tokenStr
};
  