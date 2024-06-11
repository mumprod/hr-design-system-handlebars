import appendix_template from './appendix.hbs'
import appendix_json from '../story/fixtures/story.json'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<span>${topline}</span>`;
    return appendix_template({ ...args })
}

export default {
    title: 'Seiten/Komponenten/Appendix',
    argTypes: {
        _isArticle: {
            control: 'boolean',
            description: 'Artikel',
        },
    },
    decorators: [
        (Story) => {
            return `<div class="max-w-[724px] mx-auto mt-14">  
             ${Story()} 
             </div>`
        },
    ],
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: appendix_json,
}
