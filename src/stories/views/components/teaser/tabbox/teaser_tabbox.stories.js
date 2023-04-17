import tabbox from './teaser_tabbox.hbs'
import tabboxData from '../fixtures/teaser_tabbox.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return tabbox({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Tabbox',

    parameters: {
        chromatic: {
            viewports: [360, 768, 1024],
        },

        layout: 'fullscreen',
    },

    argTypes: {},

    decorators: [
        (Story) => {
            return `<div class="grid my-5 grid-page">
                     <div>
                         ${Story()}
                     </div>
                 </div>`
        },
    ],
}

export const Beispiel1 = {
    render: Template.bind({}),
    name: 'Beispiel 1',
    args: tabboxData.includeModel,
}
