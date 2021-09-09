/** helper to get the active set options id */
const getActiveValue = ({ globals, parameters }) => {
  const global = globals.customConditionalToolbar || {};
  const param = parameters.customConditionalToolbar;

  return global[param.default]; // get the selected options id
};

export const withThemeDecorator = (StoryFn, context) => {
  return `<div class="max-w-full" data-theme="${getActiveValue(
    context
  )}">
  ${StoryFn()} 
  </div>`;
};
