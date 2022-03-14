import '!style-loader!css-loader!postcss-loader!tailwind'
import 'tailwind'

import hrDesignsystemDark from './HRDesignsystemDark'
import hrDesignsystemLight from './HRDesignsystemLight'
import { withThemeDecorator } from './withThemeDecorator'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import Initializer from '../build/webpack/feature-loader/initializer/initializer'
import loadFeature from '../build/webpack/feature-loader/initializer/loader'

document.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded and parsed')

    console.log('Start feature initialization')

    Initializer.run(document, loadFeature)
})

if (process.env.NODE_ENV !== 'production') {
    console.log(Initializer)
    console.log('Looks like we are in development mode!')
}

export const parameters = {
    layout: 'fullscreen',
    viewport: {
        viewports: INITIAL_VIEWPORTS,
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
                    { id: 'youfm', title: 'you-fm.de' },
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
                'Komponenten',
                [
                    'Page',
                    'Header',
                    ['Header', 'BrandNavigation', 'ServiceNavigation', 'SectionNavigation'],
                    'Flyout',
                ],
                '*',
            ],
        },
    },
}

export const decorators = [withThemeDecorator]
