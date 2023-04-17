import handlebars from 'handlebars'

const buttonLabelTemplate = (args) => {
    let hbsTemplate = handlebars.compile(`
        {{>components/button/components/button_label }}
  `)
    return hbsTemplate({ ...args })
}

export default {
    title: 'Komponenten/Buttons/Komponenten/Label',

    argTypes: {
        _label: {
            control: 'text',
            description: 'Text des Labels',
        },

        _css: {
            control: 'text',
            description: 'Hierüber können dem Label zusätzliche CSS Klassen zugewiesen werden.',
        },
    },
}

export const Label = {
    render: buttonLabelTemplate.bind({}),
    name: 'Label',

    args: {
        _label: 'Button',
    },
}
