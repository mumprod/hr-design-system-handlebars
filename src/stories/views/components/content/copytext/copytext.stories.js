import copytext from './copytext.hbs'
import copytext_json from './fixtures/copytext.json'
import copytext_media_components_json from './fixtures/copytext_media_components.json'
import copytext_non_media_components_json from './fixtures/copytext_non_media_components.json'
import copytext_posterteaser_json from './fixtures/copytext_posterteaser.json'
import copytext_additionalInfo_json from './fixtures/copytext_additionalInfo.json'
import copytext_cite_json from './fixtures/copytext_cite.json'
import copytext_podcastepisode_json from './fixtures/copytext_podcastepisode.json'
import copytext_faq_json from './fixtures/copytext_faq.json'
import copytext_jobposting_json from './fixtures/copytext_jobposting.json'
import copytext_image_json from './fixtures/copytext_image.json'
import copytext_infobox_json from './fixtures/copytext_infobox.json'
import copytext_downloadbox_json from './fixtures/copytext_downloadbox.json'
import copytext_filedownload_json from './fixtures/copytext_filedownload.json'
import copytext_externalservice_json from './fixtures/copytext_externalservice.json'
import copytext_video_json from './fixtures/copytext_video.json'
import copytext_audio_json from './fixtures/copytext_audio.json'
import copytext_audio_event_stream_json from './fixtures/copytext_audio_livestream.json'
import copytext_livestream_json from './fixtures/copytext_livestream.json'

const Template = ({ ...args }) => {
    return copytext({ ...args })
}

export default {
    title: 'Komponenten/Content/Copytext',
    decorators: [
        (Story) => {
            return `<div class="grid grid-page">
                        <div class="grid bg-white grid-article">
                            ${Story()} 
                        </div>
                    </div>`
        },
    ],
    parameters: { layout: 'fullscreen', chromatic: { disableSnapshot: true } }
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: copytext_json,
}

export const WithDownloadbox = {
    render: Template.bind({}),
    name: 'Download-Box',
    args: copytext_downloadbox_json,
}

export const WithExternalservice = {
    render: Template.bind({}),
    name: 'Externe Dienste',
    args: copytext_externalservice_json,
}

export const WithFAQ = {
    render: Template.bind({}),
    name: 'FAQ',
    args: copytext_faq_json,
}

export const WithFiledownload = {
    render: Template.bind({}),
    name: 'File-Download',
    args: copytext_filedownload_json,
}

export const WithImage = {
    render: Template.bind({}),
    name: 'Image',
    args: copytext_image_json,
}
export const WithImageWebview = {
    render: Template.bind({}),
    name: 'Image Webview',

    args: {
        ...copytext_image_json,
        _isWebview: true
    }
}
export const WithInfobox = {
    render: Template.bind({}),
    name: 'Infobox',
    args: copytext_infobox_json,
}

export const WithJobposting = {
    render: Template.bind({}),
    name: 'Jobposting',
    args: copytext_jobposting_json,
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

export const WithVideo = {
    render: Template.bind({}),
    name: 'Video',
    args: copytext_video_json,
}

export const WithLivestream = {
    render: Template.bind({}),
    name: 'Livestream',
    args: copytext_livestream_json,
}
export const WithAudio = {
    render: Template.bind({}),
    name: 'Audio',
    args: copytext_audio_json,
}

export const WithAudioEventStream = {
    render: Template.bind({}),
    name: 'Audio-Livestream',
    args: copytext_audio_event_stream_json,
}

export const SnapshotWithMedia = {
    render: Template.bind({}),
    name: 'Snapshot 1',
    args: copytext_media_components_json,
    parameters: {
        chromatic: { disableSnapshot: false },
    },
}

export const SnapshotWithoutMedia = {
    render: Template.bind({}),
    name: 'Snapshot 2',
    args: copytext_non_media_components_json,
    parameters: {
        chromatic: { disableSnapshot: false },
    },
}
