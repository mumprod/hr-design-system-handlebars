function addLabel(json, label) {
    json.link.content.label = label;
    json.link.content.topline = false;
}
function removeLabel(json, topline) {
  json.link.content.label = false;
  json.link.content.topline = topline;
}
function changeTeaserSize(json, size) {
  json.teasersize = size
}
export { addLabel, removeLabel, changeTeaserSize};
//export default addLabel;