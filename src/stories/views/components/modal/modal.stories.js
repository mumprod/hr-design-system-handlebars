const handlebars = require('hrHandlebars')

const defaultModalTemplate = (args, { globals: { customConditionalToolbar } }) => {
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    let hbsTemplate = handlebars.compile(`
    {{#> components/modal/modal}}
        {{#> components/teaser/components/teaser_headline}}
            {{> components/teaser/components/teaser_title _text="Überschrift Default Modal" _css="text-2xl"}}
        {{/components/teaser/components/teaser_headline}}
        <p class="mt-2 text-base font-copy">Hier steht der Text des Modals. Dies ist nur ein Beispiel. Das modal Template stellt nur den Rahmen 
        des Modals zur Verfügung. In dem Modal kann dargestellt werden was man möchte.</p>
    {{/components/modal/modal}}

    {{#> components/base/link _css="js-modal"}}
        Default Modal
    {{/components/base/link}}
  `)
    return hbsTemplate({ brand, ...args })
}

const userConsentModalTemplate = (args, { globals: { customConditionalToolbar } }) => {
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    let link = { url: "https://hessenschau.de", isTargetBlank: true }
    let hbsTemplate = handlebars.compile(`
    {{#> components/modal/modal}}
        {{> components/modal/user_consent _headline=(loca "modal_user_consent_headline") _text=(loca "modal_user_consent_text") _labelOk=(loca "modal_user_consent_label_ok") _labelCancel=(loca "modal_user_consent_label_cancel")}}
    {{/components/modal/modal}}

    <a href="https://hessenschau.de" class="js-user-consent-needed" rel="noopener" target="_blank">User Consent Modal</a>
  `)
    return hbsTemplate({ brand, ...args })
}

export default {
    title: 'Komponenten/Modal',

    argTypes: {
        _trigger: {
            description: 'Hook Klasse des Links oder Buttons, welcher das Modal öffnen soll',
            control: 'text',
        },

        _type: {
            control: {
                type: 'select',
                options: ['default', 'userConsent'],
            },

            description: 'Der Typ des Modals, das geöffnet werden soll. Derzeit lassen sich die Typen "default" und "userConsent" auswählen.',
        },
    },

    parameters: {
        controls: {
            sort: 'alpha',
        },
    },
}

export const defaultModal = {
    render: defaultModalTemplate.bind({}),
    name: 'Default Modal',
    args: {
        _trigger: '.js-modal',
        _type: 'default'
    },
}

export const userConsentModal = {
    render: userConsentModalTemplate.bind({}),
    name: 'User Consent Modal',
    args: {
        _trigger: '.js-user-consent-needed',
        _type: 'userConsent'
    },
}

