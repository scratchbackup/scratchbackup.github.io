import { read, toArray } from "./ProjectSet";
import saveProject from "./save-project";
import collateProjects from "./collate-projects";

read();

const updateProjects = async () => {
  console.log("Updating Projects...");
  for (const id of toArray()) {
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
