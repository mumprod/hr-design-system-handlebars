import featuredcontent from './teaser_featured_content.hbs'
import teaserFeaturedContent from '../fixtures/teaser_featured_content.json'

const Template = ({ ...args }) => {
    return featuredcontent({ ...args })
}

export default {
    title: 'Komponenten/Teaser/Komponenten/Zeilenteaser',
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: teaserFeaturedContent,
}