import verticalVideoTeaser from './verticalVideoTeaserGroup.hbs'

import teaserGroup100 from '../fixtures/teaser_vertical_video.json'


const verticalVideoTeaserTemplate = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return verticalVideoTeaser({ text, ...args })
}


export default {
    title: 'Komponenten/Teaser/🚧 Hochkant-Videos',

    argTypes: {
        teaserSize: {
            control: {
                type: 'select',
                options: ['100', '66', '50', '33', '25'],
            },

            description: 'Teaser Größe',

            table: {
                defaultValue: {
                    summary: '100',
                },
            },
        },
    },

    parameters: {
        layout: 'fullscreen',
        chromatic: {
            diffThreshold: 0.3,
        },
    },

    decorators: [
        (Story) => {
            return `<div class="grid my-5 grid-page">
               <div class=" py-6 bg-white sm:px-9.5 col-full sm:col-main gap-x-6 md:gap-y-14 gap-y-6">
                 ${Story()}
               </div>
             </div>`
        },
    ],
}

export const $verticalVideo4 = {
    render: verticalVideoTeaserTemplate.bind({}),
    name: '4 Videos',
    args: teaserGroup100.includeModel,
}
