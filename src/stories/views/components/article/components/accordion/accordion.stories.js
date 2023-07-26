import accordion from './accordion.hbs'
import accordionJson from '../../../teaser/fixtures/accordion.json'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<span>${topline}</span>`;
    return accordion({ ...args })
}

export default {
    title: 'Komponenten/Artikel/Komponenten/Akkordeon',
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: accordionJson,
}
