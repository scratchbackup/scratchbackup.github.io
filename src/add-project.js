const fs = require("fs");
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


getJSON("https://api.scratch.mit.edu/projects/" + process.env.PROJECT_ID).then((data) => {
  if (data.code) throw new Error("invalid project")
  let projects = fs.readFileSync("projects.json");
  projects = JSON.parse(projects.toString());
  if (projects.includes(Number(process.env.PROJECT_ID)))
    throw new Error("This project has already been added!");

  projects.push(Number(process.env.PROJECT_ID));
  fs.writeFileSync("projects.json", JSON.stringify(projects));
  fs.mkdirSync("../projects/" + process.env.PROJECT_ID);
  console.log("Adding", Number(process.env.PROJECT_ID));
  require("./update-project.module.js")();
})


