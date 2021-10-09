console.log("script loaded");
var projects;
// Create an XMLHttpRequest object
const xhttp = new XMLHttpRequest();

// Define a callback function
xhttp.onload = function() {
  var projects = xhttp.responseText;
}

// Send a request
xhttp.open("GET", "/src/projects.json");
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
  var indexx += 1;
  document.appendChild("<a href=" + link + " id='project" + indexx + "link'>");
  document.appendChild("<img src='" + thumblists[indexx] + "' id='project" + indexx + "thumb' width='240' height='180'>");
  document.appendChild("</img></a><br>");
}
console.log("complete");
