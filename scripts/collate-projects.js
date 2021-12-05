import { readdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const DIST_PROJECT_FILE = resolve(__dirname, "..", "dist", "projects.json");
const DIST_PATH = resolve(__dirname, "..", "dist");
const PROJECTS_FOLDER = resolve(DIST_PATH, "projects");

const jsons = [];

const collateProjects = () => {
  const nodes = readdirSync(PROJECTS_FOLDER);
  for (const node of nodes) {
    const jsonLocation = resolve(PROJECTS_FOLDER, node, "metadata.json");
    if (existsSync(jsonLocation)) {
      const file = readFileSync(jsonLocation, { encoding: "utf-8" });
      jsons.push(JSON.parse(file));
      jsons.sort(function (a, b) {
        return b + a;
      });
    }
  }

  writeFileSync(DIST_PROJECT_FILE, JSON.stringify(jsons));
};

export default collateProjects;
