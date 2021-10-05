console.log("script loaded");
const https = require("https");
const fs = require("fs");

// borrowed a lot of code from functionalmetatable

function getJSON(url) {
  return new Promise((resolve, reject) => {
    const urlobj = new URL(url);
    const req = https
      .request(urlobj, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data));
        });

        res.on("error", (err) => {
          reject(err);
        });
      })
      .end();
  });
}

const projects = JSON.parse(fs.readFileSync("projects.json").toString());

async function updateProject() {
  for (let project of projects) {
    await Promise.all(
    projects.map(async (projectId) => {
      console.log("found project ", projectId);
      const req = https
      const projectLINK = 
        `https://scratchbackup.github.io/projects/${projectId}/project.json`
      ;

      const projectTHUMB = await getJSON(
        `https://scratchbackup.github.io/projects/${projectId}/thumbnail.png`
      );
  }
}
