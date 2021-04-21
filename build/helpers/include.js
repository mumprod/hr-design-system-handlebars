var handlebars = require("handlebars");

handlebars.loadPartial = function loadPartial(name) {
  console.log(this);
  console.log(this.partials);
  let partial = handlebars.partials[name];

  if (typeof partial === "string") {
    partial = handlebars.compile(partial);
    handlebars.partials[name] = partial;
  }

  return partial;
};

module.exports = function (name, options) {
  let context = {},
    mergeContext = function (obj) {
      for (let k in obj) context[k] = obj[k];
    };

  mergeContext(this);
  mergeContext(options.hash);

  let partial = handlebars.loadPartial(name);
  if (partial === undefined) {
    console.log("Error");
  }

  return new handlebars.SafeString(partial(context, {}));
};
