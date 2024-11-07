import { hr$, getJSONCookie, replaceAnimated } from 'hrQuery'

const VotingCookieChecker = (context) => {
    const { options } = context,
        { element: rootElement } = context,
        votingId = options.votingId,
        votingWrapper = hr$('.js-voting-wrapper', rootElement)[0],
        hideVotingResult = options.hideVotingResult,
        alreadyVotedTmpl = '<p class="mt-6 text-base font-bold sm:text-xl font-heading sm:mt-12 dark:text-text-dark">' + options.alreadyVotedHintText + '<p>'
    let cookie = ''

    const checkForVotingCookie = function () {
        cookie = getJSONCookie(votingId)
        if (cookie) {
            let voting = hr$('#' + votingId)[0]
            let votingText = voting.querySelector('.c-voting-form__bottomWrapper')
            hideVotingResult
                ? replaceAnimated(votingText, alreadyVotedTmpl, true)
                : replaceAnimated(votingWrapper, hr$('.js-result', rootElement)[0].innerHTML, true)
        }
    }
    checkForVotingCookie()
}

export default VotingCookieChecker
