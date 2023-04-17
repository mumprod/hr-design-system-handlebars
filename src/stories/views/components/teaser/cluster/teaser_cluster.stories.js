import cluster from './teaser_cluster.hbs'
import clusterTeaser100 from '../fixtures/cluster_teaser_100.json'
import clusterTeaser50 from '../fixtures/cluster_teaser_50.json'
import clusterTeaser33 from '../fixtures/cluster_teaser_33.json'
import clusterTeaserOrdered100 from '../fixtures/cluster_teaser_ordered_100.json'
import clusterTeaserOrdered50 from '../fixtures/cluster_teaser_ordered_50.json'
import clusterTeaserOrdered33 from '../fixtures/cluster_teaser_ordered_33.json'
import clusterTeaserExtern100 from '../fixtures/cluster_teaser_extern_100.json'
import clusterTeaserExtern50 from '../fixtures/cluster_teaser_extern_50.json'
import clusterTeaserExtern33 from '../fixtures/cluster_teaser_extern_33.json'
import clusterTeaserGenre100 from '../fixtures/cluster_teaser_100_genre.json'
import clusterTeaserGenre50 from '../fixtures/cluster_teaser_50_genre.json'
import clusterTeaserGenre33 from '../fixtures/cluster_teaser_33_genre.json'
import clusterTeaserImage100 from '../fixtures/cluster_teaser_100_image.json'
import clusterTeaserImage50 from '../fixtures/cluster_teaser_50_image.json'
import clusterTeaserImage33 from '../fixtures/cluster_teaser_33_image.json'
import PodcastChannelClusterTeaser from '../fixtures/cluster_teaser_Podcast_Channel.json'
import clusterTeaserOrdered33LongTitle from '../fixtures/cluster_teaser_33_long_title.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return cluster({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Cluster',

    parameters: {
        layout: '',
    },

    argTypes: {},

    decorators: [
        (Story) => {
            return `<div class="grid grid-page"><div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div></div>`
        },
    ],
}

export const Kurzmeldungen100 = {
    render: Template.bind({}),
    name: 'Kurzmeldungen 100',
    args: clusterTeaser100,
}

export const Kurzmeldungen50 = {
    render: Template.bind({}),
    name: 'Kurzmeldungen 50',
    args: clusterTeaser50,
}

export const Kurzmeldungen33 = {
    render: Template.bind({}),
    name: 'Kurzmeldungen 33',
    args: clusterTeaser33,
}

export const SchlagzeilenMitGenrebild100 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Genrebild 100',
    args: clusterTeaserGenre100,
}

export const SchlagzeilenMitGenrebild50 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Genrebild 50',
    args: clusterTeaserGenre50,
}

export const SchlagzeilenMitGenrebild33 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Genrebild 33',
    args: clusterTeaserGenre33,
}

export const SchlagzeilenMitTeaserbild100 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Teaserbild 100',
    args: clusterTeaserImage100,
}

export const SchlagzeilenMitTeaserbild50 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Teaserbild 50',
    args: clusterTeaserImage50,
}

export const SchlagzeilenMitTeaserbild33 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Teaserbild 33',
    args: clusterTeaserImage33,
}

export const MeistgeklicktWanda100 = {
    render: Template.bind({}),
    name: 'Meistgeklickt/Wanda 100',
    args: clusterTeaserOrdered100,
}

export const MeistgeklicktWanda50 = {
    render: Template.bind({}),
    name: 'Meistgeklickt/Wanda 50',
    args: clusterTeaserOrdered50,
}

export const MeistgeklicktWanda33 = {
    render: Template.bind({}),
    name: 'Meistgeklickt/Wanda 33',
    args: clusterTeaserOrdered33,
}

export const TagesschauSportschau100 = {
    render: Template.bind({}),
    name: 'tagesschau/sportschau 100',
    args: clusterTeaserExtern100,
}

export const TagesschauSportschau50 = {
    render: Template.bind({}),
    name: 'tagesschau/sportschau 50',
    args: clusterTeaserExtern50,
}

export const TagesschauSportschau33 = {
    render: Template.bind({}),
    name: 'tagesschau/sportschau 33',
    args: clusterTeaserExtern33,
}

export const PodcastEpisodenClusterTeaser = {
    render: Template.bind({}),
    name: 'PodcastEpisoden ClusterTeaser',
    args: PodcastChannelClusterTeaser,
}

export const MeistgeklicktBoxMitLangemTitel = {
    render: Template.bind({}),
    name: 'Meistgeklickt-Box mit langem Titel',
    args: clusterTeaserOrdered33LongTitle,
}
