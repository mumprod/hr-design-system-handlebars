/**
 * Generates a template for rendering snapshots.
 * 
 * @param {Object} args - The arguments for generating the template.
 * @param {Object} args.hbsTemplates - The Handlebars templates object.
 * @param {Object} args.args - The snapshots JSON object.
 * @returns {string} - The generated template.
 */
const getSnapshotsTemplate = (args) => {
    const { hbsTemplates, args: snapshotsJson } = args
    console.log("SnapshotsJson First", snapshotsJson)
    const config = snapshotsJson.config || {}
    const renderAsGrid = undefined !== config.layout && "grid" === config.layout
    const renderSnapshotsWrapper = undefined !== config.renderSnapshotsWrapper ? config.renderSnapshotsWrapper : true
    const snapshotGroups = Object.entries(snapshotsJson).filter(([key, value]) =>
        key.includes("group"))
    const hasSnapshotGroups = snapshotGroups.length > 0
    const snapshotsWrapperStart = renderSnapshotsWrapper ? hasSnapshotGroups ? `<div${renderAsGrid ? ` class="grid grid-page"` : ''}">` : renderAsGrid ? '<div class="grid grid-page"><div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">' : '<div class="flex flex-auto flex-wrap gap-8">' : ''
    const snapshotsWrapperEnd = renderSnapshotsWrapper ? `</div>${hasSnapshotGroups && renderAsGrid ? '</div>' : ''}` : ''
    let template = ''
    if (hasSnapshotGroups) {
        template += snapshotsWrapperStart

        snapshotGroups.forEach(([key, value]) => {
            template += renderAsGrid ? '<div class="grid grid-cols-12 pt-5 md:pt-7 sm:px-10 col-full sm:col-main gap-x-6 gap-y-10 md:gap-y-14"><div class="grid grid-cols-12 items-start bg-white content-start gap-y-5 col-span-12 gap-x-6">' : '<div class="flex flex-auto flex-wrap gap-8">'
            const filteredSnapshots = Object.entries(value).filter(([key, value]) =>
                (value.config === undefined || value.config.useAsSnapshot !== false)
            )
            template += renderSnapshots(filteredSnapshots, hbsTemplates, config.template, config.path, renderSnapshotsWrapper)
            template += `</div>${renderAsGrid ? '</div>' : ''}`
        })
        template += snapshotsWrapperEnd
    } else {
        console.log("SnapshotsJson", snapshotsJson)
        const filteredSnapshots = Object.entries(snapshotsJson).filter(([key, value]) =>
            key !== "config" && (value.config === undefined || value.config.useAsSnapshot !== false)
        )
        template += snapshotsWrapperStart
        template += renderSnapshots(filteredSnapshots, hbsTemplates, config.template, config.path, renderSnapshotsWrapper)
        template += snapshotsWrapperEnd
    }
    return template
}

const renderSnapshots = (snapshots, hbsTemplates, defaultTemplate, defaultPath, renderSnapshotsWrapper) => {
    let template = ''
    console.log("Snapshots", snapshots)
    snapshots.forEach(([key, value]) => {
        const snapshotItemConfig = value.config || {}
        const renderSnapshotItemWrapper = undefined !== snapshotItemConfig.renderSnapshotItemWrapper ? snapshotItemConfig.renderSnapshotItemWrapper : true
        const path = snapshotItemConfig.path ? `${snapshotItemConfig.path}` : (defaultPath ? `${defaultPath}` : "args")
        const snapshotTemplateName = snapshotItemConfig.template || defaultTemplate || "no-template"

        if (renderSnapshotsWrapper && renderSnapshotItemWrapper) {
            template += `<div${snapshotItemConfig.css ? ` class="${snapshotItemConfig.css}"` : ''}>`
        }

        template += hbsTemplates[snapshotTemplateName](resolveObjectFromPath(path, value));

        if (renderSnapshotsWrapper && renderSnapshotItemWrapper) {
            template += '</div>';
        }
    })
    return template
}

const resolveObjectFromPath = (path, obj) => {
    return path.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}

export { getSnapshotsTemplate }