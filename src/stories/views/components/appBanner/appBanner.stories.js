import appBanner from './appBanner.hbs'
import nativeAppBanner from './nativeAppBanner.hbs'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${appBanner}</div>`;
    return appBanner({ ...args })
}
const NativeTemplate = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${nativeAppBanner}</div>`;
    return nativeAppBanner({ ...args })
}
export default {
    title: 'Komponenten/App Banner',

    argTypes: {
       
    },

    decorators: [
        (Story) => {
            return `${Story()}`
        },
    ],
}

export const AppBanner = {
    render: Template.bind({}),
    name: 'AppBanner',

    args: {
      
    },
}
export const NativeAppBanner = {
    render: NativeTemplate.bind({}),
    name: 'NativeAppBanner',

    args: {
        
    },
}

