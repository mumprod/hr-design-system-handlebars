
import groupJson from './fixtures/form_group.json'

const handlebars = require('hrHandlebars')


export default {
    title: 'Komponenten/Formulare',
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
    {{#>components/forms/components/backgroundBox  }}  
            <form class="relative flex flex-col justify-center overflow-hidden group" id="form{{nextRandom}}" action="{{this.url}}" method="post" enctype="{{if this.isMultipart 'multipart/form-data' 'application/x-www-form-urlencoded'}}" accept-charset="utf-8" >     
                {{> components/forms/components/fields }}
            </form>
    {{/components/forms/components/backgroundBox }}
  `)
    return hbsTemplate({ ...args })
}

export const Gruppe = {
    render: Template.bind({}),
    name: 'Gruppe',
    args: groupJson,
}