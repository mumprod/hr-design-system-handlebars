const getSnapshotsTemplate = (args) => {
    const { hbsTemplates, args: snapshotsJson } = args
    console.log("Args: ", args)
    const config = snapshotsJson.config || {}
    const renderSnapshotsWrapper = undefined !== config.renderSnapshotsWrapper ? config.renderSnapshotsWrapper : true
    const filteredSnapshots = Object.entries(snapshotsJson).filter(([key, value]) => {
        if (key === "config") {
            return false;
        }

        if (value.config === undefined) {
            return true;
        }

        return value.config.useAsSnapshot !== false;
    })
    let template = renderSnapshotsWrapper ? '<div class="flex flex-auto flex-wrap gap-8">' : ''
    for (const [key, value] of filteredSnapshots) {
        const snapshotItemConfig = value.config || {}
        const renderSnapshotItemWrapper = undefined !== snapshotItemConfig.renderSnapshotItemWrapper ? snapshotItemConfig.renderSnapshotItemWrapper : true
        const path = config.path ? `args.${config.path}` : snapshotItemConfig.path ? `args.${snapshotItemConfig.path}` : "args"
        const snapshotTemplateName = undefined !== snapshotItemConfig.template ? snapshotItemConfig.template : undefined !== config.template ? config.template : "no-template"
        if (renderSnapshotsWrapper && renderSnapshotItemWrapper) {
            template += snapshotItemConfig.css === undefined ? '<div>' : `<div class="${snapshotItemConfig.css}">`
        }
        template += hbsTemplates[snapshotTemplateName](resolveObjectFromPath(path, value))
        if (renderSnapshotsWrapper && renderSnapshotItemWrapper) {
            template += '</div>'
        }
    }
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