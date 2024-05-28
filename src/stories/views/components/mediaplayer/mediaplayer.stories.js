import { userEvent, within } from '@storybook/testing-library';
import videoJson from 'components/mediaplayer/fixtures/mediaplayer.json'

import mediaPlayer from 'components/mediaplayer/media_player.hbs'

const Template = ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return mediaPlayer({ label, ...args })
}

export default {
    title: 'Komponenten/Mediaplayer',

    argTypes: {
        _isTeaser: {
            control: 'boolean',
            description: 'Legt fest, ob der Player in einem Teaser verwendet wird und, falls dies der Fall ist, ein statisches Teaser-Bild vorgeschaltet bekommt.',
        },
    },

    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },

    decorators: [
        (Story) => {
            return `<div class="flex flex-row pt-5">
                         ${Story()} 
                     </div>`
        },
    ],
}

export const Videoplayer = {
    render: Template.bind({}),
    name: 'Videoplayer',
    args: { "_isTeaser": false, ...videoJson.video },
}

export const VideoplayerSettings = {
    render: Template.bind({}),
    name: 'Videoplayer Einstellungen',
    args: { "_isTeaser": false, ...videoJson.video },
    play: async ({ canvasElement }) => {
        let canvas = within(canvasElement);
        await userEvent.click(await canvas.findByTitle('Wiedergabe [Leertaste]'));
        //await console.log(await canvas.findByTitle('Pause [Leertaste oder K]'))
        const pauseButton = canvas.getByRole('button', { name: 'Pause [Leertaste oder K]' })
        await userEvent.keyboard('{space}')
        //await userEvent.click(pauseButton);
        //console.log(canvas.getByRole('button', { name: 'Pause [Leertaste oder K]' }))
        //await userEvent.click(await canvas.findByTitle('Einstellungen an / aus'));
    },
}

export const VideoplayerLive = {
    render: Template.bind({}),
    name: 'Videoplayer Livestream',
    args: { "_isTeaser": false, ...videoJson.video_livestream },
}
