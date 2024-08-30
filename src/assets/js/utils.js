const getSnapshotsTemplate = (args) => {
    const { hbsTemplates, snapshotsJson, noContainer } = args
    let template = '<div class="flex flex-auto flex-wrap gap-3">'
    for (const [key, value] of Object.entries(snapshotsJson)) {
        if (!noContainer) {
            template += '<div>'
        }
        console.log("Hubsi", hbsTemplates[value.template])
        template += hbsTemplates[value.template]({ ...value.args })
        if (!noContainer) {
            template += '</div>'
        }
    }
    template += '</div>'
    return template
}

export { getSnapshotsTemplate }