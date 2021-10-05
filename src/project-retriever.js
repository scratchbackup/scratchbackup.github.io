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
