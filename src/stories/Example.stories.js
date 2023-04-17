import example from './example.hbs'

const Template = ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return example({ label, ...args })
}

export default {
    title: 'Grundlegendes/Template/Beispiel-Story',

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
