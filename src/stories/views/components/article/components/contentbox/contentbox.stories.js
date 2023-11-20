import contentbox from './contentbox.hbs'
import contentboxJson from '../../../teaser/fixtures/contentbox.json'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<span>${topline}</span>`;
    return contentbox({ ...args })
}

export default {
    title: 'Komponenten/Artikel/Komponenten/ContentBox',
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: contentboxJson.copytext,
}
