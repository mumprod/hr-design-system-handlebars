import contentfooter from './content_footer.hbs'
import contentfooterjson from './fixtures/content_footer.json'

const Template = ({ ...args }) => {
    return contentfooter({ ...args })
}

export default {
    title: 'Komponenten/Content/Content-Footer',
    decorators: [
        (Story) => {
            return `<div class="max-w-[940px]">  
             ${Story()} 
             </div>`
        },
    ],
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: contentfooterjson,
}