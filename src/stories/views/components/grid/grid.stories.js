import grid_group_100_item_100 from './grid_group_100_item_100.hbs'
import grid_group_100_item_100_with_background from './grid_group_100_item_100_with_background.hbs'
import grid_group_100_item_50 from './grid_group_100_item_50.hbs'
import grid_group_100_item_33 from './grid_group_100_item_33.hbs'
import grid_group_100_item_25 from './grid_group_100_item_25.hbs'
import grid_group_66_item_100 from './grid_group_66_item_100.hbs'
import grid_group_50_item_100 from './grid_group_50_item_100.hbs'
import grid_group_33_item_100 from './grid_group_33_item_100.hbs'
import grid_group_100_tabbed_50 from './grid_group_100_tabbed_50.hbs'
import grid_group_100_tabbed_33 from './grid_group_100_tabbed_33.hbs'
import grid_group_100_tabbed_25 from './grid_group_100_tabbed_25.hbs'

const Template01 = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return grid_group_100_item_100({ text, ...args })
}

const Template02 = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return grid_group_100_item_100_with_background({ text, ...args })
}

const Template03 = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return grid_group_100_item_50({ text, ...args })
}

const Template04 = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return grid_group_100_item_33({ text, ...args })
}

const Template05 = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return grid_group_100_item_25({ text, ...args })
}

const Template06 = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return grid_group_66_item_100({ text, ...args })
}

const Template07 = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return grid_group_50_item_100({ text, ...args })
}

const Template08 = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return grid_group_33_item_100({ text, ...args })
}

const Template09 = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return grid_group_100_tabbed_50({ text, ...args })
}

const Template10 = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return grid_group_100_tabbed_33({ text, ...args })
}

const Template11 = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return grid_group_100_tabbed_25({ text, ...args })
}

export default {
    title: 'Komponenten/grid',
    argTypes: {},
}

export const Grid100 = {
    render: Template01.bind({}),
    name: 'Grid 100%',
    args: {},
}

export const Grid100MitHintergrund = {
    render: Template02.bind({}),
    name: 'Grid 100% mit Hintergrund',
    args: {},
}

export const Grid50 = {
    render: Template03.bind({}),
    name: 'Grid 50%',
    args: {},
}

export const Grid33 = {
    render: Template04.bind({}),
    name: 'Grid 33%',
    args: {},
}

export const Grid25 = {
    render: Template05.bind({}),
    name: 'Grid 25%',
    args: {},
}

export const GridTabbed50 = {
    render: Template09.bind({}),
    name: 'Grid Tabbed 50%',
    args: {},
}

export const GridTabbed33 = {
    render: Template10.bind({}),
    name: 'Grid Tabbed 33%',
    args: {},
}

export const GridTabbed25 = {
    render: Template11.bind({}),
    name: 'Grid Tabbed 25%',
    args: {},
}

export const $66 = {
    render: Template06.bind({}),
    name: '66%',
    args: {},
}

export const $50 = {
    render: Template07.bind({}),
    name: '50%',
    args: {},
}

export const $33 = {
    render: Template08.bind({}),
    name: '33%',
    args: {},
}
