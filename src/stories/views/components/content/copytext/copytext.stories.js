import copytext from './copytext.hbs'
import copytext_json from './fixtures/copytext.json'
import copytext_posterteaser_json from './fixtures/copytext_posterteaser.json'

const Template = ({ ...args }) => {
    return copytext({ ...args })
}

export default {
    title: 'Komponenten/Content/Copytext',
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: copytext_json,
}

export const WithPosterteaser = {
    render: Template.bind({}),
    name: 'Posterteaser',
    args: copytext_posterteaser_json,
}