const snapshotsTemplate = (args) => {
    const { hbsTemplates, snapshotsJson } = args

    let template = '<div class="flex flex-auto flex-wrap gap-3">'
    for (const [key, value] of Object.entries(snapshotsJson)) {
        template += '<div>'
        template += hbsTemplates[value.template]({ ...value.args })
        template += '</div>'
    }
    template += '</div>'
    return template
}

export { snapshotsTemplate }