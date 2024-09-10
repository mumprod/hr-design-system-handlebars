
import inputJson from './fixtures/form_input.json'
import textareaJson from './fixtures/form_textarea.json'

const handlebars = require('hrHandlebars')


export default {
    title: 'Komponenten/Formulare/Input',
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
    name: 'Input - Einzeiliger Text',
    args: inputJson,
}

export const InputFocused = {
    render: TemplateInput.bind({}),
    name: 'Input - Einzeiliger Text Focus',
    args: inputJson,
    parameters: {
        pseudo: {
          focus: ["input"],
          
        },
      }
}
export const Textarea = {
    render: TemplateTextarea.bind({}),
    name: 'Textarea',
    args: textareaJson,
}