import metadatabox_template from './metadatabox.hbs'
import metadatabox_json from '../fixtures/metadatabox.json'
import metadatabox_comments_json from '../fixtures/metadatabox_comments.json'
import metadatabox_one_author_json from '../fixtures/metadatabox_one_author.json'
import metadatabox_one_author_without_picture_json from '../fixtures/metadatabox_one_author_without_picture.json'
import metadatabox_one_author_comments_json from '../fixtures/metadatabox_one_author_comments.json'
import metadatabox_more_authors_json from '../fixtures/metadatabox_more_authors.json'
import metadatabox_more_authors_comments_json from '../fixtures/metadatabox_more_authors_comments.json'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<span>${topline}</span>`;
    return metadatabox_template({ ...args })
}

export default {
    title: 'Seiten/Komponenten/Metadaten-Box',
    argTypes: {
        _showDate: {
            control: 'boolean',
            description: 'Datum anzeigen',
        },
    },    
    decorators: [
        (Story) => {
            return `<div class="max-w-[724px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
}

export const Default = {
    render: Template.bind({}),
    name: 'Nur Datum',
    args: metadatabox_json,
}

export const WithComments = {
    render: Template.bind({}),
    name: 'Datum und Kommentar-Link',
    args: metadatabox_comments_json,
}

export const WithOneAuthor = {
    render: Template.bind({}),
    name: 'Ein Autor',
    args: metadatabox_one_author_json,
}

export const WithOneAuthorWithoutPicture = {
    render: Template.bind({}),
    name: 'Ein Autor ohne Bild',
    args: metadatabox_one_author_without_picture_json,
}


export const WithMoreAuthors = {
    render: Template.bind({}),
    name: 'Mehrere Autoren',
    args: metadatabox_more_authors_json,
}

export const WithOneAuthorAndComments = {
    render: Template.bind({}),
    name: 'Ein Autor und Kommentar-Link',
    args: metadatabox_one_author_comments_json,
}

export const WithMoreAuthorsAndComments = {
    render: Template.bind({}),
    name: 'Mehrere Autoren und Kommentar-Link',
    args: metadatabox_more_authors_comments_json,
}