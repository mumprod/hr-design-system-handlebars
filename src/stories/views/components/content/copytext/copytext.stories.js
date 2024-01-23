import copytext from './copytext.hbs'
import copytext_json from './fixtures/copytext.json'
import copytext_posterteaser_json from './fixtures/copytext_posterteaser.json'
import copytext_additionalInfo_json from './fixtures/copytext_additionalInfo.json'
import copytext_cite_json from './fixtures/copytext_cite.json'
import copytext_podcastepisode_json from './fixtures/copytext_podcastepisode.json'
import copytext_faq_json from './fixtures/copytext_faq.json'
import copytext_image_json from './fixtures/copytext_image.json'

const Template = ({ ...args }) => {
    return copytext({ ...args })
}

export default {
    title: 'Komponenten/Content/Copytext',
    decorators: [
        (Story) => {
            return `<div class="max-w-[724px] mx-auto">  
             ${Story()} 
             </div>`
        },
    ],
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: copytext_json,
}

export const WithFAQ = {
    render: Template.bind({}),
    name: 'FAQ',
    args: copytext_faq_json,
}

export const WithPodcastEpisode = {
    render: Template.bind({}),
    name: 'Podcastepisode',
    args: copytext_podcastepisode_json,
}

export const WithPosterteaser = {
    render: Template.bind({}),
    name: 'Posterteaser',
    args: copytext_posterteaser_json,
}

export const WithCite = {
    render: Template.bind({}),
    name: 'Zitat',
    args: copytext_cite_json,
}

export const WithAdditionalInfo = {
    render: Template.bind({}),
    name: 'Zusatzinfo',
    args: copytext_additionalInfo_json,
}

export const WithImage = {
    render: Template.bind({}),
    name: 'Image',
    args: copytext_image_json,
}
