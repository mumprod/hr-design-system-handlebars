import '!style-loader!css-loader!postcss-loader!tailwind'
import 'tailwind'

import hrDesignsystemDark from './HRDesignsystemDark'
import hrDesignsystemLight from './HRDesignsystemLight'
import { withThemeDecorator } from './withThemeDecorator'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import Initializer from '../build/webpack/feature-loader/initializer/initializer'
import loadFeature from '../build/webpack/feature-loader/initializer/loader'
import '../src/assets/vendor/js/header.alpine'

function loadDelayedImages() {
    setTimeout(function () {
        var t,
            e = document.images,
            s = [],
            a = function (t) {
                void 0 !== window.picturefill && window.picturefill({ reevaluate: !0, elements: t })
            }
        for (var i = 0; i < e.length; ++i)
            (t = e[i].dataset ? e[i].dataset.srcset : e[i].getAttribute('data-srcset')) &&
                (0 === e[i].getBoundingClientRect().top
                    ? s.push(e[i])
                    : e[i].setAttribute('srcset', t))
        a(e),
            setTimeout(function () {
                var t
                for (var i = 0; i < s.length; ++i)
                    (t = s[i].dataset ? s[i].dataset.srcset : s[i].getAttribute('data-srcset')),
                        s[i].setAttribute('srcset', t)
                a(s)
            }, 900)
    }, 0)
}

let eventSrcUrl = null

document.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded and parsed')
    if (eventSrcUrl != event.srcElement.URL) {
        eventSrcUrl = event.srcElement.URL

        console.log('Start feature initialization')

        Initializer.run(document, loadFeature)
        setTimeout(loadDelayedImages, 200)
    } else {
        console.log('second DOMContentLoaded Event was blocked!')
    }
})

if (process.env.NODE_ENV !== 'production') {
    console.log(Initializer)
    console.log('Looks like we are in development mode!')
}

const customViewports = {
    hrMin: {
        name: 'hr: Min - 320px',
        styles: {
            width: '320px',
            height: '600px',
        },
    },
    hrXs: {
        name: 'hr: XS - 360px',
        styles: {
            width: '360px',
            height: '600px',
        },
    },
    hrSmSmaller: {
        name: 'hr: SM - 639px',
        styles: {
            width: '639px',
            height: '800px',
        },
    },
    hrSm: {
        name: 'hr: SM - 640px',
        styles: {
            width: '640px',
            height: '800px',
        },
    },
    hrMdSmaller: {
        name: 'hr: MD - 767px',
        styles: {
            width: '767px',
            height: '1000px',
        },
    },
    hrMd: {
        name: 'hr: MD - 768px',
        styles: {
            width: '769px',
            height: '1000px',
        },
    },
    hrLgSmaller: {
        name: 'hr: LG - 1023px',
        styles: {
            width: '1023px',
            height: '1000px',
        },
    },
    hrLg: {
        name: 'hr: LG - 1024px',
        styles: {
            width: '1024px',
            height: '1000px',
        },
    },
}

export const parameters = {
    //layout: 'fullscreen',
    viewport: {
        viewports: {
            ...customViewports,
            ...INITIAL_VIEWPORTS,
        },
    },
    backgrounds: {
        default: 'white',
        values: [
            {
                name: 'white',
                value: '#ffffff',
            },
            {
                name: 'hessenschau',
                value: '#005293',
            },
        ],
        grid: {
            cellSize: 8,
            opacity: 0.5,
            cellAmount: 8,
            offsetX: 0, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
            offsetY: 0, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
        },
    },
    // Storybook a11y addon configuration
    a11y: {
        // the target DOM element
        element: '#root',
        // sets the execution mode for the addon
        manual: false,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
    customConditionalToolbar: {
        /** Defines the possible sets that can be shown */
        sets: [
            {
                id: 'brands',
                options: [
                    { id: 'hr', title: 'hr.de' },
                    { id: 'hessenschau', title: 'hessenschau.de' },
                    { id: 'hr1', title: 'hr1.de' },
                    { id: 'hr2', title: 'hr2.de' },
                    { id: 'hr3', title: 'hr3.de' },
                    { id: 'hr4', title: 'hr4.de' },
                    { id: 'you-fm', title: 'you-fm.de' },
                    { id: 'hr-inforadio', title: 'hr-info.de' },
                    { id: 'hr-fernsehen', title: 'hr-fernsehen.de' },
                    { id: 'hr-rundfunkrat', title: 'hr-rundfunkrat.de' },
                    { id: 'hr-werbung', title: 'hr-werbung.de' },
                    { id: 'hr-bigband', title: 'hr-bigband.de' },
                    { id: 'hr-sinfonieorchester', title: 'hr-sinfonieorchester.de' },
                ],
            },
        ],
        default: 'brands',
        /** Icon to use in toolbar, defaults to `switchalt`. All possible icons here: https://storybookjs.netlify.app/official-storybook/?path=/story/basics-icon--labels */
        icon: 'globe',
        /** title when hovering over the icon */
        title: 'Themes',
        /** Setting disable to true makes the addon disabled by default */
        // disable: true,
    },
    docs: {
        theme: hrDesignsystemLight,
    },
    options: {
        storySort: {
            order: [
                'Einführung',
                'Grundlegendes',
                [
                    'Installation und Update',
                    'Konventionen und Datenstrukturen',
                    'Testdatenbereitstellung',
                    '*',
                ],
                'Komponenten',
                [
                    'Buttons',
                    ['Button', 'Link-Button', 'Komponenten'],
                    'Page',
                    'Header',
                    'Teaser',
                    'grid',
                    'Label',
                ],
                '*',
            ],
        },
    },
}

export const decorators = [withThemeDecorator]
