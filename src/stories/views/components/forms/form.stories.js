
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
const TemplateInput = (args) => {
    let hbsTemplate = handlebars.compile(`
    {{#>components/forms/backgroundBox  }}  
            <form class="relative flex flex-col justify-center overflow-hidden group" id="form--{{nextRandom}}" action="{{this.url}}" method="post" enctype="{{if this.isMultipart 'multipart/form-data' 'application/x-www-form-urlencoded'}}" accept-charset="utf-8" >     
                {{> components/forms/fields }}
            </form>
    {{/components/forms/backgroundBox }}
  `)
    return hbsTemplate({ ...args })
}
const TemplateTextarea = (args) => {
    let hbsTemplate = handlebars.compile(`
    {{#>components/forms/backgroundBox  }}  
            <form class="relative flex flex-col justify-center overflow-hidden group" id="form--{{nextRandom}}" action="{{this.url}}" method="post" enctype="{{if this.isMultipart 'multipart/form-data' 'application/x-www-form-urlencoded'}}" accept-charset="utf-8" >     
                {{> components/forms/fields }}
            </form>
    {{/components/forms/backgroundBox }}
  `)
    return hbsTemplate({ ...args })
}
export const Input = {
    render: TemplateInput.bind({}),
    name: 'Input',
    args: inputJson,
}
export const InputMandatory = {
    render: TemplateInput.bind({}),
    name: 'Input:mandatory',
    args: inputMandatoryJson,
}
export const InputPrefilled = {
    render: TemplateInput.bind({}),
    name: 'Input:prefilled',
    args: inputPrefilledJson,
}
export const InputFocused = {
    render: TemplateInput.bind({}),
    name: 'Input:focus',
    args: inputJson,
    parameters: {
        pseudo: {
          focus: ["input"],
          
        },
      }
}
export const email = {
    render: TemplateInput.bind({}),
    name: 'Email',
    args: emailJson,
}
export const Textarea = {
    render: TemplateTextarea.bind({}),
    name: 'Textarea',
    args: textareaJson,
}