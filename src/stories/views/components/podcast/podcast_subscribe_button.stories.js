import { resetComponents } from '@storybook/components'
import { userEvent, within } from '@storybook/test'
import subscribeButtonJson from 'components/teaser/fixtures/teaser_podcast.json'

import subscribeButton from 'components/podcast/components/podcast_subscribe_button.hbs'

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
    args: subscribeButtonJson.episode_100.args.logicItem.includeModel.podcastChannel,
}

export const SubscribeButtonOpen = {
    render: Template.bind({}),
    name: 'Subscribe Button Open',

    args: subscribeButtonJson.episode_100.args.logicItem.includeModel.podcastChannel,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        const button = canvas.getByRole('button')

        await userEvent.click(button)
    },
}
