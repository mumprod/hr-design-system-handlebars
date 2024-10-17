
import inputJson from './fixtures/form_input.json'
import inputMandatoryJson from './fixtures/form_input_mandatory.json'
import inputPrefilledJson from './fixtures/form_input_prefilled.json'
import textareaJson from './fixtures/form_textarea.json'
import emailJson from './fixtures/form_email.json'

const handlebars = require('hrHandlebars')


export default {
    title: 'Komponenten/Formulare/Text Felder',
    decorators: [
        (Story) => {
            return `<div class="grid grid-page">
                        <div class="grid bg-white grid-article">
                            ${Story()}
                        </div>
                    </div>`
        },
    ],
}
const Template = (args) => {
    let hbsTemplate = handlebars.compile(`
    {{#>components/forms/backgroundBox  }}  
            <form class="relative flex flex-col justify-center overflow-hidden group" id="form{{nextRandom}}" action="{{this.url}}" method="post" enctype="{{if this.isMultipart 'multipart/form-data' 'application/x-www-form-urlencoded'}}" accept-charset="utf-8" >     
                {{> components/forms/components/fields }}
            </form>
    {{/components/forms/backgroundBox }}
  `)
    return hbsTemplate({ ...args })
}

export const Input = {
    render: Template.bind({}),
    name: 'Input',
    args: inputJson,
}
export const InputMandatory = {
    render: Template.bind({}),
    name: 'Input:mandatory',
    args: inputMandatoryJson,
}
export const InputPrefilled = {
    render: Template.bind({}),
    name: 'Input:prefilled',
    args: inputPrefilledJson,
}
export const InputFocused = {
    render: Template.bind({}),
    name: 'Input:focus',
    args: inputJson,
    parameters: {
        pseudo: {
          focus: ["input"],
          
        },
      }
}
export const email = {
    render: Template.bind({}),
    name: 'Email',
    args: emailJson,
}
export const Textarea = {
    render: Template.bind({}),
    name: 'Textarea',
    args: textareaJson,
}
