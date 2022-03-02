const prettier = require("prettier");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

// The location of the dist directory.
const DIST_PATH = path.resolve(__dirname, "..", "dist");
const SCRATCH1_START = Buffer.from("ScratchV01");

const saveProject = async (id) => {
  const PROJECT_FOLDER = path.resolve(DIST_PATH, "projects", id);

  const checkForErrors = async (res) => {
    if (res.status == 200) return;
    throw new Error(`Cannot use ${res.url} because of error ${res.status}`);
  };

  const saveJSON = async (url, filename) => {
    const res = await fetch(url);
    await checkForErrors(res);
    const text = await res.text();
    const formatted = prettier.format(text, { parser: "json" });
    fs.writeFileSync(path.resolve(PROJECT_FOLDER, filename), formatted, {
      encoding: "utf-8",
    });
    return JSON.parse(text);
  };

  const saveBlob = async (url, filename) => {
    const writeStream = fs.createWriteStream(
      path.resolve(PROJECT_FOLDER, filename)
    );
    const res = await fetch(url);
    await checkForErrors(res);

    await new Promise((resolve, reject) => {
      res.body.pipe(writeStream);
      res.body.on("error", reject);
      writeStream.on("finish", resolve);
    });
  };

  const saveProjectFile = async (url) => {
    let filename = "project.json";
    let version = "unknown";

    const res = await fetch(url);
    await checkForErrors(res);

    try {
      const buffer = await res.buffer();
    } catch {
      try {
        const buffer = await res.buffer();
      } catch {
        throw new Error('Cannot create buffer of result')
      }
    }
    const comparison = buffer.compare(
      SCRATCH1_START,
      undefined,
      undefined,
      0,
      SCRATCH1_START.length
    );

    if (comparison === 0) {
      filename = "project.sb";

      fs.writeFileSync(path.resolve(PROJECT_FOLDER, filename), buffer);
      return "1.4";
    }

    const text = buffer.toString();
    const parsed = JSON.parse(text);

    if (parsed.info) {
      version = "2.0";
    } else if (parsed.meta) {
      version = "3.0";
    }

    fs.writeFileSync(
      path.resolve(PROJECT_FOLDER, filename),
      JSON.stringify(parsed, null, 2)
    );

    return version;
  };

  if (!fs.existsSync(PROJECT_FOLDER))
    fs.mkdirSync(PROJECT_FOLDER, { recursive: true });

  const version = await saveProjectFile(
    `https://cdn.projects.scratch.mit.edu/${id}`
  );
  await saveBlob(
    `https://cdn2.scratch.mit.edu/get_image/project/${id}_480x360.png`,
    "thumbnail.png"
  );
  const metadata = await saveJSON(
    `https://api.scratch.mit.edu/projects/${id}/`,
    "api-res.json"
  );
  const ocularStats = await saveJSON(
    `https://my-ocular.jeffalo.net/api/user/${metadata.author.username}`,
    "status.json"
  );
  fs.writeFileSync(
    path.resolve(PROJECT_FOLDER, "metadata.json"),
    JSON.stringify(
      {
        id: Integer(id),
        title: metadata.title || `Untitled Project ${id}`,
        author: metadata.author.username || "Unknown",
        pfp: metadata.author.profile.images["60x60"],
        color: ocularStats.color || false,
        created: metadata.history.created || `Before project ${id+1}`,
        modified: metadata.history.modified || '???',
        version,
      },
      null,
      2
    ),
    { encoding: "utf-8" }
  );

  // This doesn't actually save SB3 files! It saves JSONs.
  // Try again later.
  // saveBlob(`https://projects.scratch.mit.edu/${id}/`, 'project.sb3')
};

module.exports = saveProject;
