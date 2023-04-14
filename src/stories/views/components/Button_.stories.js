import button from './Button.hbs'

const Template = ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return button({ label, ...args })
}

export default {
    title: 'Komponenten-Beispiele/MDX-Button',

    argTypes: {
        label: {
            control: 'text',
            description: 'Button text',
        },

        size: {
            control: {
                type: 'select',
                options: ['sm', 'md', 'lg', 'xl'],
            },

            description: 'Größe des Buttons',

            table: {
                defaultValue: {
                    summary: 'md',
                },
            },
        },

        type: {
            description: 'Typ des Buttons',

            control: {
                type: 'select',
                options: ['primary', 'secondary'],
            },

            table: {
                defaultValue: {
                    summary: 'primary',
                },
            },
        },
    },
}

export const Primary = {
    render: Template.bind({}),
    name: 'Primary',

    args: {
        label: 'Button',
    },
}

export const Secondary = {
    render: Template.bind({}),
    name: 'Secondary',

    parameters: {
        docs: {
            source: {
                code: `
<Button class="storybook-button storybook-button--secondary">Button</button>
 `,
            },
        },
    },

    args: {
        label: 'Button',
        type: 'secondary',
    },
}
