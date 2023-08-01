import socialMediaLinks from './social_media_links.hbs'
import socialMediaLinksData from './fixtures/social_media_links.json'


const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${socialMediaLinks}</div>`;
    return socialMediaLinks({ ...args })
}

export default {
    title: 'Komponenten/Content/SocialMediaLinks',

    argTypes: {
    },

    decorators: [
        (Story) => {
            return `<div class="relative py-8">  
             ${Story()} 
             </div>`
        },
    ],
}

export const ThreeLinks = {
    render: Template.bind({}),
    name: '3 Links',

    args: {
        ...socialMediaLinksData
    },
}
