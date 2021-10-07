console.log("script loaded");

$.get("projects.json", function(data){
  const projects = json.parse(data);
});
var thumblists = [];
var links = [];
for (let projectID of projects) {
  var projectthumburl = new URL("https://scratchbackup.github.io/projects/" + projectID + "/thumbnail.png");
  var projectfile = new URL("https://scratchbackup.github.io/projects/" + projectID + "/project.json");
  var thumblists += projectthumburl;
  var links += projectfile;
}

for (let link of links) {
  document.getElementById("project1link").href = link;
}
for (let thumb of thumblists) {
  document.getElementById("project1thumb").src = thumb;
}
console.log("complete");
