export default name =>
    import(/* webpackChunkName: "/feature/[request]" */ `/feature/${name}`)
