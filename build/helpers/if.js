const handlebars = require("handlebars");
module.exports = function (conditional, options) {
  var conditional = arguments[0];
  var options = arguments[1];
  if (undefined !== options && options.fn) {
    // copy of buildin if helper https://github.com/wycats/handlebars.js/blob/7535e48a7969229f44489124a8ef07bd17363f06/lib/handlebars/helpers/if.js

    if (handlebars.Utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (
      (!options.hash.includeZero && !conditional) ||
      handlebars.Utils.isEmpty(conditional)
    ) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  } else {
    // additional inline if helper
    if (handlebars.Utils.isEmpty(arguments[0])) {
      return arguments.length <= 3 ? "" : arguments[2];
    } else {
      return arguments.length <= 4 ? arguments[1] : "";
    }
  }
};
