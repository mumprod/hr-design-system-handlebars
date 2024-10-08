import story_template from './story_article.hbs'
import data_story from './fixtures/story.json'
import data_story_with_label from './fixtures/story_with_label.json'
import data_story_with_square_image from './fixtures/story_with_square_image.json'
import data_story_with_video from './fixtures/story_with_video.json'
import data_story_with_livestream from './fixtures/story_with_livestream.json'
import data_story_with_audio from './fixtures/story_with_audio.json'

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
    },
}
export const Webview = {
    render: Template.bind({}),
    name: 'Webview Artikel mit Topline',
    args: {
        ...data_story,
        _webview: true
    },
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
    },
}

export const WithLabel = {
    render: Template.bind({}),
    name: 'Artikel mit Label und Print Icon',
    args: data_story_with_label,
    parameters: {
        layout: 'fullscreen',
        chromatic: { delay: 1000 },
    },
}

export const WithVideo = {
    render: Template.bind({}),
    name: 'Artikel mit Video im Aufmacher',
    args: data_story_with_video,
    parameters: {
        layout: 'fullscreen',
    },
}



export const WithLivestream = {
    render: Template.bind({}),
    name: 'Artikel mit Livestream im Aufmacher',
    args: data_story_with_livestream,
    parameters: {
        layout: 'fullscreen',
    },
}

export const WithAudio = {
    render: Template.bind({}),
    name: 'Artikel mit Audio im Aufmacher',
    args: data_story_with_audio,
    parameters: {
        layout: 'fullscreen',
    }
}

