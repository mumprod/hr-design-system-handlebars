import handlebars from 'handlebars'

const buttonIconTemplate = (args) => {
    let hbsTemplate = handlebars.compile(`
        {{>components/button/components/button_icon }}
  `)
    return hbsTemplate({ ...args })
}

export default {
    title: 'Komponenten/Buttons/Komponenten/Icon',

    argTypes: {
        _css: {
            control: 'text',
            description: 'Hierüber können dem Icon zusätzliche CSS Klassen zugewiesen werden.',
        },

        _icon: {
            control: 'text',
            description: 'Der Name des Icons in der Iconmap',
        },

        _iconMap: {
            control: 'text',
            description: 'Der Name der zu verwendenden Iconmap',

            table: {
                defaultValue: {
                    summary: 'icons',
                },
            },
        },
    },
}

export const Icon = {
    render: buttonIconTemplate.bind({}),
    name: 'Icon',

    args: {
        _icon: 'calendar',
    },
}
