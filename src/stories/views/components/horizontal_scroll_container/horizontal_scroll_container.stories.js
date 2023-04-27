import horizontal_scroll_container from './horizontal_scroll_container_example.hbs'
import * as Data from '../site_header/fixtures/site_header_default.json' 

const NavigationDataWithTeaser = {}

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return horizontal_scroll_container({ brand, ...args })
}

export default {
    title: 'Komponenten/Horizontal Scroll Container/Horizontal Scroll Container',
    argTypes: {},

    parameters: {
        chromatic: {
            viewports: [360, 768, 1024],
        },

        layout: 'fullscreen',

        docs: {
            inlineStories: true,
            iframeHeight: 400,
        },
    },
}

export const Default = {
    render: Template.bind({}),
    name: 'Default',
    args: Data,
}