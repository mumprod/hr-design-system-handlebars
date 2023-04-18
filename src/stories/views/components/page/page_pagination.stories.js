import { NavigationDataWithMixedContent } from './page_pagination.data.js'
import page from './page_pagination.hbs'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page({ brand, ...args })
}

export default {
    title: 'Komponenten/Page/Pagination',
    argTypes: {},

    parameters: {
        chromatic: {
            viewports: [360, 768, 1024],
        },

        layout: 'fullscreen',

        docs: {
            inlineStories: false,
            iframeHeight: 400,
        },
    },
}

export const MitPagination = {
    render: Template.bind({}),
    name: 'Mit Pagination',
    args: NavigationDataWithMixedContent,
}
