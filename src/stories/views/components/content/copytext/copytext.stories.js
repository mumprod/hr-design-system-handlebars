import copytext from './copytext.hbs'
import copytext_json from './fixtures/copytext.json'

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