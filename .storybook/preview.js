import '!style-loader!css-loader!postcss-loader!tailwind'
import 'tailwind'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import '@storybook/addon-console'
import { setConsoleOptions } from '@storybook/addon-console';
import { configureActions } from '@storybook/addon-actions';

import hrDesignsystemDark from './HRDesignsystemDark'
import hrDesignsystemLight from './HRDesignsystemLight'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import Initializer from '../build/webpack/feature-loader/initializer/initializer'
import loadFeature from '../build/webpack/feature-loader/initializer/loader'
import '../src/assets/js/alpine.js'
import '../src/assets/tailwind.css'

import { CheckCSS } from 'checkcss';


configureActions({
    clearOnStoryChange: true,
});

// Create CheckCSS instance
const checkcss = new CheckCSS();

checkcss.onClassnameDetected = function (classname, element) {
    // Return `false` to disable checks for `classname`.
    // For example, to ignore classnames starting with
    // "license-" or "maintainer-"...
    var storybookRoot = document.getElementById('storybook-root');
    var prefixes = /^js-|^ui-test-|^sb-/.test(classname) ? false : true
    return storybookRoot.contains(element) && prefixes
}
checkcss.onUndefinedClassname = function (classname) {
    console.log(
        `checkcss: No CSS rule for .${classname}`,
    );
};

checkcss.scan().watch();

const panelInclude = setConsoleOptions({}).panelInclude;

setConsoleOptions({
    panelInclude: [...panelInclude, /checkcss/],
});

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

document.addEventListener('storyWasSwitchedAndIsLoaded', function (event) {
    console.log('storyWasSwitchedAndIsLoaded')
    Initializer.run(document, loadFeature)
    setTimeout(loadDelayedImages, 500)
})
console.log('preview.js is loaded')

/*if (process.env.NODE_ENV !== 'production') {
    console.log(Initializer)
    console.log('Looks like we are in development mode!')
}*/

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
        element: '#storybook-root',
        // sets the execution mode for the addon
        manual: false,
    },
    controls: { expanded: true },
    docs: {
        theme: hrDesignsystemLight,
        toc: {
            contentsSelector: '.sbdocs-content',
            headingSelector: 'h1, h2, h3',
            ignoreSelector: '#primary',
            title: 'Inhalt',
            disable: false,
            unsafeTocbotOptions: {
                orderedList: false,
            },
        },
    },
    options: {
        storySort: {
            order: [
                'Einführung',
                'Grundlegendes',
                [
                    'Entwicklung',
                    [
                        'Installation und Update von Dependencies',
                        'Design System im Delivery Projekt installieren',
                        'Konventionen und Datenstrukturen',
                        'Testdatenbereitstellung',
                        'Konsolenausgaben'
                    ],
                    '*',
                ],
                'Seiten',
                [
                    'Artikel',
                    'Index',
                    'Index mit Player'
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

export const decorators = [
    withThemeByDataAttribute({
        themes: {
            'hessenschau': 'hessenschau',
            'hr': 'hr',
            'hr1': 'hr1',
            'hr2': 'hr2',
            'hr3': 'hr3',
            'hr4': 'hr4',
            'you-fm': 'you-fm',
            'hr-inforadio': 'hr-inforadio',
            'hr-fernsehen': 'hr-fernsehen',
            'hr-bigband': 'hr-bigband',
            'hr-sinfonieorchester': 'hr-sinfonieorchester',
            'hr-werbung': 'hr-werbung',
            'hr-rundfunkrat': 'hr-rundfunkrat',
        },
        defaultTheme: 'hessenschau',
        attributeName: 'data-theme',
    }),
]
//export const tags = ['autodocs'];
