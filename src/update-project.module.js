const https = require("https");
const prettier = require("prettier");
const fs = require("fs");

console.log("begin.");
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

async function updateProject() {
  const projects = JSON.parse(fs.readFileSync("projects.json").toString());
  console.log(projects);

  await Promise.all(
    projects.map(async (projectId) => {
      console.log("Archiving: ", projectId);
      const projectJSON = await getJSON(
        `https://cdn.projects.scratch.mit.edu/${projectId}/`
      );

      if (projectJSON.code) {
        return
      }
      const projectAPIRes = await getJSON(
        `https://api.scratch.mit.edu/projects/${projectId}/`
      );

      fs.writeFileSync(
        `../projects/${projectId}/project.json`,
        prettier.format(JSON.stringify(projectJSON), { parser: "json" })
      );
      fs.writeFileSync(
        `../projects/${projectId}/api-res.json`,
        prettier.format(JSON.stringify(projectAPIRes), { parser: "json" })
      );

      !fs.existsSync(`../projects/${projectId}/assets`) &&
        fs.mkdirSync(`../projects/${projectId}/assets`);
      await Promise.all(
        projectJSON.targets.map((target) =>
          Promise.all(
            target.costumes.map(
              async (costume) =>
                new Promise((resolve) => {
                  !fs.existsSync(
                    `../projects/${projectId}/assets/${target.name}`
                  ) &&
                    fs.mkdirSync(
                      `../projects/${projectId}/assets/${target.name}`
                    );
                  https
                    .request(
                      {
                        hostname: "cdn.assets.scratch.mit.edu",
                        port: 443,
                        path: `/internalapi/asset/${costume.md5ext}/get/`,
                        method: "GET",
                      },
                      (res) => {
                        res.pipe(
                          fs.createWriteStream(
                            `../projects/${projectId}/assets/${target.name}/${costume.name}.${costume.dataFormat}`
                          )
                        );
                      }
                    )
                    .end();
                })
            )
          )
        )
      );

      const writeStream = fs.createWriteStream(
        `../projects/${projectId}/project.sb3`
      );

      await new Promise((resolve) => {
        https
          .request(
            new URL(`https://projects.scratch.mit.edu/${projectId}/`),
            (res) => {
              res.pipe(writeStream);
              resolve();
            }
          )
          .end();
      });

      await new Promise((resolve) => {
        https
          .request(
            {
              hostname: "cdn2.scratch.mit.edu",
              port: 443,
              path: `/get_image/project/${projectId}_9200x4600.png`,
              method: "GET",
            },
            (res) => {
              res.pipe(
                fs.createWriteStream(`../projects/${projectId}/thumbnail.png`)
              );
              resolve();
            }
          )
          .end();
      });
    })
  );
}
console.log("complete.");
module.exports = updateProject;