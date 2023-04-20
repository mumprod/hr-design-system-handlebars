const { execSync } = require('child_process')
const { resolve } = require('path')

const root = resolve(__dirname, '../..')
const run = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: root })

// Copy hbs files into the dist folder
run(`npx copyfiles \"./src/index.js\" dist --up=1`)
//run(`npx copyfiles \"./src/stories/views/**/*.hbs\" dist --up=2`)
run(`npx copyfiles \"./src/assets/vendor/**/*.{css,js}\" dist  --up=1`)
run(`npx copyfiles \"./src/stories/views/**/*.{feature,subfeature}.js\" dist/assets/js  --up=3`)
run(`npx copyfiles \"./src/assets/**/*.{woff,svg}\" dist --up=1`)
run(`npx copyfiles \"./src/assets/brand/*/conf/locatags.json\" dist --up=1`)
