var handlebars = require("handlebars");

module.exports = function (name, options) {
  handlebars.registerPartial(name, options.fn);
};
