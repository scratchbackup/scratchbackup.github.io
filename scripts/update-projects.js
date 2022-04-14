const projectSet = require("./ProjectSet");
const saveProject = require("./save-project");
const collateProjects = require("./collate-projects");

projectSet.read();

const updateProjects = async () => {
  console.log("Updating Projects...");
  for (const id of projectSet.toArray()) {
    try {
      await saveProject(id);
      console.log(`Saved ${id}!`);
    } catch (e) {
      console.error(`Failed to save ${id} because of an error: ${e}`);
    }
  }
  console.log("Collating Projects...");
  collateProjects();
  console.log("Updates Completed!");
};

updateProjects();
