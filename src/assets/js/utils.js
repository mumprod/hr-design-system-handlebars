const getSnapshotsTemplate = (args) => {
    const { hbsTemplates, snapshotsJson, noContainer } = args
    const filteredSnapshots = Object.entries(snapshotsJson).filter(([key, value]) => {
        return undefined !== value.useAsSnapshot ? value.useAsSnapshot : true
    })
    let template = '<div class="flex flex-auto flex-wrap gap-8">'
    for (const [key, value] of filteredSnapshots) {
        if (!noContainer) {
            template += value.css === undefined ? '<div>' : `<div class="${value.css}">`
        }
        template += hbsTemplates[value.template]({ ...value.args })
        if (!noContainer) {
            template += '</div>'
        }
    }
    template += '</div>'
    return template
}

export { getSnapshotsTemplate }