module.exports = function(text, options) {
    var loca
    var locas = { 
        "anchor_brandNav": "Übersicht der Marken des HR anspringen",
        "anchor_headline": "Sprungmarken",
        "anchor_mainContent": "Inhalt anspringen",
        "anchor_sectionNav": "Bereichsnavigation anspringen",
        "anchor_serviceNav": "Servicenavigation anspringen",
        "anchor_subNav": "Subnavigation des Bereichs {0} anspringen",
        "search_input_aria_submit": "Suche starten",
        "search_input_placeholder": "Ort oder Thema suchen",
        "feature_box_anchor": "Livestream Player anspringen",
        "header_homepage_link_title": "Startseite hessenschau . d e",
        "comment_anchor_1": "zu den ",
        "comment_label_text": "Kommentar",
        "comment_label_text_many": "Kommentare",
        "comment_anchor_2": " Kommentaren des Artikels springen",
        "date_simple_at": options + " Uhr",
        "label_ticker":"Ticker",
        "label_download":"Download",
        "label_media":"Media",
        "label_event":"Konzert",
        "group_tabbed_more":"weitere Meldungen aus " + options,
        "header_event_calendar_title": "Eventkalender"
    }

    for (let key in locas){
        if(key == text){
            loca = text.replace(text,locas[key])
            return loca
        } 
    }
}