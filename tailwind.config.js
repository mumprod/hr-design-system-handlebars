const defaultTheme = require('tailwindcss/defaultTheme')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

/** @type {import('tailwindcss').Config} */
module.exports = {
    experimental: {
        optimizeUniversalDefaults: true,
    },
    content: [
        './src/stories/*.mdx',
        './src/stories/views/**/*.{mdx,hbs,js}',
        './src/assets/vendor/**/*.js',
    ],
    theme: {
        fill: {
            'current': 'currentColor',
            'black': '#000000',
            'white': '#ffffff',
            'blue-jellyBean': '#006dc1',
            'orange-spicyCarrot': '#d34600',
            'congress': '#006dc1',
            'science': '#005293',
        },
        screens: {
            print: { raw: 'print' },
            xs: '360px',
            sm: '640px',
            // => @media (min-width: 640px) { ... }
            md: '768px',
            // => @media (min-width: 768px) { ... }
            lg: '1024px',
            // => @media (min-width: 1024px) { ... }
            /*  'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... } */
            tablet: { min: '768px', max: '1023px' },
        },
        letterSpacing: {
            tighter: '-.025em',
            tight: '-.0125em',
            normal: '0',
            wide: '.0125em',
            wider: '.025em',
            widest: '.05em',
        },

        extend: {
            fontSize: {
                'xs': ['0.75rem', '1.063rem'],
                'sm': ['0.875rem', '1.188rem'],
                'base': ['1rem', '1.375rem'],
                'lg': ['1.125rem', '1.5rem'],
                'xl': ['1.25rem', '1.675rem'],
                '2xl': ['1.375rem', '1.75rem'],
                '4xl': ['2.125rem', '2.375rem'],
            },
            boxShadow: {
                inner: 'inset 0 0px 5px 0 rgba(0, 0, 0, 0.25)',
                dropdown: '0 13px 27px -2px rgba(100, 100, 111, 0.2)',
                insetfromtop: 'inset 0px 8px 8px -4px rgba(0, 0, 0, 0.2)',
            },
            dropShadow: {
                md: '0 5px 3px rgb(0 0 0 / 0.07)',
                dropdown: '0 7px 29px 0 rgb(100, 100, 111, 0.2)',
            },
            lineHeight: {
                11: '2.75rem',
                5.5: '1.375rem',
            },
            fill: {
                black: '#000000',
            },
            borderWidth: {
                7: '7px',
            },
            transitionProperty: {
                'max-height': 'max-height',
                'height': 'height',
                'margin-top': 'margin-top',
                'spacing': 'margin, padding',
            },
            transitionDuration: {
                0: '0ms',
                2000: '2000ms',
            },
            padding: {
                1.5: '0.375rem',
                2.5: '0.625rem',
                13: '3.25rem',
            },
            right: {
                80: '80%',
            },
            zIndex: {
                '0': '0',
                '50': '50',
                '100': '100',
                '101': '101',
                '102': '102',
                '103': '103',
                '10000': '10000',
                '10001': '10001',
                '10002': '10002',
                '-1000': '-1000',
            },
            spacing: {
                22: '5.5rem',
                135: '33.75rem',
                stage: '33.0625rem',
            },
            width: {
                '18': '4.5rem',
                '30': '7.5rem',
                '42': '10.5rem',
                '46': '11.5rem',
                '70': '17.5rem',
                '88': '22rem',
                '92': '23rem',
                'half-screen': '50vw',
            },
            height: {
                '22': '5.5rem',
                '30': '7.5rem',
                '35': '8.75rem',
                '42': '10.5rem',
                '45': '11.25rem',
                'header-lg-small': '8.8125rem',
                'header-lg-big': '11.0625rem',
                'header-md': '5.5625rem',
                'header-sm': '7.5625rem',
            },
            maxWidth: {
                '1/4': '25%',
                '1/3': '33.33333333%',
                '1/2': '50%',
                '2/3': '66.66666666%',
                '3/4': '75%',
                '1/1': '100%',
                'main-col': '63rem',
            },
            margin: {
                '13': '3.125rem',
                '30': '7.5rem',
                'half-screen': '50vw',
            },
            inset: {
                '13': '3.375rem',
                '14': '3.5rem',
                '15': '3.75rem',
                '35': '8.625rem',
                '37': '9.125rem',
                '-37': '-9.375rem',
                '38': '9.5rem',
                '42': '10.5rem',
            },
            opacity: {
                85: '.85',
            },
            fontFamily: {
                copy: ['DIN', 'sans-serif'],
                headingSerif: ['RobotoSlab', 'serif'],
                heading: ['RobotoCond', 'sans-serif'],
            },
            colors: {
                blue: {
                    jellyBean: '#276b9e',
                    pacificBlue: '#009bc6',
                    science: '#006dc1',
                    congress: '#005293',
                    deepCerulean: '#006eb7',
                    accented: '#d8e9f6',
                    blueStone: '#00646f',
                    astronautBlue: '#00375d',
                    lightCerulean: '#007EA1FF',
                },
                black: {
                    DEFAULT: '#000000',
                },
                red: {
                    thunderbird: '#cc1a14',
                    monza: '#c20016',
                    burntUmber: '#8d2725',
                    wellRead: '#AB2F2DFF',
                    paprika: '#8C033DFF',
                },
                pink: {
                    ripeRaspberries: '#be005a',
                    rose: '#e5007d',
                },
                orange: {
                    terraX: '#bb4827',
                    spicyCarrot: '#d34600',
                    bridesmaid: '#FCF2ED',
                    layout: '#F07800',
                    clementine: '#ec6602',
                },
                teal: {
                    DEFAULT: '#007A7CFF',
                    deeperPool: '#097d8e',
                },
                grey: {
                    armadillo: '#433d37',
                    scorpion: '#606060',
                    alto: '#e0e0e0',
                    light: '#F8F8F8',
                    dark: '#707070',
                },
                green: {
                    genoa: '#168378',
                    eden: '#0F6157FF',
                },
                purple: {
                    pompadour: '#6d0041',
                    jazzberry: '#a00d65',
                },
                white: {
                    DEFAULT: '#ffffff',
                    blackhaze: '#eaeded',
                },
                yellow: {
                    corn: '#e0ae00',
                    goldenSand: '#f2da6c',
                    olive: '#916B00FF',
                },
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                labelMedia: 'var(--color-label-media)',
                labelEvent: 'var(--color-label-event)',
                labelBreakingnews: 'var(--color-label-breakingnews)',
                labelComment: 'var(--color-label-comment)',
                labelInfografik: 'var(--color-label-infografik)',
                labelProgram: 'var(--color-label-program)',
                labelDownload: 'var(--color-label-download)',
                labelPm: 'var(--color-label-pm)',
                labelLive: 'var(--color-label-live)',
                toplineColor: 'var(--color-topline)',
                link: 'var(--color-link)',
                stageLink: 'var(--color-stage-link)',
                stageTextBox: 'var(--color-stage-text-box)',
                stageText: 'var(--color-stage-text)',
                stagePrimary: 'var(--color-stage-primary)',
            },
        },
    },
    plugins: [
        require('tailwindcss-important')(),
        // plugin to separate border colors, found here: https://github.com/tailwindlabs/tailwindcss/pull/560
        ({ addUtilities, e, theme, variants }) => {
            const colors = flattenColorPalette(theme('borderColor'))
            delete colors['default']

            const colorMap = Object.keys(colors).map((color) => ({
                [`.border-t-${color}`]: { borderTopColor: colors[color] },
                [`.border-r-${color}`]: { borderRightColor: colors[color] },
                [`.border-b-${color}`]: { borderBottomColor: colors[color] },
                [`.border-l-${color}`]: { borderLeftColor: colors[color] },
            }))
            const utilities = Object.assign({}, ...colorMap)

            addUtilities(utilities, variants('borderColor'))
        },
        require('tailwindcss-counter')(),
        require('@tailwindcss/line-clamp'),
    ],
}
