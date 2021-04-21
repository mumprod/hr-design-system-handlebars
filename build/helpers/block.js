var handlebars = require("handlebars");

module.exports = function (name, options) {
  /* Look for partial by name. */
  var partial = handlebars.loadPartial(name) || options.fn;

  handlebars.partials[name] = undefined;

  return partial(this, {
    data: options.hash,
  });
};
