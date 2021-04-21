module.exports = function (input, cases, values) {
  const caseArray = cases.split(",");
  const valueArray = values.split(",");
  const defaultValue =
    caseArray.length < valueArray.length
      ? valueArray[valueArray.length - 1]
      : "";

  return caseArray.indexOf(input) > -1
    ? valueArray[caseArray.indexOf(input)]
    : defaultValue;
};
