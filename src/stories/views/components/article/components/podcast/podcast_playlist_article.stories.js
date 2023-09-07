import podcast_playlist_article from './podcast_playlist_article.hbs'
import podcastPlayerPlaylistJson from './fixtures/podcast_player_playlist.json'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<span>${topline}</span>`;
    return podcast_playlist_article({ ...args })
}

export default {
    title: 'Komponenten/Artikel/Komponenten/Podcast-Player (Channel)',
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: podcastPlayerPlaylistJson.teaserPodcastPlaylist.logicItem.includeModel,
}