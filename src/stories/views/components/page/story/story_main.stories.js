import story_template from './story_article.hbs'
import data_story from './fixtures/story.json'
import data_story_with_label from './fixtures/story_with_label.json'

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
    name: 'Artikel mit Topline',
    args: data_story,
}

export const WithLabel = {
    render: Template.bind({}),
    name: 'Artikel mit Label',
    args: data_story_with_label,
}