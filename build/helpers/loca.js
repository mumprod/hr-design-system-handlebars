module.exports = function(text, options) {
    var loca

    if(text == 'search_input_aria_submit')
        loca = text.replace('search_input_aria_submit','Suche starten')
    if(text == 'search_input_placeholder')    
        loca = text.replace('search_input_placeholder','Ort oder Thema suchen')

    return loca
}