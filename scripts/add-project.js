const fetch = require("node-fetch");
const projectSet = require("./ProjectSet");
const saveProject = require("./save-project");
const collateProjects = require("./collate-projects");

projectSet.read();

const id = process.env.PROJECT_ID || process.argv.slice(2)[0];
if (!id) throw new Error("A project ID was not provided to the client.");
if (projectSet.has(id))
  throw new Error("This project already is being listened to");

fetch(`https://projects.scratch.mit.edu/${id}`).then((res) => {
  if (!res.ok)
    throw new Error(`Cannot fetch ${res.url} because of error ${res.status}`);
  console.log("Archiving: ", id);
  saveProject(id);
  projectSet.add(id);
  projectSet.save();
  collateProjects();
});
