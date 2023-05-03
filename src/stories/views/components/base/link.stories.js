const handlebars = require('hrHandlebars')

const linkTemplate = (args) => {
    let hbsTemplate = handlebars.compile(`
    {{#> components/base/link}}
        Link
    {{/components/base/link}}
  `)
    return hbsTemplate({ ...args })
}

export default {
    title: 'Komponenten/Navigation/Link',

    argTypes: {
        _link: {
            description:
                'Das Objekt, welches, den Link beschreibt. Es muss mindestens das Feld `url` beinhalten. Weitere mögliche Felder sind `webviewUrl`, `isTargetBlank`, `hasIcon`, `iconName`, `readMoreText`, `hasNoReferrerFlag`',
            control: 'object',
        },

        _isAriaHidden: {
            description:
                'Wenn ausgewählt, wird die Eigenschaft "aria-hidden" auf true und die Eigenschaft "tab-index" auf -1 gesetzt.',
            control: 'boolean',

            table: {
                defaultValue: {
                    summary: false,
                },
            },
        },
        _css: {
            description: 'Erlaubt die Angabe zusätzlicher CSS Klassen für den Link',
            control: 'text',
        },
    },

    parameters: {
        controls: {
            sort: 'alpha',
        },
    },
}

export const playground = {
    render: linkTemplate.bind({}),
    name: 'Spielplatz',

    args: {
        _link: {
            url: '/test.html',
            webviewUrl: '/webview.html',
            readMoreText: 'mehr lesen',
            isTargetBlank: false,
            hasIcon: false,
            iconName: '',
            hasNoReferrerFlag: false,
        },
    },
}
