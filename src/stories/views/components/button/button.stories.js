import handlebars from 'handlebars'

const buttonWithLabelTemplate = (args) => {
    let hbsTemplate = handlebars.compile(`
    {{#> components/button/button}}
        {{> components/button/components/button_label}}
    {{/components/button/button}}
  `)
    return hbsTemplate({ ...args })
}

const buttonWithLabelTemplateOnBackground = (args) => {
    let hbsTemplate = handlebars.compile(`
    <div class="bg-primary p-4">
        {{#> components/button/button}}
            {{> components/button/components/button_label}}
        {{/components/button/button}}
    </div>
  `)
    return hbsTemplate({ ...args })
}

const buttonWithLabelAndIconRightTemplate = (args) => {
    let hbsTemplate = handlebars.compile(`
    {{#> components/button/button}}
        {{> components/button/components/button_label}}
        {{> components/button/components/button_icon }}
    {{/components/button/button}}
  `)
    return hbsTemplate({ ...args })
}

const buttonWithLabelAndIconLeftTemplate = (args) => {
    let hbsTemplate = handlebars.compile(`
    {{#> components/button/button~}}
        {{> components/button/components/button_icon }}
        {{> components/button/components/button_label}}
    {{~/components/button/button}}
  `)
    return hbsTemplate({ ...args })
}

export default {
    title: 'Komponenten/Buttons/Button',

    argTypes: {
        '_alpineClick': {
            description:
                'Erlaubt es Javascript bei einem Klick auf den Button auszuführen. Mehr Details unter [https://alpinejs.dev/directives/on](https://alpinejs.dev/directives/on)',
            control: 'text',

            table: {
                category: 'Button',
            },
        },

        '_ariaLabel': {
            description: 'Label',
            control: 'text',

            table: {
                category: 'Button',
            },
        },

        '_id': {
            control: 'text',
            description: 'Eindeutige ID',

            table: {
                category: 'Button',
            },
        },

        '_css': {
            description: 'Erlaubt die Angabe zusätzlicher CSS Klassen für den Button',
            control: 'text',

            table: {
                category: 'Button',
            },
        },

        '_label': {
            description: 'Label des Buttons',
            control: 'text',

            table: {
                category: 'Label',
            },
        },

        '_name': {
            description:
                'Legt den Namen des Buttons fest. Wird benötigt, wenn der Button als Submit Button innerhalb eines Formulars genutzt wird.',
            control: 'text',

            table: {
                category: 'Button',
            },
        },

        '_title': {
            description: 'Optionaler erläuternder Text, der als Tooltip angezeigt wird.',
            control: 'text',

            table: {
                category: 'Button',
            },
        },

        '_value': {
            description:
                'Dieser Wert wird zusammen mit dem Namen bei einem Submit innerhalb eines Formulars an den Server übertragen.',
            control: 'text',

            table: {
                category: 'Button',
            },
        },

        '_noFocus': {
            description:
                'Legt fest, ob der Button mit einem `Tab` angesprungen werden kann oder nicht. ',
            control: 'boolean',

            table: {
                category: 'Button',

                defaultValue: {
                    summary: false,
                },
            },
        },

        '_onBackground': {
            description:
                'Wird dieser Wert gesetzt, wird der Button in einem auf einen farbigen Hintergrund abgestimmtes Farbschema angezeigt. ',
            control: 'boolean',

            table: {
                category: 'Button',

                defaultValue: {
                    summary: false,
                },
            },
        },

        '_disableButtonPress': {
            description:
                'Durch setzen dieses Wertes, kann deaktiviert werden, dass der Druck auf den Button optisch angezeigt wird.',
            control: 'boolean',

            table: {
                category: 'Button',

                defaultValue: {
                    summary: false,
                },
            },
        },

        '_size': {
            control: {
                type: 'select',
                options: ['sm', 'md', 'lg'],
            },

            description: 'Bestimmt die Größe des Buttons. Erlaubte Werte sind `sm`, `md` und `lg`',

            table: {
                category: 'Button',

                defaultValue: {
                    summary: 'md',
                },
            },
        },

        '_type': {
            control: {
                type: 'select',
                options: ['button', 'submit', 'reset'],
            },

            description:
                'Setzt das Attribut type des HTML Button Elements. Erlaubte Werte sind `button`, `submit` oder `reset`',

            table: {
                category: 'Button',

                defaultValue: {
                    summary: 'submit',
                },
            },
        },

        '_variant': {
            description:
                'In welcher Variante soll der Button dargestellt werden. Erlaubte Varianten sind `primary`, `secondary`, `tertiary`',

            control: {
                type: 'select',
                options: ['primary', 'secondary', 'tertiary'],
            },

            table: {
                category: 'Button',
            },
        },

        '_x-show': {
            description:
                'Setzt die Alpine.js Direktive `x-show` und erlaubt so den Button auf Basis des Wertes einer boolschen Variable ein- oder auszublenden. Mehr dazu unter [https://alpinejs.dev/directives/show](https://alpinejs.dev/directives/show)',
            control: 'text',

            table: {
                category: 'Button',
            },
        },

        '_icon': {
            description: 'Der Name des Icons in der Iconmap',
            control: 'text',

            table: {
                category: 'Icon',
            },
        },

        '_iconMap': {
            control: 'text',
            description: 'Der Name der zu verwendenden Iconmap',

            table: {
                defaultValue: {
                    summary: 'icons',
                },

                category: 'Icon',
            },
        },
    },

    parameters: {
        controls: {
            sort: 'alpha',
        },
    },
}

export const Spielplatz = {
    render: buttonWithLabelTemplate.bind({}),
    name: 'Spielplatz',

    args: {
        _size: 'md',
        _label: 'Button',
    },
}

export const ButtonLg = {
    render: buttonWithLabelTemplate.bind({}),
    name: 'Button - lg',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },
        _label: {
            control: false,
        },
    },

    args: {
        _size: 'lg',
        _label: 'Large',
    },
}

export const ButtonMd = {
    render: buttonWithLabelTemplate.bind({}),
    name: 'Button - md',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },
    },

    args: {
        _size: 'md',
        _label: 'Medium',
    },
}

export const ButtonSm = {
    render: buttonWithLabelTemplate.bind({}),
    name: 'Button - sm',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },
    },

    args: {
        _size: 'sm',
        _label: 'Small',
    },
}

export const ButtonPrimary = {
    render: buttonWithLabelTemplate.bind({}),
    name: 'Button - Primary',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },
    },

    args: {
        _size: 'lg',
        _label: 'Primary',
    },
}

export const ButtonSecondary = {
    render: buttonWithLabelTemplate.bind({}),
    name: 'Button - Secondary',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },
    },

    args: {
        _size: 'lg',
        _label: 'Secondary',
        _variant: 'secondary',
    },
}

export const ButtonTertiary = {
    render: buttonWithLabelTemplate.bind({}),
    name: 'Button - Tertiary',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },
    },

    args: {
        _size: 'lg',
        _label: 'Tertiary',
        _variant: 'tertiary',
    },
}

export const ButtonIconRechts = {
    render: buttonWithLabelAndIconRightTemplate.bind({}),
    name: 'Button - Icon rechts',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },
    },

    args: {
        _size: 'lg',
        _label: 'Icon rechts',
        _icon: 'arrow-right',
    },
}

export const ButtonIconLinks = {
    render: buttonWithLabelAndIconLeftTemplate.bind({}),
    name: 'Button - Icon links',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },
    },

    args: {
        _size: 'lg',
        _label: 'Icon links',
        _icon: 'arrow-left',
    },
}

export const ButtonPrimaryAufFarbigemHintergrund = {
    render: buttonWithLabelTemplateOnBackground.bind({}),
    name: 'Button - Primary auf farbigem Hintergrund',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },

        _onBackground_: {
            control: false,
        },
    },

    args: {
        _size: 'lg',
        _label: 'Primary',
        _onBackground: true,
    },
}

export const ButtonSecondaryAufFarbigemHintergrund = {
    render: buttonWithLabelTemplateOnBackground.bind({}),
    name: 'Button - Secondary auf farbigem Hintergrund',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },

        _onBackground_: {
            control: false,
        },
    },

    args: {
        _size: 'lg',
        _label: 'Secondary',
        _variant: 'secondary',
        _onBackground: true,
    },
}

export const ButtonTertiaryAufFarbigemHintergrund = {
    render: buttonWithLabelTemplateOnBackground.bind({}),
    name: 'Button - Tertiary auf farbigem Hintergrund',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },

        _onBackground_: {
            control: false,
        },
    },

    args: {
        _size: 'lg',
        _label: 'Tertiary',
        _variant: 'tertiary',
        _onBackground: true,
    },
}
