import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// The location of the root directory.
const PROJECTS_PATH = resolve(__dirname, "..", "projects.json");

class ProjectSet {
  hasRead = false;
  projectSet = new Set()

  read() {
    // If the program has already read from the projects file...
    // There's no point in reading it again!
    if (this.hasRead) return;
    this.hasRead = true;

    const projectArray = JSON.parse(
      readFileSync(PROJECTS_PATH, {
        encoding: "utf-8",
      })
    );
    this.projectSet = new Set(projectArray);
  }

  toArray() {
    return [...this.projectSet].sort((a, b) => a - b)
  }

  has(id) {
    return this.projectSet.has(id)
  }

  add(id) {
    this.projectSet.add(id);
  }

  save() {
    // The "null, 2" part prettifies the JSON file
    writeFileSync(PROJECTS_PATH, JSON.stringify(this.toArray(), null, 2))
  }
}

const projectSet = new ProjectSet();

export default projectSet;
