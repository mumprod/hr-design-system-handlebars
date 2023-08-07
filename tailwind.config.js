const defaultTheme = require('tailwindcss/defaultTheme')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

/** @type {import('tailwindcss').Config} */
module.exports = {
    experimental: {
        optimizeUniversalDefaults: true,
    },
    safelist: ['mt-12', 'bg-gray-100', '-weather_warning'],
    content: [
        './src/stories/*.mdx',
        './src/stories/views/**/*.{mdx,hbs,js}',
        './src/assets/vendor/**/*.js',
    ],
    theme: {
        screens: {
            print: { raw: 'print' },
            xs: '360px',
            sm480: '480px',
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
            backgroundImage: {
                'logo-footer' : 'var(--bg-logo-footer)'
            },
            invert: {
                'logo-footer' : 'var(--invert-logo-footer)',
            },
            borderRadius: {
                hr: 'var(--border-radius-hr)',
                'logo-footer' : 'var(--rounded-logo-footer)',
            },
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
                'inner': 'inset 0 0px 5px 0 rgba(0, 0, 0, 0.25)',
                'dropdown': '0 13px 27px -2px rgba(100, 100, 111, 0.2)',
                'insetfromtop': 'inset 0px 8px 8px -4px rgba(0, 0, 0, 0.2)',
                'stage': '0 .3125rem 1.0625rem rgba(0,0,0,0.3)',
                'teaser-focus': '0 0 0 0.25rem',
                'teaser-focus-big': '0 0 0 0.365rem',
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
                current: 'currentColor',
                black: '#000000',
            },
            borderWidth: {
                7: '7px',
                'navigation-border-width': 'var(--border-navigation-border-width)',
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
                '1.5': '0.375rem',
                '2.5': '0.625rem',
                '11.5': '2.875rem',
                '13': '3.25rem',
                '3/4': '75%',
                'logo-padding-top': 'var(--logo-padding-top)',
                'logo-padding-bottom': 'var(--logo-padding-bottom)',
            },
            right: {
                80: '80%',
            },
            zIndex: {
                '0': '0',
                '50': '50',
                '100': '100',
                '110': '110',
                '120': '120',
                '300': '300'
            },
            spacing: {
                '9.5': '2.375rem',
                '22': '5.5rem',
                '135': '33.75rem',
                'stage': '56%',

                'full-hd': '120rem',
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
                '15/12': '120%',
                'footer-logo': 'var(--width-footer-logo)',
                'footer-logo-md': 'var(--width-footer-logo-md)',
                'footer-logo-lg': 'var(--width-footer-logo-lg)',
            },
            height: {
                '22': '5.5rem',
                '30': '7.5rem',
                '35': '8.75rem',
                '42': '10.5rem',
                '45': '11.25rem',
                '88': '22rem',
                'header-lg-small': '8.8125rem',
                'header-lg-big': '11.0625rem',
                'header-md': '5.5625rem',
                'header-sm': '7.5625rem',
                'footer-logo':'var(--height-footer-logo)',
                'footer-logo-md': 'var(--height-footer-logo-md)',
                'footer-logo-lg': 'var(--height-footer-logo-lg)',
            },
            maxHeight: {
                stage: '34.3125rem',
            },
            maxWidth: {
                '1/4': '25%',
                '1/3': '33.33333333%',
                '2/4': '50%',
                '1/2': '50%',
                '2/3': '66.66666666%',
                '3/4': '75%',
                '1/1': '100%',
                'main-col': '63rem',
            },
            minWidth: {
                7: '1.75rem',
                10: '2.5rem',
                11: '2.75rem',
            },
            margin: {
                '13': '3.125rem',
                '13-2': '3.375rem',
                '30': '7.5rem',
                '240': '60rem',
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
                sans: ['DIN', ...defaultTheme.fontFamily.sans],
                copy: [
                    'DIN',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    '"Helvetica Neue"',
                    'Arial',
                    '"Noto Sans"',
                    'sans-serif',
                ],
                serif: ['RobotoSlab', ...defaultTheme.fontFamily.serif],
                headingSerif: [
                    'RobotoSlab',
                    'ui-serif',
                    'Georgia',
                    'Cambria',
                    '"Times New Roman"',
                    'Times',
                    'serif',
                ],
                heading: [
                    'RobotoCond',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    '"Helvetica Neue"',
                    'Arial',
                    '"Noto Sans"',
                    'sans-serif',
                ],
                title: 'var(--font-title)',
                titleCluster: 'var(--font-titleCluster)',
            },
            fontWeight: {
                title: 'var(--font-weight-title)',
                titleCluster: 'var(--font-weight-titleCluster)',
            },
            colors: {
                'inherit': 'inherit', 
                'blue': {
                    accented: '#eaf3fa',
                    allports: '#007899',
                    aqua: '#e5edf1',
                    astronautBlue: '#00375d',
                    blackSqueeze: '#eaf5f7',
                    blueStone: '#00646f',
                    congress: '#005293',
                    deepCerulean: '#006eb7',
                    deeperPool: '#097d8e',
                    deepSeaDream: '#002c6b',
                    dodgerBlue: '#407596',
                    jellyBean: '#276b9e',
                    lightCerulean: '#007EA1',
                    matisse: '#1B7C96',
                    midnight: '#023770',
                    pacificBlue: '#009bc6',
                    science: '#006dc1',
                    sea: '#006783',
                    tarawera: '#0a3355',
                    turquoiseCerulian: '#007fa0',
                    linkWater: '#d3e2f4',
                },
                'black': {
                    DEFAULT: '#000000',
                },
                'red': {
                    alizarinCrimson: '#e81f18',
                    burntUmber: '#8d2725',
                    lipstick: '#CC006E',
                    mexican: '#a12644',
                    monza: '#c20016',
                    paprika: '#8C033D',
                    scarlett: '#9b0112',
                    thunderbird: '#cc1a14',
                    wellRead: '#AB2F2D',
                },
                'pink': {
                    fuchsie: '#bf0071',
                    ripeRaspberries: '#be005a',
                    rose: '#e5007d',
                },
                'orange': {
                    bridesmaid: '#FCF2ED',
                    burntOrange: '#c95702',
                    chelseaGem: '#AD5500',
                    clementine: '#ec6602',
                    goldDrop: '#f07800',
                    oregon: '#A14702',
                    spicyCarrot: '#d34600',
                },
                'teal': {
                    DEFAULT: '#007A7C',
                    deeperPool: '#097d8e',
                },
                'gray': {
                    alabaster: '#f7f7f7',
                    alto: '#e0e0e0',
                    boulder: '#797979',
                    brightGray: '#E5F2F3',
                    concrete: '#f3f3f3',
                    dark: '#707070',
                    lightGray: '#d4d4d4',
                    mercury: '#E6E6E6',
                    platinum: '#E5E8E8',
                    scorpion: '#606060',
                },
                'green': {
                    casal: '#29675d',
                    eden: '#0F6157',
                    flint: '#6e675e',
                    genoa: '#168378',
                    goBen: '#6e6748',
                    pacifica: '#6d761d',
                    pineGreen: '#007179',
                    teal: '#007A7C',
                    tropicalRainForest: '#017e5c',
                },
                'purple': {
                    disco: '#88114b',
                    jazzberry: '#a00d65',
                    pompadour: '#6d0041',
                },
                'white': {
                    DEFAULT: '#ffffff',
                    azureish: '#DBEAEA',
                    blackhaze: '#eaeded',
                    floral: '#FBF9EE',
                },
                'yellow': {
                    corn: '#e0ae00',
                    goldenSand: '#f2da6c',
                    hokeyPokey: '#c1bc2b',
                    olive: '#916B00',
                },

                'primary': 'var(--color-primary-ds)',
                'secondary': 'var(--color-secondary-ds)',
                'highlight-1': 'var(--color-highlight-1)',
                'highlight-2': 'var(--color-highlight-2)',
                'highlight-3': 'var(--color-highlight-3)',
                'top-topic-background': 'var(--color-top-topic-background)',
                'text': 'var(--color-standard-text)',
                'text-dark': 'var(--color-standard-text-dark)',
                'navigation-bg': 'var(--color-navigation-bg)',
                'navigation-icons': 'var(--color-navigation-icons)',
                'navigation-text': 'var(--color-navigation-text)',
                'brandnavigation-border-color': 'var(--color-brandnavigation-border-color)',
                'brandnav-pseudo': 'var(--color-brandnav-pseudo)',
                'brandnavigation-bg': 'var(--color-brandnavigation-bg)',
                'navigation-border-color': 'var(--color-navigation-border-color)',

                'footer-bg': 'var(--color-footer-bg)',
                'footer-text': 'var(--color-footer-text)',
                'footer-heading': 'var(--color-footer-heading)',
                'footer-border': 'var(--color-footer-border)',

                'labelMedia': 'var(--color-label-media)',
                'labelEvent': 'var(--color-label-event)',
                'labelBreakingnews': 'var(--color-label-breakingnews)',
                'labelComment': 'var(--color-label-comment)',
                'labelInfografik': 'var(--color-label-infografik)',
                'labelProgram': 'var(--color-label-program)',
                'labelDownload': 'var(--color-label-download)',
                'labelPm': 'var(--color-label-pm)',
                'labelLive': 'var(--color-label-live)',
                'labelKurzmeldung': 'var(--color-label-kurzmeldung)',
                'toplineColor': 'var(--color-topline)',
                'subline': 'var(--color-subline)',
                'link': 'var(--color-link)',
                'link-dark': 'var(--color-link-dark)',
                'stageLink': 'var(--color-stage-link)',
                'stageTextBox': 'rgb(var(--color-stage-text-box) / <alpha-value>)',
                'stageText': 'var(--color-stage-text)',
                'stagePrimary': 'var(--color-stage-primary)',
                'geoTag': 'var(--color-geoTag)',
                'clusterTeaserLink': 'var(--color-cluster-teaser-link,#000)',
                'clusterTeaserHeadline': 'var(--color-cluster-teaser-headline,#000)',
                'button': 'var(--color-button)',
                'button--dark': 'var(--color-button--dark)',
                'button-inverted': 'var(--color-button-inverted)',
                'button-inverted--dark': 'var(--color-button-inverted--dark)',
                'button-disabled': 'var(--color-button-disabled)',
                'button-disabled--dark': 'var(--color-button-disabled--dark)',
                'media-button': 'var(--color-media-button)',
                'focus-state': 'var(--color-focus-state)',
                'content-nav': 'var(--color-content-nav)',
                'podcast': 'var(--color-podcast)',
                'podcast-text': 'var(--color-podcast-text)',
                'event-status': 'var(--color-event-status)',
                'event-calendar-primary': 'var(--color-eventcalendar-primary)',
                'event-calendar-secondary': 'var(--color-eventcalendar-secondary)',
                'byline': 'var(--color-byline)',
                'tickerTeaserHeadline': 'var(--color-ticker-teaser-headline,#000)',
                'tickerTeaserlabelByline': 'var(--color-ticker-teaser-label-byline)',
                'tickerTeaserTimelineScore': 'var(--color-ticker-teaser-timeline-score)',
                'tickerTeaserFooter': 'var(--color-ticker-teaser-footer)',
                'tickerTeaserHeadlineUnderline': 'var(--color-ticker-teaser-headline-underline)',
                'toggle-confirmation': 'var(--color-toggle-confirmation)',
                'toggle-default': 'var(--color-toggle-default)'
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
        require('tailwindcss-hyphens'),
    ],
}
