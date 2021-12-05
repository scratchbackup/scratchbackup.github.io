import fetch from "node-fetch";
import { read, has, add, save } from "./ProjectSet";
import saveProject from "./save-project";
import collateProjects from "./collate-projects";

read();

const id = process.env.PROJECT_ID || process.argv.slice(2)[0];
if (!id) throw new Error("A project ID was not provided to the client.");
if (has(id))
  throw new Error("This project already is being listened to");

fetch(`https://api.scratch.mit.edu/projects/${id}/`).then((res) => {
  if (!res.ok)
    throw new Error(`Cannot fetch ${res.url} because of error ${res.status}`);
  console.log("Archiving: ", id);
  saveProject(id);
  add(id);
  save();
  collateProjects();
});
