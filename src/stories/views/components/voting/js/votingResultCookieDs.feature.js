import { setJSONCookie } from 'hrQuery'

const VotingResultCookie = function (context) {
    'use strict'
    const { options } = context,
        cookie = options.votingId,
        voteCookieLifetime = options.cookieLifetime * 60 * 1000
    console.log(voteCookieLifetime)
    setJSONCookie(cookie, true, voteCookieLifetime)
}

export default VotingResultCookie
