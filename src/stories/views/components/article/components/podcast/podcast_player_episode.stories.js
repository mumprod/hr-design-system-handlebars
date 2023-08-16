import podcast_player_episode from './podcast_player_episode.hbs'
import podcastPlayerEpisodeJson from './fixtures/podcast_player_episode.json'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<span>${topline}</span>`;
    return podcast_player_episode({ ...args })
}

export default {
    title: 'Komponenten/Artikel/Komponenten/Podcast-Player (Episode)',
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: podcastPlayerEpisodeJson.logicItem.includeModel,
}

export const Bla = {
    render: Template.bind({}),
    name: 'bla',
    args: podcastPlayerEpisodeJson.logicItem.includeModel,
}