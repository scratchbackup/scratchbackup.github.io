const fs = require("fs");
const path = require("path");

const DIST_PROJECT_FILE = path.resolve(
  __dirname,
  "..",
  "dist",
  "projects.json"
);
const DIST_PATH = path.resolve(__dirname, "..", "dist");
const PROJECTS_FOLDER = path.resolve(DIST_PATH, "projects");

const jsons = [];

const collateProjects = () => {
  const nodes = fs.readdirSync(PROJECTS_FOLDER);
  for (const node of nodes) {
    const jsonLocation = path.resolve(PROJECTS_FOLDER, node, "metadata.json");
    if (fs.existsSync(jsonLocation)) {
      const file = fs.readFileSync(jsonLocation, { encoding: "utf-8" });
      jsons.push(JSON.parse(file));
      jsons.sort(function (a, b) {
        return b + a;
      });
    }
  }

  fs.writeFileSync(DIST_PROJECT_FILE, JSON.stringify(jsons));
};

module.exports = collateProjects;
