var VotingCookieChecker =
    VotingCookieChecker ||
    function (options) {
        'use strict'

        var settings = JSON.parse(options.data),
            element = hr$(options.selector)[0],
            votingId = settings.votingId,
            cookie = '',
            votingWrapper = hr$('.js-voting-wrapper', element)[0],
            hideVotingResult = settings.hideVotingResult,
            alreadyVotedTmpl = '<p>' + settings.alreadyVotedHintText + '<p>',
            checkForVotingCookie = function () {
                cookie = hr$.getJSONCookie(votingId)
                if (cookie) {
                    var voting = hr$('#' + votingId)[0]
                    var votingText = voting.querySelector('.c-voting-form__bottomWrapper')
                    hideVotingResult
                        ? hr$.replaceAnimated(votingText, alreadyVotedTmpl, true)
                        : hr$.replaceAnimated(
                              votingWrapper,
                              hr$('.js-result', element)[0].innerHTML,
                              true
                          )
                }
            }
        checkForVotingCookie()
    }
hrScriptLoad.load('votingCookieChecker', ['hrQueryOld'], function (options) {
    new VotingCookieChecker(options)
})
