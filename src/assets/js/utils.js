const getSnapshotsTemplate = (args) => {
    const { hbsTemplates, args: snapshotsJson } = args
    const config = snapshotsJson.config || {}
    const renderSnapshotsWrapper = undefined !== config.renderSnapshotsWrapper ? config.renderSnapshotsWrapper : true

    const filteredSnapshots = Object.entries(snapshotsJson).filter(([key, value]) =>
        key !== "config" && (value.config === undefined || value.config.useAsSnapshot !== false)
    )
    let template = renderSnapshotsWrapper ? '<div class="flex flex-auto flex-wrap gap-8">' : ''

    filteredSnapshots.forEach(([key, value]) => {
        const snapshotItemConfig = value.config || {}
        const renderSnapshotItemWrapper = undefined !== snapshotItemConfig.renderSnapshotItemWrapper ? snapshotItemConfig.renderSnapshotItemWrapper : true
        const path = config.path ? `args.${config.path}` : (snapshotItemConfig.path ? `args.${snapshotItemConfig.path}` : "args")
        const snapshotTemplateName = snapshotItemConfig.template || config.template || "no-template"

        if (renderSnapshotsWrapper && renderSnapshotItemWrapper) {
            template += `<div${snapshotItemConfig.css ? ` class="${snapshotItemConfig.css}"` : ''}>`
        }

        template += hbsTemplates[snapshotTemplateName](resolveObjectFromPath(path, value));

        if (renderSnapshotsWrapper && renderSnapshotItemWrapper) {
            template += '</div>';
        }
    })

    if (renderSnapshotsWrapper) {
        template += '</div>'
    }
    return template
}

const resolveObjectFromPath = (path, obj) => {
    return path.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}

export { getSnapshotsTemplate }