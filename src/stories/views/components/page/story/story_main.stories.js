import story_template from './story_article.hbs'
import story_json from './fixtures/story.json'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<span>${topline}</span>`;
    return story_template({ ...args })
}

export default {
    title: 'Seiten/Artikel',
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: story_json,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => {
            return `<div class="grid grid-page">     
                        ${Story()} 
                    </div>`
        },
    ],    
}