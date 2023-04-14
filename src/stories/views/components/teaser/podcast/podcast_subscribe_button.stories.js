import { resetComponents } from '@storybook/components'
import subscribeButtonJson from '../fixtures/teaser_podcast.json'

import subscribeButton from './podcast_subscribe_button.hbs'

const Template = ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return subscribeButton({ label, ...args })
}

export default {
    title: 'Komponenten/Teaser/Podcast/Komponenten',

    argTypes: {
        storybookOpen: {
            control: 'boolean',
            description: 'Offen',
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

export const SubscribeButtonClose = {
    render: Template.bind({}),
    name: 'Subscribe Button Close',
    args: subscribeButtonJson.logicItem.includeModel.podcastChannel,
}

export const SubscribeButtonOpen = {
    render: Template.bind({}),
    name: 'Subscribe Button Open',

    args: {
        ...subscribeButtonJson.logicItem.includeModel.podcastChannel,
        storybookOpen: true,
    },
}
