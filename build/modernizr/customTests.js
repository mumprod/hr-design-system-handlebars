window.Modernizr.addTest('ios', function () {
    return (
        !!navigator.userAgent.match(/iPad/i) ||
        !!navigator.userAgent.match(/iPhone/i) ||
        !!navigator.userAgent.match(/iPod/i)
    )
})

window.Modernizr.addTest('android', function () {
    return !!navigator.userAgent.match(/Android/i)
})

window.Modernizr.addTest('iosorandroid', function () {
    return Modernizr.ios || Modernizr.android
})

window.Modernizr.addTest('nodeListForEach', function () {
    return window.NodeList && NodeList.prototype.forEach
})

window.Modernizr.addTest('svg4everbody', function () {
    return (
        /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) ||
        (navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/) || [])[1] < 10547 ||
        (navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/) || [])[1] < 537
    )
})

//Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
Modernizr.addTest('touchevents', function () {
    var bool
    if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
        bool = true
    } else {
        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        var query = [
            '@media (',
            Modernizr._domPrefixes.join('touch-enabled),('),
            'heartz',
            ')',
            '{#modernizr{top:9px;position:absolute}}',
        ].join('')
        Modernizr.testStyles(query, function (node) {
            bool = node.offsetTop === 9
        })
    }
    return bool
})
