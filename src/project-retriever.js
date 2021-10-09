console.log("script loaded");
var projects;
// Create an XMLHttpRequest object
const xhttp = new XMLHttpRequest();

// Define a callback function
xhttp.onload = function() {
  var projects = xhttp.responseText;
}

// Send a request
xhttp.open("GET", "src/projects.json");
xhttp.send();
const thumblists = [];
  
const links = [];
for (let projectID of projects) {
  var projectthumburl = new URL("https://scratchbackup.github.io/projects/" + projectID + "/thumbnail.png");
  var projectfile = new URL("https://scratchbackup.github.io/projects/" + projectID + "/project.json");
  thumblists.push(projectthumburl);
  links.push(projectfile);
}
var indexx = 0;
for (let link of links) {
  var indexx += 1
  document.getElementById("project" + indexx + "link").href = link;
}
var indexx = 0;
for (let thumb of thumblists) {
  var indexx += 1
  document.getElementById("project" + indexx + "thumb").src = thumb;
}
console.log("complete");

