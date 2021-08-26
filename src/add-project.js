const fs = require("fs");

let projects = fs.readFileSync("projects.json");
projects = JSON.parse(projects.toString());
if (projects.includes(Number(process.env.PROJECT_ID)))
  throw new Error("This project has already been added!");

projects.push(Number(process.env.PROJECT_ID));
fs.writeFileSync("projects.json", JSON.stringify(projects));
fs.mkdirSync("../projects/" + process.env.PROJECT_ID);
console.log("Adding", Number(process.env.PROJECT_ID));

require("./update-project.module.js")();
