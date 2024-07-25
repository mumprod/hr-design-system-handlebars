import horizontal_scroll_container from './horizontal_scroll_container_example.hbs'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return horizontal_scroll_container({ brand, ...args })
}

export default {
    title: 'Komponenten/Utilities/Horizontal Scroll Container',
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

export const Example = {
    render: Template.bind({}),
    name: 'Example',
    args: null,
}
