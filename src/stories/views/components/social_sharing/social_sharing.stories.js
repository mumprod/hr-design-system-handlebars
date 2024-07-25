import story_template_horizontal from './social_sharing_horizontal.hbs'
import story_template_mobile from './social_sharing_mobile.hbs'
import socialSharing from '../page/story/fixtures/story.json'

console.log(socialSharing)

const Template_horizontal = ({ ...args }) => {
    return story_template_horizontal({ ...args })
}
const Template_mobile = ({ ...args }) => {
    return story_template_mobile({ ...args })
}
export default {
    title: 'Komponenten/Social Sharing',
}

export const Default = {
    render: Template_horizontal.bind({}),
    name: 'Social Sharing Horizontal',
    args: socialSharing,
    parameters: {
        chromatic: {
            viewports: [360, 1024],
        },
    },
}
export const Mobile = {
    render: Template_mobile.bind({}),
    name: 'Social Sharing Mobile',
    args: socialSharing,
    parameters: {
        layout: 'fullscreen',
        chromatic: {
            viewports: [360, 1024],
        },
    },
    decorators: [
        (Story) => {
            return `<div class="min-h-screen flex items-end bg-slate-200">  
             ${Story()} 
             </div>`
        },
    ],
}
