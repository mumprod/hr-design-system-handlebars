import teaser from './teaser_logic.hbs'
import index_site from '../fixtures/teaser_index.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaser({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Logic',

    parameters: {
        layout: 'fullscreen',
    },

    argTypes: {},

    decorators: [
        (Story) => {
            return `<div class="grid bg-white grid-page">   
                         <div class="grid grid-cols-12 py-6 bg-white sm:px-9.5 col-full sm:col-main gap-x-6 gap-y-6">                            
                             ${Story()}                            
                         </div>
                     </div>`
        },
    ],
}

export const Logic = {
    render: Template.bind({}),
    name: 'logic',
    args: index_site,
}
