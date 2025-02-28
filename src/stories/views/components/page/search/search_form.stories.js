const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/page/search/search_form }} 
  `)

const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

export default {
    title: 'Komponenten/SearchForm',
    argTypes: {},

    parameters: {
        layout: 'fullscreen',

        docs: {
            inlineStories: false,
            iframeHeight: 400,
        },
        chromatic: {
            disableSnapshot: false
        },
    },
}

export const searchForm = {
    render: Template.bind({}),
    name: 'Suchformular',
}
