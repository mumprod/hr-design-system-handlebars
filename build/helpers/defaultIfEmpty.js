module.exports = function (context, defaultValue) {
  if (context) {
    return context;
  } else {
    return defaultValue;
  }
};
