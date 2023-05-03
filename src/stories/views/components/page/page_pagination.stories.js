import { NavigationDataWithMixedContent } from './page_pagination.data.js'
import page from '../pagination/pagination.hbs'

const TemplateMoreThanThreeFirst = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    args['currentPageValid'] = true
    args['onlyThreePages'] = false
    args['onlyTwoPages'] = false
    args['secondPage'] = false
    args['firstPage'] = true
    args['notLastButOnePage'] = false
    args['notLastPage'] = false
    args['totalPages'] = 999
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page({ brand, ...args })
}
const TemplateMoreThanThreeSecond = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    args['onlyThreePages'] = false
    args['onlyTwoPages'] = false
    args['secondPage'] = true
    args['firstPage'] = false
    args['notLastButOnePage'] = false
    args['notLastPage'] = false
    args['totalPages'] = 999
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page({ brand, ...args })
}
const TemplateMoreThanThreeButNotLast = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    args['onlyThreePages'] = false
    args['onlyTwoPages'] = false
    args['secondPage'] = false
    args['firstPage'] = false
    args['notLastButOnePage'] = false
    args['notLastPage'] = true
    args['totalPages'] = 999
    args['currentPage'] = 998
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page({ brand, ...args })
}
const TemplateMoreThanThreeOneButNotLast = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    args['onlyThreePages'] = false
    args['onlyTwoPages'] = false
    args['secondPage'] = false
    args['firstPage'] = false
    args['notLastButOnePage'] = true
    args['notLastPage'] = true
    args['totalPages'] = 999
    args['currentPage'] = 555
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page({ brand, ...args })
}

const TemplateMoreThanThreeLast = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    args['onlyThreePages'] = false
    args['onlyTwoPages'] = false
    args['secondPage'] = false
    args['firstPage'] = false
    args['notLastButOnePage'] = false
    args['notLastPage'] = false
    args['totalPages'] = 999
    args['currentPage'] = 999
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page({ brand, ...args })
}
const TemplateOnlyTwo= (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    args['onlyThreePages'] = false
    args['onlyTwoPages'] = true
    args['secondPage'] = false
    args['firstPage'] = true
    args['notLastButOnePage'] = false
    args['notLastPage'] = false
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page({ brand, ...args })
}

const TemplateOnlyThree = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    args['onlyThreePages'] = true
    args['onlyTwoPages'] = false
    args['secondPage'] = false
    args['firstPage'] = false
    args['notLastButOnePage'] = false
    args['notLastPage'] = false
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page({ brand, ...args })
}


export default {
    title: 'Komponenten/Page/Pagination',
    argTypes: {},

    parameters: {
        chromatic: {
            viewports: [360, 768, 1024],
        },

        layout: 'fullscreen',

        docs: {
            inlineStories: false,
            iframeHeight: 400,
        },
    },
}

export const MitPagination = {
    render: TemplateMoreThanThreeFirst.bind({}),
    name: 'Pagination mehr als 3 Seiten',
    args: NavigationDataWithMixedContent,
}
export const MitPagination2 = {
    render: TemplateMoreThanThreeSecond.bind({}),
    name: 'Pagination mehr als 3 Seiten (zweite Seite aktiv)',
    args: NavigationDataWithMixedContent,
}
export const MitPagination3 = {
    render: TemplateMoreThanThreeButNotLast.bind({}),
    name: 'Pagination mehr als 3 Seiten (vorletzte Seite aktiv)',
    args: NavigationDataWithMixedContent,
}

export const MitPagination4 = {
    render: TemplateMoreThanThreeOneButNotLast.bind({}),
    name: 'Pagination mehr als 3 Seiten (Seite mitten drin aktiv)',
    args: NavigationDataWithMixedContent,
}

export const MitPagination5 = {
    render: TemplateMoreThanThreeLast.bind({}),
    name: 'Pagination mehr als 3 Seiten (letzte Seite aktiv)',
    args: NavigationDataWithMixedContent,
}

export const MitPagination6 = {
    render: TemplateOnlyTwo.bind({}),
    name: 'Pagination mit nur 2 Seiten',
    args: NavigationDataWithMixedContent,
}

export const MitPagination7 = {
    render: TemplateOnlyThree.bind({}),
    name: 'Pagination mit nur 3 Seiten',
    args: NavigationDataWithMixedContent,
}
