/** helper to get the active set options id */
const getActiveValue = ({ globals, parameters }) => {
    const global = globals.customConditionalToolbar || {}
    const param = parameters.customConditionalToolbar
    return undefined !== global[param.default] ? global[param.default] : 'hessenschau' // get the selected options id
}

export const withThemeDecorator = (StoryFn, context) => {
    return `<div id="theming" class="max-w-full" data-theme="${getActiveValue(context)}">
  ${StoryFn()} 
  </div>`
}
