const { execSync } = require("child_process");
const { resolve, join } = require("path");
const fs = require("fs");

const root = resolve(__dirname, "..");
const run = (cmd) => execSync(cmd, { stdio: "inherit", cwd: root });
const viewsPath = join(root, "src/stories/views/components");
fs.readdir(viewsPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    console.log(file);
  });
});

// Copy hbs files into the dist folder
run(`npx copyfiles \"./src/index.js\" dist --up=1`);
run(`npx copyfiles \"./src/assets/**/*.*\" dist --up=1`);
run(`npx copyfiles \"./src/stories/views/**/*.hbs\" dist --up=2`);
