import { isTrackingAllowed, pi } from 'base/tracking/atiHelperDs'

const ATIMediaHelper = function (
    avType,
    pageName,
    secondLevelId,
    length,
    multcid,
    multctype,
    multcdate,
    chapter
) {
    'use strict'
    ;(this.avType = avType),
        (this.secondLevelId = secondLevelId),
        (this.multcid = multcid),
        (this.multctype = multctype),
        (this.multcdate = multcdate),
        (this.chapter = chapter),
        (this.pageName = pageName),
        (this.length = length),
        (this.wasNeverPlayed = true)

    /*console.log(this.avType)
    console.log(this.secondLevelId)
    console.log(this.pageName)
    console.log(this.length)*/
}

ATIMediaHelper.prototype = {
    xtRichMediaVideoHelper: function (data) {
        if (window.xt_rm && isTrackingAllowed()) {
            console.log('XT_RM')
            console.log('A ID: ' + data.avType + '&plyr=' + data.pageName)
            console.log('B SECONDLEVELID: ' + data.secondLevelId)
            console.log('C PAGENAME: ' + data.pageName + ':' + data.avType + 'Play')
            console.log('D ACTION: ' + data.action)
            console.log('F REFRESH: ' + data.refresh)
            console.log('G DURATION: ' + data.length)
            console.log('H POSTIONBUF: ' + '0')
            console.log('H POSITION: ' + 'rmp=' + data.position)
            console.log('H POSITIONNEW: ' + data.positionNew)
            console.log('J DATARATE: ' + data.datarate)
            console.log('K LOCATION: ' + data.location)
            console.log('L TYPE: ' + data.type)
            console.log('M SIZE: ' + data.size)
            console.log('N FORMAT: ' + data.format)
            xt_rm(
                data.avType + '&plyr=' + data.pageName,
                data.secondLevelId,
                data.pageName + ':' + data.avType + 'Play',
                data.action,
                '',
                data.refresh,
                data.length,
                '&rmp=' + data.position + '&rmpf=' + data.positionNew + '&rmbufp=0',
                '',
                data.datarate,
                data.location,
                data.type,
                data.size,
                data.format
            )
        }
    },

    xtClickVideoHelper: function (data) {
        if (window.xt_click) {
            console.log('XT_CLICK ')
            var uniqueId = Math.abs(this.hashCode(data.pageName))
            uniqueId = uniqueId.length > 15 ? uniqueId.substring(0, 15) : uniqueId
            pi(
                data.pageName +
                    ':' +
                    data.avType +
                    'Play' +
                    '&pid=' +
                    uniqueId +
                    '&pchap=' +
                    data.chapter +
                    '&pidt=' +
                    data.x5 +
                    '&x1=' +
                    data.x1 +
                    '&x2=' +
                    data.x2 +
                    '&x5=' +
                    data.x5.substring(0, 8),
                data.secondLevelId
            )
        }
    },

    hashCode: function (string) {
        var hash = 0,
            i,
            chr
        if (string.length === 0) return hash
        for (i = 0; i < string.length; i++) {
            chr = string.charCodeAt(i)
            hash = (hash << 5) - hash + chr
            hash |= 0 // Convert to 32bit integer
        }
        return hash
    },

    trackInitialMediaPlay: function () {
        const data = {}

        if (this.wasNeverPlayed) {
            if (this.avType === 'livestreamVideo' || this.avType === 'livestreamAudio') {
                data.object = 'this'
                data.click = 'F'
                if (this.avType === 'livestreamVideo') {
                    data.pageName = this.pageName + ':video'
                    data.avType = 'video'
                } else {
                    data.pageName = this.pageName + ':audio'
                    data.avType = 'audio'
                }
                data.secondLevelId = this.secondLevelId
                data.x1 = this.multcid
                data.x2 = this.multctype
                data.x5 = this.multcdate
                data.chapter = this.chapter
                data.action = 'play'
                data.refresh = '10'
                data.length = ''
                data.position = '0'
                data.positionNew = '0'
                data.datarate = ''
                data.location = 'int'
                data.type = 'live'
                data.size = ''
                data.format = ''
            } else {
                data.object = 'this'
                data.click = 'F'
                data.avType = this.avType
                data.pageName = this.pageName
                data.secondLevelId = this.secondLevelId
                data.x1 = this.multcid
                data.x2 = this.multctype
                data.x5 = this.multcdate
                data.chapter = this.chapter
                data.action = 'play'
                data.refresh = ''
                data.length = this.length
                data.position = '0'
                data.positionNew = '0'
                data.datarate = '19'
                data.location = 'int'
                data.type = 'clip'
                data.size = '100000'
                data.format = '9'
            }

            this.xtClickVideoHelper(data)
            this.xtRichMediaVideoHelper(data)
        }

        this.wasNeverPlayed = false
    },

    trackMediaSeek: function (_from, _to) {
        console.log(_from)
        console.log(_to)

        const data = {}

        data.avType = this.avType
        data.pageName = this.pageName
        data.secondLevelId = this.secondLevelId
        data.x1 = this.multcid
        data.x2 = this.multctype
        data.x5 = this.multcdate
        data.chapter = this.chapter
        data.action = 'move'
        data.refresh = ''
        data.length = this.length
        data.position = _from
        data.positionNew = _to
        data.datarate = ''
        data.location = 'int'
        data.type = 'clip'
        data.size = ''
        data.format = ''

        this.xtRichMediaVideoHelper(data)
    },
}

export default ATIMediaHelper
