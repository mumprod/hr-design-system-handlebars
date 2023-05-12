import breadcrumb from './breadcrumb.hbs'
import breadcrumb2LevelData from './fixtures/breadcrumb_2_level.json'
import breadcrumb3LevelData from './fixtures/breadcrumb_3_level.json'
import breadcrumb4LevelData from './fixtures/breadcrumb_4_level.json'
import breadcrumb5LevelData from './fixtures/breadcrumb_5_level.json'

const Template = (args) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return breadcrumb({ ...args })
}

export default {
    title: 'Komponenten/Navigation/Breadcrumb',

    argTypes: {
        _currentPageUrl: {
            description: 'URL der aktuellen Seite',
            control: 'text',
        },

        _currentPageTitle: {
            control: 'text',
            description: 'Titel der aktuellen Seite',
        },
    },

    parameters: {
        controls: {
            sort: 'alpha',
        },
    },
    decorators: [
        (Story) => {
            return `
            <div class="breadcrumb-container grid grid-page">
                <div class="grid-cols-12 py-6 col-full sm:px-9.5 sm:col-main">  
                    ${Story()} 
                </div>
            </div>`
        },
    ],
}

export const breadcrumb2Level = {
    render: Template.bind({}),
    name: 'Breadcrumb 2 Level',
    args: {
        _currentPageUrl: '#currentPage',
        _currentPageTitle: 'Kurzer Titel',
        ...breadcrumb2LevelData.breadcrumb,
    },
}

export const breadcrumb3Level = {
    render: Template.bind({}),
    name: 'Breadcrumb 3 Level',
    args: {
        _currentPageUrl: '#currentPage',
        _currentPageTitle:
            'Korruptionsprozess: Verteidigung von Ex-Oberstaatsanwalt plädiert auf höchstens vier Jahre Haft',
        ...breadcrumb3LevelData.breadcrumb,
    },
}

export const breadcrumb4Level = {
    render: Template.bind({}),
    name: 'Breadcrumb 4 Level',
    args: {
        _currentPageUrl: '#currentPage',
        _currentPageTitle:
            'Darmstadt 98 bleibt trotz Enttäuschung cool: "Keinen Stift in der Hose" ',
        ...breadcrumb4LevelData.breadcrumb,
    },
}

export const breadcrumb5Level = {
    render: Template.bind({}),
    name: 'Breadcrumb 5 Level',
    args: {
        _currentPageUrl: '#currentPage',
        _currentPageTitle:
            'Verein bestätigt: Eintracht Frankfurt trennt sich im Sommer von Oliver Glasner',
        ...breadcrumb5LevelData.breadcrumb,
    },
}
