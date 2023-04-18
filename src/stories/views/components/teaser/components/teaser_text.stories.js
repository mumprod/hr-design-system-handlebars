import teaserText from './teaser_text.hbs'

const Template = ({ _text, ...args }) => {
    return teaserText({ _text, ...args })
}

export default {
    title: 'Komponenten/Teaser/Komponenten/Teasertext',

    argTypes: {
        _text: {
            control: 'text',
            description: 'teaserText',
        },

        _size: {
            options: ['hero', '100', '50', '33', '25'],

            control: {
                type: 'inline-radio',
            },
        },

        _font: {
            table: {
                disable: true,
            },
        },
    },
}

export const TeasertextHero = {
    render: Template.bind({}),
    name: 'Teasertext Hero',

    args: {
        _text: 'Woibbadinga i moan scho aa hallelujah sog i, luja, boarischer. Wiesn resch ja, wo samma denn etza, resch. Auffisteign a Hoiwe woaß, koa. Leonhardifahrt Weißwiaschd Baamwach hob liberalitas Bavariae ham hogg di hera.',
        _size: 'hero',
        _font: 'md:text-base md:leading-4 lg:leading-5',
    },
}

export const Teasertext50 = {
    render: Template.bind({}),
    name: 'Teasertext 50',

    args: {
        _text: 'Woibbadinga i moan scho aa hallelujah sog i, luja, boarischer. Wiesn resch ja, wo samma denn etza, resch. Auffisteign a Hoiwe woaß, koa. Leonhardifahrt Weißwiaschd Baamwach hob liberalitas Bavariae ham hogg di hera.',
        _size: '50',
        _font: 'md:text-base md:leading-4 lg:leading-5',
    },
}

export const Teasertext33 = {
    render: Template.bind({}),
    name: 'Teasertext 33',

    args: {
        _text: 'Woibbadinga i moan scho aa hallelujah sog i, luja, boarischer. Wiesn resch ja, wo samma denn etza, resch. Auffisteign a Hoiwe woaß, koa. Leonhardifahrt Weißwiaschd Baamwach hob liberalitas Bavariae ham hogg di hera.',
        _size: '33',
        _font: 'md:text-base md:leading-4 lg:leading-5',
    },
}

export const Teasertext25 = {
    render: Template.bind({}),
    name: 'Teasertext 25',

    args: {
        _text: 'Woibbadinga i moan scho aa hallelujah sog i, luja, boarischer. Wiesn resch ja, wo samma denn etza, resch. Auffisteign a Hoiwe woaß, koa. Leonhardifahrt Weißwiaschd Baamwach hob liberalitas Bavariae ham hogg di hera.',
        _size: '25',
        _font: 'md:text-base md:leading-4 lg:leading-5',
    },
}
