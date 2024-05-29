import story_template from './story_article.hbs'
import data_story from './fixtures/story.json'
import data_story_with_label from './fixtures/story_with_label.json'
import data_story_with_square_image from './fixtures/story_with_square_image.json'

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
    parameters: {
        layout: 'fullscreen',
    }
}

export const WithSquareImage = {
    render: Template.bind({}),
    name: 'Artikel mit 1:1-Bild',
    args: data_story_with_square_image,
    parameters: {
        layout: 'fullscreen',
    }
}

export const WithLabel = {
    render: Template.bind({}),
    name: 'Artikel mit Label',
    args: data_story_with_label,
    parameters: {
        layout: 'fullscreen',
        chromatic: { delay: 1000 }
    }
}