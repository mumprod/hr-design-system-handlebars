import story_template from './social_sharing_compact.hbs'
import socialSharing from '../page/story/fixtures/story.json'

console.log(socialSharing)
const Template = ({ ...args }) => {
    return story_template({ ...args })
}

export default {
    title: 'Komponenten/Social Sharing',
} 

export const Default = {
    render: Template.bind({}),
    name: 'Social Sharing Kompakt',
    args: socialSharing
    
}
