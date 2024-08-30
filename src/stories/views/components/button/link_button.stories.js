import snapshotsJson from './fixtures/link_button.json'
import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
const handlebars = require('hrHandlebars')

const hbsTemplates = []
hbsTemplates['buttonWithLabel'] = handlebars.compile(`
    {{#> components/button/link_button}}
        {{> components/button/components/button_label}}
    {{/components/button/link_button}}
  `)
hbsTemplates['buttonWithLabelOnBackground'] = handlebars.compile(`
    <div class="bg-primary p-4">
        {{#> components/button/link_button}}
            {{> components/button/components/button_label}}
        {{/components/button/link_button}}
    </div>
  `)
hbsTemplates['buttonWithLabelAndIconRight'] = handlebars.compile(`
    {{#> components/button/link_button}}
        {{> components/button/components/button_label}}
        {{> components/button/components/button_icon }}
    {{/components/button/link_button}}
  `)
hbsTemplates['buttonWithLabelAndIconLeft'] = handlebars.compile(`
    {{#> components/button/link_button~}}
        {{> components/button/components/button_icon }}
        {{> components/button/components/button_label}}
    {{~/components/button/link_button}}
  `)

const buttonWithLabelTemplate = (args) => {

    return hbsTemplates['buttonWithLabel']({ ...args })
}

const buttonWithLabelTemplateOnBackground = (args) => {
    return hbsTemplates['buttonWithLabelOnBackground']({ ...args })
}

const buttonWithLabelAndIconRightTemplate = (args) => {
    return hbsTemplates['buttonWithLabelAndIconRight']({ ...args })
}

const buttonWithLabelAndIconLeftTemplate = (args) => {
    return hbsTemplates['buttonWithLabelAndIconLeft']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, ...args })
}

export default {
    title: 'Komponenten/Buttons/Link-Button',

    argTypes: {
        _css: {
            description: 'Erlaubt die Angabe zusätzlicher CSS Klassen für den Button',
            control: 'text',

            table: {
                category: 'Button',
            },
        },

        _label: {
            description: 'Label des Buttons',
            control: 'text',

            table: {
                category: 'Label',
            },
        },

        _link: {
            description:
                'Link des Buttons. Dies muss ein Objekt in der Form {"url":"","isTargetBlank"=true|false, "webviewUrl"=""}',
            control: 'object',

            table: {
                category: 'Button',
            },
        },

        _icon: {
            description: 'Der Name des Icons in der Iconmap',
            control: 'text',

            table: {
                category: 'Icon',
            },
        },

        _iconMap: {
            control: 'text',
            description: 'Der Name der zu verwendenden Iconmap',

            table: {
                defaultValue: {
                    summary: 'icons',
                },

                category: 'Icon',
            },
        },

        _size: {
            options: ['sm', 'md', 'lg'],
            control: {
                type: 'select',
            },

            description: 'Bestimmt die Größe des Buttons. Erlaubte Werte sind `sm`, `md` und `lg`',

            table: {
                category: 'Button',

                defaultValue: {
                    summary: 'md',
                },
            },
        },

        _variant: {
            description:
                'In welcher Variante soll der Button dargestellt werden. Erlaubte Varianten sind `primary`, `secondary`, `tertiary`',

            options: ['primary', 'secondary', 'tertiary'],
            control: {
                type: 'select',
            },

            table: {
                category: 'Button',
                defaultValue: {
                    summary: 'primary',
                },
            },
        },

        _onBackground: {
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

        _disableButtonPress: {
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

        _isAriaHidden: {
            description:
                'Ermöglicht es den Button von der Nutzung mit assistiven Geräten auszuschließen. Setzt die Eigenschaft aria-hidden auf true und den tabindex auf -1.',
            control: 'boolean',

            table: {
                category: 'Button',

                defaultValue: {
                    summary: false,
                },
            },
        },
    },

    parameters: {
        controls: {
            sort: 'alpha',
        },
        chromatic: { disableSnapshot: true }
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

export const ButtonSecondaryWhite = {
    render: buttonWithLabelTemplate.bind({}),
    name: 'Button - Secondary auf weiß',

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
        _onWhite: true,
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

export const ButtonPrimaryDisabled = {
    render: buttonWithLabelTemplate.bind({}),
    name: 'Button - Primary Deaktiviert',

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
        _disabled: true,
    },
}

export const ButtonSecondaryDisabled = {
    render: buttonWithLabelTemplate.bind({}),
    name: 'Button - Secondary Deaktiviert',

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
        _disabled: true,
    },
}

export const ButtonTertiaryDisabled = {
    render: buttonWithLabelTemplate.bind({}),
    name: 'Button - Tertiary Deaktiviert',

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
        _disabled: true,
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

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    argTypes: {
        _size: {
            control: false,
        },

        _variant: {
            control: false,
        },

        _onBackground: {
            control: false,
        },
    },

    args: { snapshotsJson },
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
