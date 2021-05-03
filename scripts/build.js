const { execSync } = require("child_process");
const { resolve } = require("path");

const root = resolve(__dirname, "..");
const run = (cmd) => execSync(cmd, { stdio: "inherit", cwd: root });

// Copy hbs files into the dist folder
run(`npx copyfiles \"./src/**/*.hbs\" dist --up=1`);
