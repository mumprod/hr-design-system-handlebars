import contentbox from './fields.hbs'
import inputJson from './fixtures/form_input.json'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<span>${topline}</span>`;
    return contentbox({ ...args })
}

export default {
    title: 'Komponenten/Content/Copytext/Form',
    decorators: [
        (Story) => {
            return `<div class="relative flex  flex-col justify-center overflow-hidden py-6 sm:py-12">
                        <div class="relative bg-[#d8e9f6] min-w-96 min-h-96 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5  sm:max-w-xl sm:rounded-lg sm:px-10">  
                            ${Story()}
                        </div>
                    </div>`
        },
    ],
}

export const Input = {
    render: Template.bind({}),
    name: 'Input - Einzeiliger Text',
    args: inputJson,
}
