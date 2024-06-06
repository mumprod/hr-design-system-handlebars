import { userEvent, within, waitFor } from '@storybook/testing-library';
import videoJson from 'components/mediaplayer/fixtures/mediaplayer.json'

import mediaPlayer from 'components/mediaplayer/media_player.hbs'
import { delay } from 'underscore';

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
        _uiTestHook: {
            control: 'text',
            description: 'Hierüber kann eine CSS Hook Klasse gesetzt werden, um den Player Container in einem UI-Test einfach selektieren zu können.',
            defaultValue: {
                summary: 'ui-test-mediaplayer',
            }
        }
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
        userEvent.keyboard('[Space]', { delay: 1000 })
        userEvent.keyboard('{ArrowLeft}', { delay: 1500 })
        await userEvent.click(await canvas.findByTitle('Einstellungen an / aus'), { delay: 2000 });
    },
}

export const VideoplayerLive = {
    render: Template.bind({}),
    name: 'Videoplayer Livestream',
    args: { "_isTeaser": false, ...videoJson.video_livestream },
}
